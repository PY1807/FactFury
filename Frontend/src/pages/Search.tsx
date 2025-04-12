import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import TrendingPost from "../components/Trending_post";
import { PostStructure } from "../hooks";
import { Post } from "../components/Post";
import TrendingPostSkeleton from "../components/TrendingPostSkeleton";
import PostSkeleton from "../components/PostSkeleton";
import SearchResultsAction from "../components/SearchResultsAction";

// interface SearchResult {
//   id: string;
//   title: string;
//   content: string;
//   // Add any other fields you expect from your search results
// }

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  const [post, setResults] = useState<PostStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/search`, {
          params: { query },
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        console.log(response.data.posts);
        setResults(response.data.posts);
        // const post: PostStructure[] = [
        //   {
        //     "name": "Py",
        //     "title": "Mitchell Starc withdraws from Champions Trophy",
        //     "content": "Australian fast bowler Mitchell Starc has withdrawn from the upcoming Champions Trophy due to injury concerns. His absence is a significant setback for the team, as he has been a key player in past tournaments. More details can be found on www.cricbuzz.com and www.espncricinfo.com. #Cricket #CT",
        //     "result": {
        //       "News Verification": {
        //         "news_authenticity": "Real",
        //         "reason": "Reason by LLM"
        //       },
        //       "Content Structure Analysis": {
        //         "news_authenticity": "Fake",
        //         "reason": "Reason by ML model depending upon the structure of content such as grammatical mistakes, punctuation errors, presence of hashtags, URLs, etc."
        //       },
        //       "Semantic Meaning Analysis": {
        //         "reason": "Reason using LSTM model depending upon the semantic meaning of content",
        //         "confidence_score": 0.85
        //       },
        //       "Evidence Cross-Check": {
        //         "reason": "Reason after verifying the posted article and provided evidence",
        //         "semantic_similarity_score": 0.5
        //       }
        //     },
        //     "final_result": true,
        //     "created_at": "Tue Feb 18 11:25:37 2025"
        //   },
        //   {
        //     "name": "Zaid",
        //     "title": "Mitchell Starc withdraws from Champions Trophy",
        //     "content": "Australian fast bowler Mitchell Starc has withdrawn from the upcoming Champions Trophy due to injury concerns. His absence is a significant setback for the team, as he has been a key player in past tournaments. More details can be found on www.cricbuzz.com and www.espncricinfo.com. #Cricket #CT",
        //     "result": {
        //       "News Verification": {
        //         "news_authenticity": "Real",
        //         "reason": "Reason by LLM"
        //       },
        //       "Content Structure Analysis": {
        //         "news_authenticity": "Fake",
        //         "reason": "Reason by ML model depending upon the structure of content such as grammatical mistakes, punctuation errors, presence of hashtags, URLs, etc."
        //       },
        //       "Semantic Meaning Analysis": {
        //         "reason": "Reason using LSTM model depending upon the semantic meaning of content",
        //         "confidence_score": 0.45
        //       },
        //       "Evidence Cross-Check": {
        //         "reason": "Reason after verifying the posted article and provided evidence",
        //         "semantic_similarity_score": 0.2
        //       }
        //     },
        //     "final_result": false,
        //     "created_at": "Tue Feb 18 11:25:37 2025"
        //   }
        // ];
        // setResults(post);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
        setError("Failed to fetch search results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
        <Navbar type="Login" />
        <div className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Search Results for "{query}"
          </h1>

          <div className="container mx-auto px-4 py-6">
            {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">
          <span className="text-green-700">Fact Fury</span> Dashboard
        </h1> */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main posts feed - takes 2/3 on desktop, full width on mobile */}
              <div className="w-full lg:w-2/3 order-2 lg:order-1">
                <div className="bg-white rounded-xl shadow-md mb-6 p-4">
                  {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest News</h2> */}
                  <PostSkeleton />
                </div>
              </div>

              {/* Trending section - right side on desktop, top on mobile */}
              <div className="w-full lg:w-1/3 order-1 lg:order-2">
                <div className="bg-white rounded-xl shadow-md p-4 sticky top-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    <span className="text-green-700">#</span> Trending Now
                  </h2>
                  <TrendingPostSkeleton />

                  {/* Action button - matches your site's CTA style */}
                  {/* <div className="mt-6 text-center">
                <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-300 shadow-md w-full" onClick={() => {
                  navigate('/verify');
                }}>
                  Verify New Article
                </button>
              </div> */}
                </div>
              </div>

            </div>
          </div>
        </div>
        {/* Footer with copyright - to match your site's style */}
        <footer className="bg-gray-800 text-white py-8 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fact Fury</h3>
              <p className="text-gray-400">Your trusted ally in the fight against misinformation.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#top" className="hover:text-white transition">Home</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                {/* <li><a href="#" className="hover:text-white transition">FAQ</a></li> */}
                <li><a href="mailto:zaidkh1303@gmail.com?subject=Contact%20from%20Fact%20Fury%20Website" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
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
            <p>© {new Date().getFullYear()} Fact Fury. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      <Navbar type="Login" />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Search Results for "{query}"
        </h1>
        <div className="container mx-auto px-4 py-6">
          {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">
                  <span className="text-green-700">Fact Fury</span> Dashboard
                </h1> */}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main posts feed - takes 2/3 on desktop, full width on mobile */}
            <div className="w-full lg:w-2/3 order-2 lg:order-1">
              <div className="bg-white rounded-xl shadow-md mb-6 p-4">
                {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest News</h2> */}
                {post.map(p => <Post
                  name={p.name}
                  title={p.title}
                  content={p.content}
                  result={p.result}
                  final_result={p.final_result}
                  created_at={p.created_at}
                />)}
              </div>
              <SearchResultsAction />
            </div>

            {/* Trending section - right side on desktop, top on mobile */}
            <div className="w-full lg:w-1/3 order-1 lg:order-2">
              <div className="bg-white rounded-xl shadow-md p-4 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  <span className="text-green-700">#</span> Trending Now
                </h2>
                <TrendingPost />

                {/* Action button - matches your site's CTA style */}
                <div className="mt-6 text-center">
                  <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-300 shadow-md w-full" onClick={() => {
                    navigate('/verify');
                  }}>
                    Verify News
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Fact Fury</h3>
            <p className="text-gray-400">Your trusted ally in the fight against misinformation.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#top" className="hover:text-white transition">Home</a></li>
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              {/* <li><a href="#" className="hover:text-white transition">FAQ</a></li> */}
              <li><a href="mailto:zaidkh1303@gmail.com?subject=Contact%20from%20Fact%20Fury%20Website" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookies</a></li>
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
          <p>© {new Date().getFullYear()} Fact Fury. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};