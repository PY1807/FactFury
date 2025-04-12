import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Check, X } from "lucide-react";

interface VerificationResult {
    Result: {
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
        final_result: Boolean
    };
}

export const Transcript_verify = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [verificationData, setVerificationData] = useState<VerificationResult | null>(null);
    const navigate = useNavigate();

    const getAuthenticityBadge2 = (score: number) => {
        if (score >= 0.5) {
            return { bg: "bg-green-50", text: "text-green-700", icon: <Check className="h-4 w-4 mr-1" />, cont: "Real" };
        } else {
            return { bg: "bg-red-50", text: "text-red-700", icon: <X className="h-4 w-4 mr-1" />, cont: "Fake" };
        }
    };

    const handleVerify = async () => {
        if (!videoUrl.trim()) {
            setError("Please enter a YouTube video URL");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            console.log(videoUrl)
            const response = await axios.get(`${BACKEND_URL}/api/youtube_news_checker`, {
                params: {
                    video_url: videoUrl
                },
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setVerificationData({
                "Result": JSON.parse(response.data.Result)
            });
            // console.log(response.data.Result)
            // setVerificationData(response.data);
            
            // setVerificationData({
            //     "Result": JSON.parse("{\"NewsChecker\": {\"news_authenticity\": \"Real\", \"reason\": \"The posted article accurately reflects the key points of the real article. Both articles mention the severe impact of Trump's tariffs on the U.S. stock markets, with specific details such as the Dow Jones Industrial Average plummeting by 2,000 points and the market meltdown being compared to the Covid-19 crash. The real article provides additional context and details, such as the global extent of the market turmoil, the retaliation by China, the impact on India, and the performance of specific indices like the S&P 500 and FTSE 100. However, the core information about the significant drop in the U.S. stock markets due to Trump's tariffs is consistent between both articles.\", \"remarks\": \"Done\"}, \"StructureAnalyzer\": {\"news_authenticity\": \"Real\", \"reason\": \"The model has predicted the news article as 'Real' based on several structural and grammatical features that are consistent with authentic news articles. Here are the key reasons:\\n\\n1. *Consistent Tone and Style: The article maintains a consistent tone and style throughout, which is typical of professionally written news articles. The use of formal language and the inclusion of quotes from prominent figures like Donald Trump and other officials add to its authenticity.\\n\\n2. **Proper Use of Punctuation: The article uses punctuation correctly, with appropriate use of commas, periods, and quotation marks. This attention to detail is indicative of a well-edited piece, which is less common in fake news articles.\\n\\n3. **Coherent Structure: The news article follows a coherent structure, starting with a hook, providing background information, and then delving into the details of the trade war and its impacts. This logical flow is a hallmark of genuine news reporting.\\n\\n4. **Specific Details and Figures: The article includes specific details and figures, such as the amount of money lost in the stock market ($2.4 trillion) and the percentage increase in the odds of a global recession (60%). These specifics lend credibility to the article, as fake news often lacks such precise information.\\n\\n5. **Quotes from Credible Sources: The inclusion of quotes from credible sources, such as Donald Trump, the IMF, and JP Morgan, enhances the article's reliability. These quotes are properly attributed and contextualized, which is a sign of authentic journalism.\\n\\n6. **Lack of Grammatical Errors: The article is largely free of grammatical errors, which is another indicator of its authenticity. Fake news often contains numerous grammatical mistakes due to lack of professional editing.\\n\\n7. **Contextual Relevance: The article discusses a relevant and timely topic\—the impact of Donald Trump's tariff policies on global trade and the stock market. This relevance adds to its credibility, as fake news often focuses on sensational but less relevant topics.\\n\\nThese structural and grammatical features collectively support the model's prediction that the news article is real.\", \"remarks\": \"Done\"}, \"SemanticAnalyzer\": {\"news_authenticity\": \"Real\", \"reason\": \"The news article appears to be real based on several factors:\\n\\n1. **Consistency with Known Events: The article discusses Donald Trump's tariff policies and their impact on global markets, which is a well-documented event. The mention of significant market losses and the reaction of global financial institutions like the IMF and WTO aligns with real-world events.\\n\\n2. **Specific Details: The article provides specific details such as the amount of money lost in the stock market ($2.4 trillion in the US and 9.5 lakh crore rupees in India), which are verifiable and add credibility.\\n\\n3. **Quotes from Key Figures: The inclusion of direct quotes from Donald Trump and other prominent figures, such as the head of the IMF, Cristina Georgie Evva, and US Vice President JD Vance, enhances the authenticity of the article.\\n\\n4. **Logical Flow and Coherence: The article follows a logical structure, discussing the impact of Trump's tariffs on global markets, the reactions of various countries and institutions, and the potential long-term effects. This coherence suggests a well-researched and factual basis.\\n\\n5. **Contextual Relevance: The article touches on relevant geopolitical issues, such as the situation in Kashmir and Syria, which are real and ongoing concerns. This contextual relevance adds to the article's credibility.\\n\\n6. **Lack of Sensationalism*: While the article uses strong language to describe the impact of the tariffs (e.g., \\\"stock market armageddon\\\"), it does so in a way that is consistent with the severity of the described events, rather than relying on pure sensationalism.\\n\\nThese factors collectively contribute to the prediction that the news article is real.\", \"confidence_score\": 0.6, \"remarks\": \"Done\"}, \"final_result\": true}")
            // });

        } catch (e) {
            setError("Failed to verify video. Please check the URL and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setVerificationData(null);
        setVideoUrl("");
        setError("");
    };

    const getStatusColor = (result: string) => {
        if (result === "Real") {
            return { bg: "bg-green-50", text: "text-green-700", icon: <Check className="h-4 w-4 mr-1" />, cont: "Real" };
        } else {
            return { bg: "bg-red-50", text: "text-red-700", icon: <X className="h-4 w-4 mr-1" />, cont: "Fake" };
        }
    };

    // Extract YouTube video ID for embedding
    const getYoutubeVideoId = (url: string) => {
        const regExp = /^.(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
            <Navbar type="Login" />

            <div className="flex-grow flex justify-center px-4 py-8">
                <div className="max-w-screen-lg w-full">
                    {!verificationData ? (
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-6">Verify YouTube News</h1>

                            {error && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="videoUrl" className="block mb-2 text-sm font-medium text-gray-700">YouTube Video URL</label>
                                    <input
                                        id="videoUrl"
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        className="block p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        placeholder="Enter YouTube video URL (e.g., https://www.youtube.com/watch?v=...)"
                                        required
                                    />
                                    <p className="mt-2 text-xs text-gray-500">
                                        Enter the full URL of the YouTube video you want to verify.
                                    </p>
                                </div>

                                <button
                                    onClick={handleVerify}
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
                                    ) : "Verify Video"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Verification Result</h1>
                            <p className="text-gray-600 mb-6">Results for YouTube video</p>

                            {/* Embed YouTube video */}
                            {getYoutubeVideoId(videoUrl) && (
                                <div className="mb-6 aspect-video w-full max-w-2xl mx-auto">
                                    <iframe
                                        className="w-full h-full rounded-lg shadow"
                                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(videoUrl)}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}

                            <div className={`mb-8 p-4 rounded-lg ${verificationData.Result.final_result ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                <div className="flex items-center">
                                    <div className={`rounded-full p-2 mr-3 ${verificationData.Result.final_result ? 'bg-green-100' : 'bg-red-100'}`}>
                                        {verificationData.Result.final_result ? (
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
                                        <h2 className={`text-xl font-bold ${verificationData.Result.final_result ? 'text-green-700' : 'text-red-600'}`}>
                                            {verificationData.Result.final_result ? 'Verified Authentic' : 'Likely Misinformation'}
                                        </h2>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {verificationData.Result.final_result
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
                                        <span className={`flex items-center ${getStatusColor(verificationData.Result.NewsChecker.news_authenticity).text} ${getStatusColor(verificationData.Result.NewsChecker.news_authenticity).bg} px-2 py-0.5 rounded-md text-sm`}>
                                            {getStatusColor(verificationData.Result.NewsChecker.news_authenticity).icon}
                                            {getStatusColor(verificationData.Result.NewsChecker.news_authenticity).cont}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">{verificationData.Result.NewsChecker.reason}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-medium text-gray-800">Content Structure Analysis</h4>
                                        <span className={`flex items-center ${getStatusColor(verificationData.Result.StructureAnalyzer.news_authenticity).text} ${getStatusColor(verificationData.Result.StructureAnalyzer.news_authenticity).bg} px-2 py-0.5 rounded-md text-sm`}>
                                            {getStatusColor(verificationData.Result.StructureAnalyzer.news_authenticity).icon}
                                            {getStatusColor(verificationData.Result.StructureAnalyzer.news_authenticity).cont}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">{verificationData.Result.StructureAnalyzer.reason}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-medium text-gray-800">Semantic Meaning Analysis</h4>
                                        <span className={`flex items-center ${getAuthenticityBadge2(verificationData.Result.SemanticAnalyzer.confidence_score).text} ${getAuthenticityBadge2(verificationData.Result.SemanticAnalyzer.confidence_score).bg} px-2 py-0.5 rounded-md text-sm`}>
                                            {getAuthenticityBadge2(verificationData.Result.SemanticAnalyzer.confidence_score).icon}
                                            {getAuthenticityBadge2(verificationData.Result.SemanticAnalyzer.confidence_score).cont}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">{verificationData.Result.SemanticAnalyzer.reason}</p>
                                </div>
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
                                    Verify Another Video
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