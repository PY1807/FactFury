import { ChangeEvent, useState } from "react";
import { Navbar } from "../components/Navbar"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
            await axios.post(`${BACKEND_URL}/api/posts/create`, {
                title,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/dashboard`);
        } catch (e) {
            setError("Failed to publish post. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
            <Navbar type="Login" />
            
            <div className="flex-grow flex justify-center px-4 py-8">
                <div className="max-w-screen-lg w-full">
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Post</h1>
                        
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
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="block p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 transition-all duration-200" 
                                    placeholder="Enter a descriptive title..." 
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700">Content</label>
                                <Texteditor 
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
                                        Publishing...
                                    </span>
                                ) : "Publish Post"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Texteditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="w-full">
            <textarea 
                onChange={onChange} 
                rows={8}
                className="block p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 transition-all duration-200" 
                placeholder="Write your content here... Be detailed and informative." 
                required
            />
            <p className="mt-2 text-xs text-gray-500">
                Use clear, concise language. Adding relevant details helps readers understand your content better.
            </p>
        </div>
    );
}