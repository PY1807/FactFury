import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Check, Mic, MicOff, X } from "lucide-react";

interface VerificationResult {
    result: {
        NewsChecker: {
            news_authenticity: string;
            reason: string;
            remarks: string;
        };
        StructureAnalyzer: {
            news_authenticity: string;
            reason: string;
            remarks: string;
        };
        SemanticAnalyzer: {
            news_authenticity: string;
            confidence_score: number;
            reason: string;
            remarks: string;
        };
        EvidenceVerifier: {
            evidence_comparison: string,
            reason: string,
            semantic_similarity_score: string,
            remarks: string
        };
        final_result: boolean;
    };
}

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export const Verify = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [verificationData, setVerificationData] = useState<VerificationResult | null>(null);
    const navigate = useNavigate();

    const getAuthenticityBadge3 = (authenticity: string) => {
        if (authenticity === "Similar") {
            return { bg: "bg-green-50", text: "text-green-700", icon: <Check className="h-4 w-4 mr-1" />, cont: "Real" };
        } else {
            return { bg: "bg-red-50", text: "text-red-700", icon: <X className="h-4 w-4 mr-1" />, cont: "Fake" };
        }
    };

    const getAuthenticityBadge2 = (score: number) => {
        if (score >= 0.5) {
            return { bg: "bg-green-50", text: "text-green-700", icon: <Check className="h-4 w-4 mr-1" />, cont: "Real" };
        } else {
            return { bg: "bg-red-50", text: "text-red-700", icon: <X className="h-4 w-4 mr-1" />, cont: "Fake" };
        }
    };


    const handlePublish = async () => {
        if (!title.trim()) {
            setError("Please enter a title for your post");
            return;
        }
        if (!content.trim()) {
            setError("Please enter some content for your post");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await axios.get(`${BACKEND_URL}/api/verify`, {
                params: {
                    title,
                    content
                },
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            console.log(response.data)
            setVerificationData(response.data);
        } catch (e) {
            setError("Failed to verify news. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setVerificationData(null);
        setTitle("");
        setContent("");
        setError("");
    };

    const getStatusColor = (result: string) => {
        if (result === "Real") {
            return { bg: "bg-green-50", text: "text-green-700", icon: <Check className="h-4 w-4 mr-1" />, cont: "Real" };
        } else {
            return { bg: "bg-red-50", text: "text-red-700", icon: <X className="h-4 w-4 mr-1" />, cont: "Fake" };
        }
    };

    // const getScoreColor = (score: string) => {
    //     const numScore = parseFloat(score);
    //     if (numScore >= 0.7) return "text-green-700";
    //     if (numScore >= 0.4) return "text-yellow-600";
    //     return "text-red-600";
    // };

    // const getConfidenceBadge = (score: string) => {
    //     const numScore = parseFloat(score);
    //     if (numScore >= 0.7) return "bg-green-100 text-green-800";
    //     if (numScore >= 0.4) return "bg-yellow-100 text-yellow-800";
    //     return "bg-red-100 text-red-800";
    // };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
            <Navbar type="Login" />

            <div className="flex-grow flex justify-center px-4 py-8">
                <div className="max-w-screen-lg w-full">
                    {!verificationData ? (
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-6">Verify News</h1>

                            {error && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="block p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        placeholder="Enter a descriptive title..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700">Content</label>
                                    <Texteditor
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={handlePublish}
                                    disabled={isLoading}
                                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-300 hover:bg-green-800 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </span>
                                    ) : "Verify News"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Verification Result</h1>
                            <p className="text-gray-600 mb-6">Results for "{title}"</p>

                            <div className={`mb-8 p-4 rounded-lg ${verificationData.result.final_result ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                <div className="flex items-center">
                                    <div className={`rounded-full p-2 mr-3 ${verificationData.result.final_result ? 'bg-green-100' : 'bg-red-100'}`}>
                                        {verificationData.result.final_result ? (
                                            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className={`text-xl font-bold ${verificationData.result.final_result ? 'text-green-700' : 'text-red-600'}`}>
                                            {verificationData.result.final_result ? 'Verified Authentic' : 'Likely Misinformation'}
                                        </h2>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {verificationData.result.final_result
                                                ? 'This content has passed our verification checks and appears to be authentic.'
                                                : 'This content has failed our verification checks and likely contains misinformation.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Detailed Analysis</h3>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-medium text-gray-800">News Verification</h4>
                                        <span className={`flex items-center ${getStatusColor(verificationData.result.NewsChecker.news_authenticity).text} ${getStatusColor(verificationData.result.NewsChecker.news_authenticity).bg} px-2 py-0.5 rounded-md text-sm`}>
                                            {getStatusColor(verificationData.result.NewsChecker.news_authenticity).icon}
                                            {getStatusColor(verificationData.result.NewsChecker.news_authenticity).cont}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">{verificationData.result.NewsChecker.reason}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-medium text-gray-800">Content Structure Analysis</h4>
                                        <span className={`flex items-center ${getStatusColor(verificationData.result.StructureAnalyzer.news_authenticity).text} ${getStatusColor(verificationData.result.StructureAnalyzer.news_authenticity).bg} px-2 py-0.5 rounded-md text-sm`}>
                                            {getStatusColor(verificationData.result.StructureAnalyzer.news_authenticity).icon}
                                            {getStatusColor(verificationData.result.StructureAnalyzer.news_authenticity).cont}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">{verificationData.result.StructureAnalyzer.reason}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-medium text-gray-800">Semantic Meaning Analysis</h4>
                                        <span className={`flex items-center ${getAuthenticityBadge2(verificationData.result.SemanticAnalyzer.confidence_score).text} ${getAuthenticityBadge2(verificationData.result.SemanticAnalyzer.confidence_score).bg} px-2 py-0.5 rounded-md text-sm`}>
                                            {getAuthenticityBadge2(verificationData.result.SemanticAnalyzer.confidence_score).icon}
                                            {getAuthenticityBadge2(verificationData.result.SemanticAnalyzer.confidence_score).cont}
                                        </span>
                                        {/* <span className={px-2 py-1 rounded-full text-xs font-medium ${getAuthenticityBadge2(verificationData.result.SemanticAnalyzer.confidence_score)}}> */}
                                        {/* {(parseFloat(verificationData.result.SemanticAnalyzer.confidence_score) * 100).toFixed(0)}% Confidence */}
                                        {/* </span> */}
                                    </div>
                                    <p className="text-gray-600">{verificationData.result.SemanticAnalyzer.reason}</p>
                                </div>

                                {verificationData.result.EvidenceVerifier.remarks !== "Error" && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-medium text-gray-800">Evidence Cross-Check</h4>
                                            <span className={`flex items-center ${getAuthenticityBadge3(verificationData.result.EvidenceVerifier.evidence_comparison).text} ${getAuthenticityBadge3(verificationData.result.EvidenceVerifier.evidence_comparison).bg} px-2 py-0.5 rounded-md text-sm`}>
                                                {getAuthenticityBadge3(verificationData.result.EvidenceVerifier.evidence_comparison).icon}
                                                {getAuthenticityBadge3(verificationData.result.EvidenceVerifier.evidence_comparison).cont}
                                            </span>
                                            {/* <span className={px-2 py-1 rounded-full text-xs font-medium ${getAuthenticityBadge3(verificationData.result.EvidenceVerifier.evidence_comparison)}}> */}
                                            {/* {(parseFloat(verificationData.result.EvidenceVerifier.semantic_similarity_score) * 100).toFixed(0)}% Confidence */}
                                            {/* </span> */}
                                        </div>
                                        <p className="text-gray-600">{verificationData.result.EvidenceVerifier.reason}</p>
                                    </div>
                                )}
                            </div>

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
                                    Verify Another Article
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

function Texteditor({ value, onChange }: { value?: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    
    useEffect(() => {
        // Check if browser supports speech recognition
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('Your browser does not support Speech Recognition API');
            return;
        }

        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onstart = () => {
            setIsListening(true);
        };

        recognitionInstance.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result) => result.transcript)
                .join('');
            
            // Create a synthetic event to update the textarea
            const syntheticEvent = {
                target: { value: value + ' ' + transcript }
            } as ChangeEvent<HTMLTextAreaElement>;
            
            onChange(syntheticEvent);
        };

        recognitionInstance.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            // Don't stop listening on error, just log it
            if (event.error === 'network') {
                // Only these critical errors should stop the listening
                setIsListening(false);
            }
        };

        recognitionInstance.onend = () => {
            // If still in listening mode but recognition ended, restart it
            if (isListening) {
                try {
                    recognitionInstance.start();
                } catch (error) {
                    console.error("Failed to restart speech recognition:", error);
                    setIsListening(false);
                }
            } else {
                setIsListening(false);
            }
        };

        recognitionRef.current = recognitionInstance;

        // Cleanup
        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) {
                    // Ignore errors on cleanup
                }
            }
        };
    }, [isListening, value, onChange]);

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        
        if (isListening) {
            // User explicitly stopping
            setIsListening(false);
            try {
                recognitionRef.current.stop();
            } catch (e) {
                console.error("Error stopping recognition:", e);
            }
        } else {
            // Starting recognition
            setIsListening(true);
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Error starting recognition:", e);
                setIsListening(false);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="relative">
                <textarea
                    value={value}
                    onChange={onChange}
                    rows={8}
                    className="block p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Write your content here... Be detailed and informative. Or click the microphone to use speech-to-text."
                    required
                />
                <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute bottom-3 right-3 p-2 rounded-full ${
                        isListening 
                            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                    } transition-colors`}
                    title={isListening ? "Stop listening" : "Start speech to text"}
                >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
            </div>
            <div className="flex justify-between mt-2">
                <p className="text-xs text-gray-500">
                    Use clear, concise language. Adding relevant details helps readers understand your content better.
                </p>
                {isListening && (
                    <p className="text-xs text-green-600 font-medium animate-pulse">
                        Listening continuously... click microphone to stop
                    </p>
                )}
            </div>
        </div>
    );
}