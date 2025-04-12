import { ChangeEvent, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Check, X, Upload, FileImage, FileVideo } from "lucide-react";

interface MediaVerificationResult {
    authentic: boolean;
    deepfake_probability: number;
    real_image_probability: number;
}

interface VideoResult {
    authentic: boolean;
    confidence_score: number;
}

export const Deepfake_Detection = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [mediaPreview, setMediaPreview] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
    const [videoResult, setVideoResult] = useState<VideoResult | null>(null);
    const [mediaVerificationResult, setMediaVerificationResult] = useState<MediaVerificationResult | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check if file is image or video
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            setError("Please upload only image or video files");
            return;
        }

        setError("");
        setMediaFile(file);
        setMediaType(file.type.startsWith('image/') ? "image" : "video");

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setMediaPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const uploadToS3 = async (file: File) => {
        try {
            // Get presigned URL from server
            const urlResponse = await axios.post(`${BACKEND_URL}/api/get-upload-url`, {
                fileName: file.name,
                fileType: file.type
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            const { presignedUrl, fileUrl } = urlResponse.data;

            // Upload file directly to S3 using the presigned URL
            await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type
                }
            });

            return fileUrl;
        } catch (error) {
            console.error("Error uploading to S3:", error);
            throw new Error("Failed to upload file");
        }
    };

    const handleVerifyMedia = async () => {
        if (!mediaFile) {
            setError("Please select a file to verify");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // First upload the file to S3
            const fileUrl = await uploadToS3(mediaFile);
            console.log(fileUrl);
            
            // Then send the URL to the backend for verification
            const response = await axios.post(`${BACKEND_URL}/api/verify-media`, {
                mediaUrl: fileUrl,
                mediaType: mediaType
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            
            console.log(response.data.Result);
            const parsedResult = JSON.parse(response.data.Result);
            
            if (mediaType === "image") {
                setMediaVerificationResult({
                    authentic: parsedResult.final_verdict === "Real Image", // Convert string to boolean
                    deepfake_probability: parseFloat(parsedResult.deepfake_confidence), 
                    real_image_probability: parseFloat(parsedResult.real_image_confidence)
                });
            } else {
                setVideoResult({
                    authentic: parsedResult.verdict === "Real Video",
                    confidence_score: parseFloat(parsedResult.confidence)
                });
            }
        } catch (e) {
            setError("Failed to verify media. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setMediaVerificationResult(null);
        setVideoResult(null);
        setMediaFile(null);
        setMediaPreview(null);
        setMediaType(null);
        setError("");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
            <Navbar type="Login" />

            <div className="flex-grow flex justify-center px-4 py-8">
                <div className="max-w-screen-lg w-full">
                    {(!mediaVerificationResult && !videoResult) ? (
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-6">DeepFake Detection</h1>
                            <p className="text-gray-600 mb-6">Upload an image or video to check if it's authentic or manipulated</p>

                            {error && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    {!mediaPreview ? (
                                        <div>
                                            <label htmlFor="media-upload" className="block cursor-pointer">
                                                <div className="flex flex-col items-center justify-center">
                                                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                                                    <p className="text-lg font-medium text-gray-700">Upload Media for Verification</p>
                                                    <p className="text-sm text-gray-500 mt-1">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-gray-400 mt-2">Supported formats: JPG, PNG, MP4, MOV</p>
                                                </div>
                                                <input 
                                                    id="media-upload" 
                                                    type="file" 
                                                    className="hidden" 
                                                    accept="image/,video/"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            {mediaType === "image" ? (
                                                <div className="flex justify-center">
                                                    <img 
                                                        src={mediaPreview} 
                                                        alt="Preview" 
                                                        className="max-h-64 max-w-full rounded" 
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex justify-center">
                                                    <video 
                                                        src={mediaPreview} 
                                                        controls 
                                                        className="max-h-64 max-w-full rounded"
                                                    />
                                                </div>
                                            )}
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center">
                                                    {mediaType === "image" ? 
                                                        <FileImage className="h-5 w-5 text-gray-500 mr-2" /> :
                                                        <FileVideo className="h-5 w-5 text-gray-500 mr-2" />
                                                    }
                                                    <span className="text-sm text-gray-600 truncate max-w-xs">
                                                        {mediaFile?.name}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setMediaFile(null);
                                                        setMediaPreview(null);
                                                        setMediaType(null);
                                                    }}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleVerifyMedia}
                                    disabled={isLoading || !mediaFile}
                                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-300 hover:bg-green-800 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </span>
                                    ) : "Verify Media"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Media Verification Result</h1>
                            <p className="text-gray-600 mb-6">
                                Results for {mediaFile?.name}
                            </p>

                            <div className="mb-6 flex justify-center">
                                {mediaType === "image" ? (
                                    <img 
                                        src={mediaPreview!} 
                                        alt="Verified media" 
                                        className="max-h-80 rounded-lg shadow-md"
                                    />
                                ) : (
                                    <video 
                                        src={mediaPreview!} 
                                        controls 
                                        className="max-h-80 max-w-full rounded-lg shadow-md"
                                    />
                                )}
                            </div>

                            {mediaType === "image" && mediaVerificationResult ? (
                                <>
                                    <div className={`mb-8 p-4 rounded-lg ${mediaVerificationResult.authentic ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                        <div className="flex items-center">
                                            <div className={`rounded-full p-2 mr-3 ${mediaVerificationResult.authentic ? 'bg-green-100' : 'bg-red-100'}`}>
                                                {mediaVerificationResult.authentic ? (
                                                    <Check className="w-6 h-6 text-green-700" />
                                                ) : (
                                                    <X className="w-6 h-6 text-red-600" />
                                                )}
                                            </div>
                                            <div>
                                                <h2 className={`text-xl font-bold ${mediaVerificationResult.authentic ? 'text-green-700' : 'text-red-600'}`}>
                                                    {mediaVerificationResult.authentic ? 'Verified Authentic' : 'Manipulated Media Detected'}
                                                </h2>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    {mediaVerificationResult.authentic
                                                        ? 'This image has passed our verification checks and appears to be authentic.'
                                                        : 'This image has failed our verification checks and appears to be manipulated.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg mb-8">
                                        <h4 className="text-lg font-medium text-gray-800 mb-4">Analysis Details</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-500">Real Image Probability</span>
                                                    <span className="text-sm font-medium">
                                                        {(mediaVerificationResult.real_image_probability * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div 
                                                        className="h-2.5 rounded-full bg-green-600" 
                                                        style={{ width: `${mediaVerificationResult.real_image_probability * 100}%`}}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-500">Deepfake Probability</span>
                                                    <span className="text-sm font-medium">
                                                        {`(mediaVerificationResult.deepfake_probability * 100).toFixed(1)`}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div 
                                                        className="h-2.5 rounded-full bg-red-600" 
                                                        style={{ width: `${mediaVerificationResult.deepfake_probability * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : videoResult ? (
                                <>
                                    <div className={`mb-8 p-4 rounded-lg ${videoResult.authentic ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                        <div className="flex items-center">
                                            <div className={`rounded-full p-2 mr-3 ${videoResult.authentic ? 'bg-green-100' : 'bg-red-100'}`}>
                                                {videoResult.authentic ? (
                                                    <Check className="w-6 h-6 text-green-700" />
                                                ) : (
                                                    <X className="w-6 h-6 text-red-600" />
                                                )}
                                            </div>
                                            <div>
                                                <h2 className={`text-xl font-bold ${videoResult.authentic ? 'text-green-700' : 'text-red-600'}`}>
                                                    {videoResult.authentic ? 'Verified Authentic Video' : 'Manipulated Video Detected'}
                                                </h2>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    {videoResult.authentic
                                                        ? 'This video has passed our verification checks and appears to be authentic.'
                                                        : 'This video has failed our verification checks and appears to be manipulated.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg mb-8">
                                        <h4 className="text-lg font-medium text-gray-800 mb-4">Analysis Details</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-500">Confidence Score</span>
                                                    <span className="text-sm font-medium">
                                                        {(videoResult.confidence_score * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div 
                                                        className={`h-2.5 rounded-full ${videoResult.authentic ? 'bg-green-600' : 'bg-red-600'}`}
                                                        style={{ width: `${videoResult.confidence_score * 100}%`}}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : null}

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300 font-medium"
                                >
                                    Back to Dashboard
                                </button>
                                <button
                                    onClick={resetForm}
                                    className="px-6 py-3 bg-white text-green-700 border border-green-700 rounded-lg hover:bg-green-50 transition duration-300 font-medium"
                                >
                                    Verify Another Media
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <footer className="mt-auto py-6 bg-white border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <p className="text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} Fact Fury. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};