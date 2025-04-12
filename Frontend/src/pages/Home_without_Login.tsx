import { Navbar } from "../components/Navbar";
import front_image from "../assets/FakeNewsWeb.jpg";
import { Navigate, useNavigate } from "react-router-dom";

export const Home_without_Login = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
            <div>
                <Navbar type="Not Login" />
            </div>
            <div className="my-20">
                {/* Hero Section */}
                <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-6 py-12 gap-8" id="top">
                    <div className="order-2 md:order-1 max-w-xl w-full text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                            Welcome to <span className="text-green-700">Fact Fury</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Get accurate insights on the latest news. Verify the truth of every
                            story with the power of AI.
                        </p>
                        <p className="text-md text-gray-500 mb-8">
                            In a world flooded with information, finding the truth has never been more challenging.
                            Fact Fury helps you cut through the noise with advanced deepfake detection and
                            multilingual support for 10+ Indian regional languages.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button className="bg-white text-green-700 border border-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition duration-300 shadow-md" onClick={() => {
                                navigate('/signin')
                            }}>
                                Get Started
                            </button>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 w-full max-w-lg mb-8 md:mb-0">
                        <img
                            src={front_image}
                            alt="Fact Fury - Fighting Fake News"
                            className="rounded-xl shadow-xl w-full h-auto object-cover transform hover:scale-105 transition duration-500"
                        />
                    </div>
                </main>
            </div>

            {/* Features Section */}
            <section className="bg-white py-12 px-6" id="features">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Advanced Fact-Checking Tools</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Text News Verification</h3>
                            <p className="text-gray-600 text-center md:text-left">Upload or link to any news article and get an instant AI-powered authenticity score with detailed analysis.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Video Authentication</h3>
                            <p className="text-gray-600 text-center md:text-left">Analyze YouTube videos and other video content through transcript analysis to detect misinformation and manipulation.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Deepfake Detection</h3>
                            <p className="text-gray-600 text-center md:text-left">Advanced AI technology to identify manipulated images and videos with high accuracy and detailed explanations.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Unified News Platform</h3>
                            <p className="text-gray-600 text-center md:text-left">Access all your news sources in one place with built-in verification tools for every article you read.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Multilingual Support</h3>
                            <p className="text-gray-600 text-center md:text-left">Full functionality in 10+ Indian regional languages including Hindi, Bengali, Tamil, Telugu, Marathi, and more.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Trending Insights</h3>
                            <p className="text-gray-600 text-center md:text-left">Stay informed with trending news alerts and our curated list of fact-checked trending stories.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Debunked News Section */}
            <section className="bg-gray-50 py-12 px-6" id="false-news">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Debunked News Center</h2>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
                        Our continuously updated database of debunked news helps you stay protected from misinformation. Browse our collection of analyzed false news to build your fact-checking skills.
                    </p>

                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-center">Features of our Debunked News Center</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1">Categorized Misinformation</h4>
                                    <p className="text-gray-600 text-sm">Browse false news by categories like politics, health, science, and entertainment.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1">Detailed Analysis</h4>
                                    <p className="text-gray-600 text-sm">See exactly why news was flagged as false with point-by-point rebuttals.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1">Real-time Updates</h4>
                                    <p className="text-gray-600 text-sm">Our team constantly monitors and adds newly debunked stories to keep you protected.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1">Community Discussion</h4>
                                    <p className="text-gray-600 text-sm">Engage with our community of fact-checkers to discuss and learn more about each case.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition duration-300 shadow-md" onClick={() => {
                            navigate('/signin')
                        }}>
                            Explore Debunked News
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white py-12 px-6" id="about">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">How Fact Fury Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Verify News</h3>
                            <p className="text-gray-600 text-center md:text-left">Upload or link to any news article, image, or video to get an instant AI-powered authenticity score with detailed explanation.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Get Facts</h3>
                            <p className="text-gray-600 text-center md:text-left">Receive detailed explanations about why a news piece might be misleading or false in your preferred language.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Stay Informed</h3>
                            <p className="text-gray-600 text-center md:text-left">Access trending verified news, build your knowledge base, and learn to spot misinformation on your own.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending News Section */}
            <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12 px-6" id="trending">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Trending Verified News</h2>
                    <p className="text-green-100 text-center max-w-3xl mx-auto mb-10">
                        Stay informed with our curated selection of fact-checked trending stories. Get the real story behind what everyone's talking about.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* These would be populated dynamically in the real app */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden text-gray-800">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                                <div className="flex items-center mb-2">
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Verified</span>
                                    <span className="ml-2 text-xs text-gray-500">Trending Today</span>
                                </div>
                                <h3 className="font-semibold mb-2">Latest Economic Policy Changes Explained</h3>
                                <p className="text-gray-600 text-sm mb-3">A comprehensive look at the new economic policies and their potential impact...</p>
                                <button className="text-green-700 text-sm font-medium hover:text-green-800">Read More →</button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden text-gray-800">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                                <div className="flex items-center mb-2">
                                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">Debunked</span>
                                    <span className="ml-2 text-xs text-gray-500">Viral Misinformation</span>
                                </div>
                                <h3 className="font-semibold mb-2">False Claims About New Healthcare Initiative</h3>
                                <p className="text-gray-600 text-sm mb-3">Our fact-checkers analyzed widely shared claims about the new healthcare initiative...</p>
                                <button className="text-green-700 text-sm font-medium hover:text-green-800">Read More →</button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden text-gray-800">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                                <div className="flex items-center mb-2">
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">Partially True</span>
                                    <span className="ml-2 text-xs text-gray-500">Needs Context</span>
                                </div>
                                <h3 className="font-semibold mb-2">Recent Research Findings on Climate Change</h3>
                                <p className="text-gray-600 text-sm mb-3">The viral claims contain some truth but miss important context about the recent research...</p>
                                <button className="text-green-700 text-sm font-medium hover:text-green-800">Read More →</button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 shadow-lg" onClick={() => {
                            navigate('/signup')
                        }}>
                            Browse All Trending News
                        </button>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gray-800 text-white py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to cut through the noise?</h2>
                    <p className="mb-8 text-gray-300">Join thousands of truth-seekers who use Fact Fury to separate fact from fiction in multiple languages.</p>
                    <button className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition duration-300 shadow-lg" onClick={() => {
                        navigate('/signup')
                    }}>
                        Sign Up for Free
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Fact Fury</h3>
                        <p className="text-gray-400">Your trusted ally in the fight against misinformation in multiple languages.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Navigation</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#top" className="hover:text-white transition">Home</a></li>
                            <li><a href="#features" className="hover:text-white transition">Features</a></li>
                            <li><a href="#false-news" className="hover:text-white transition">Debunked News</a></li>
                            <li><a href="#about" className="hover:text-white transition">How It Works</a></li>
                            <li><a href="#trending" className="hover:text-white transition">Trending News</a></li>
                            <li><a href="mailto:zaidkh1303@gmail.com?subject=Contact%20from%20Fact%20Fury%20Website" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Supported Languages</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Hindi</li>
                            <li>Bengali</li>
                            <li>Tamil</li>
                            <li>Telugu</li>
                            <li>Marathi</li>
                            <li>And 5+ more</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Connect</h4>
                        <div className="flex space-x-4 mt-3">
                            <a href="https://www.instagram.com/zaidkh_13/" className="text-gray-400 hover:text-white transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a href="https://x.com/PriyanshuY8336" className="text-gray-400 hover:text-white transition">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/mohd-zaid-887207257/" className="text-gray-400 hover:text-white transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <a href="#" className="hover:text-white transition">Terms of Service</a>
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Cookie Policy</a>
                        <a href="#" className="hover:text-white transition">Accessibility</a>
                    </div>
                    <p>© {new Date().getFullYear()} Fact Fury. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};