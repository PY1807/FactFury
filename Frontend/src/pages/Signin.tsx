import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Navbar } from "../components/Navbar";

interface SigninInput {
    password: string;
    contact_number: string;
}

export const Signin = () => {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<SigninInput>({
        contact_number: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function sendRequest() {
        setIsLoading(true);
        setError("");
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/login`, postInput);
            if(response.data.token===undefined){
                alert('Signin Failed! Check your details and try again')
                navigate('/signin')
            }
            else{
                const jwttoken = response.data.token;
                localStorage.setItem("token", jwttoken);
                navigate('/dashboard');
            }
        }
        catch (e) {
            setError("Signin failed. Please check your credentials and try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
            <Navbar type="Not Login"/>
            
            <div className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to continue your fact-checking journey</p>
                    </div>
                    
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <LabelInput 
                            label="Phone Number" 
                            placeholder="Enter your phone number" 
                            onchange={(e) => {
                                setPostInput({
                                    ...postInput,
                                    contact_number: e.target.value
                                })
                            }} 
                        />
                        
                        <LabelInput 
                            label="Password" 
                            type="password" 
                            placeholder="Enter your password" 
                            onchange={(e) => {
                                setPostInput({
                                    ...postInput,
                                    password: e.target.value
                                })
                            }} 
                        />
                    </div>
                    
                    <button 
                        onClick={sendRequest} 
                        disabled={isLoading}
                        className="mt-8 w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : "Sign In"}
                    </button>
                    
                    <div className="mt-6 text-center text-gray-600 text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-green-700 hover:text-green-800 font-medium">
                            Sign up
                        </Link>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
                        By signing in, you agree to our{" "}
                        <a href="#" className="text-green-700 hover:underline">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="text-green-700 hover:underline">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelInputType {
    label: string;
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelInput({ label, placeholder, onchange, type }: LabelInputType) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <input 
                    onChange={onchange} 
                    type={type || "text"} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3 transition-all duration-200" 
                    placeholder={placeholder} 
                    required 
                />
            </div>
        </div>
    );
}