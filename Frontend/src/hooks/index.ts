import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface PostStructure {
    name: string;
    title: string;
    content: string;
    result: {
        "NewsChecker": {
            news_authenticity: string,
            reason: string,
            remarks: string
        },
        "StructureAnalyzer": {
            news_authenticity: string,
            reason: string,
            remarks: string
        },
        "SemanticAnalyzer": {
            news_authenticity: string,
            reason: string,
            confidence_score: number,
            remarks: string
        },
        "EvidenceVerifier": {
            evidence_comparison: string,
            reason: string,
            semantic_similarity_score: number,
            remarks: string
        }
    },
    final_result: string;
    created_at: string;
}

export const usePosts = () => {
    const [loading, setloading] = useState(true);
    const [post, setpost] = useState<PostStructure[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/allposts`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                });
                setpost(response.data.posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setloading(false);
            }
        };
        fetchPosts();
    }, []);

    return { loading, post };
}

export const useFalsePost = () => {
    const [loading, setloading] = useState(true);
    const [post, setpost] = useState<PostStructure[]>([]);

    useEffect(() => {
        const fetchFalsePosts = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/fake_posts`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                });
                setpost(response.data.posts);
            } catch (error) {
                console.error("Error fetching false posts:", error);
            } finally {
                setloading(false);
            }
        };
        fetchFalsePosts();
    }, []);

    return { loading, post };
}


interface TrendingHashtag {
    hashtag: string;
    count: number;
}

export const useTrending = () => {
    const [loading, setloading] = useState(true);
    const [trending_hashtag, setpost] = useState<TrendingHashtag[]>([]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/trendingposts`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                });
                setpost(response.data.trending_posts);
            } catch (error) {
                console.error("Error fetching trending hashtags:", error);
            } finally {
                setloading(false);
            }
        };
        fetchTrending();
    }, []);

    return { loading, trending_hashtag };
}