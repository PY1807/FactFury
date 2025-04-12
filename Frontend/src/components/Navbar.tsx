import { Link, useNavigate } from "react-router-dom";
import { useState, KeyboardEvent } from "react";
import { Search } from "lucide-react";

export const Navbar = ({ type }: { type: "Login" | "Not Login" }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="border-b bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <button
          className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          onClick={() => {
            type === "Login" ? navigate("/dashboard") : navigate("/");
          }}
        >
          Fact Fury
        </button>

        {/* Search box - only for logged in users */}
        {type === "Login" && (
          <div className="hidden md:flex flex-grow mx-6 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="search" 
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 transition-all" 
                placeholder="Search facts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={handleSearch}
              />
            </div>
          </div>
        )}

        {/* Desktop Menu (for larger screens) */}
        <div className="lg:flex lg:space-x-8 hidden">
          {type === "Login" ? (
            <div className="flex items-center space-x-4">
              <Link to="/publish">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition-all"
                >
                  Publish
                </button>
              </Link>
              <Link to="/verify">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition-all"
                >
                  Verify
                </button>
              </Link>
              <Link to="/deepfake_detection">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition-all"
                >
                  DeepFake
                </button>
              </Link>
              <Link to="/transcript_verification">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition-all"
                >
                  Transcript
                </button>
              </Link>
              <Link to="/false">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition-all"
                >
                  False
                </button>
              </Link>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition-all"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                LogOut
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/signin">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition-all"
                >
                  Signin
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition-all"
                >
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden block text-gray-800 hover:text-gray-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu (for smaller screens) */}
      <div
        className={`lg:hidden bg-white w-full ${isOpen ? "block" : "hidden"} absolute top-16 left-0 shadow-lg border-t z-50`}
      >
        {type === "Login" ? (
          <div className="flex flex-col items-start">
            {/* Search box for mobile */}
            <div className="w-full px-4 pt-4 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="search" 
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 transition-all" 
                  placeholder="Search facts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={handleSearch}
                />
              </div>
            </div>
            <div className="w-full border-t border-gray-200 mt-2"></div>
            <Link to="/publish" className="w-full">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 m-4 w-[calc(100%-2rem)] transition-all"
              >
                Publish
              </button>
            </Link>
            <div className="w-full border-t border-gray-200 mt-2"></div>
            <Link to="/verify" className="w-full">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 m-4 w-[calc(100%-2rem)] transition-all"
              >
                Verify
              </button>
            </Link>
            <div className="w-full border-t border-gray-200 mt-2"></div>
            <Link to="/deepfake_detection" className="w-full">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 m-4 w-[calc(100%-2rem)] transition-all"
              >
                DeepFake
              </button>
            </Link>
            <div className="w-full border-t border-gray-200 mt-2"></div>
            <Link to="/transcript_verification" className="w-full">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 m-4 w-[calc(100%-2rem)] transition-all"
              >
                Transcript
              </button>
            </Link>
            <div className="w-full border-t border-gray-200"></div>
            <Link to="/false" className="w-full">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 m-4 w-[calc(100%-2rem)] transition-all"
              >
                False
              </button>
            </Link>
            <div className="w-full border-t border-gray-200"></div>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 m-4 w-[calc(100%-2rem)] transition-all"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              LogOut
            </button>
          </div>
        ) : (
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/signin" className="w-full">
              <button
                type="button"
                className="w-full px-5 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-full hover:bg-green-100 transition-all"
              >
                Signin
              </button>
            </Link>
            <div className="w-full border-t border-gray-200"></div>
            <Link to="/signup" className="w-full">
              <button
                type="button"
                className="w-full px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-500 rounded-full hover:from-green-700 hover:to-green-600 transition-all"
              >
                Signup
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;