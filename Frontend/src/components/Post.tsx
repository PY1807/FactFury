import { Calendar, Check, X, Info, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PostStructure } from "../hooks";


interface ReadMoreTextProps {
  text: string;
  maxLength?: number;
}

const ReadMoreText = ({ text, maxLength = 150 }: ReadMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) return <p className="text-sm text-gray-600 mb-2">{text}</p>;

  return (
    <div className="text-sm text-gray-600 mb-2">
      {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-1 text-green-600 hover:text-green-700 font-medium inline-flex items-center"
      >
        {isExpanded ? (
          <>Show Less <ChevronUp className="h-4 w-4 ml-0.5" /></>
        ) : (
          <>Read More <ChevronDown className="h-4 w-4 ml-0.5" /></>
        )}
      </button>
    </div>
  );
};

const ReadMoreText2 = ({ text, maxLength = 350 }: ReadMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) return <p className="text-sm text-gray-600 mb-2">{text}</p>;

  return (
    <div className="text-sm text-gray-600 mb-2">
      {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-1 text-green-600 hover:text-green-700 font-medium inline-flex items-center"
      >
        {isExpanded ? (
          <>Show Less <ChevronUp className="h-4 w-4 ml-0.5" /></>
        ) : (
          <>Read More <ChevronDown className="h-4 w-4 ml-0.5" /></>
        )}
      </button>
    </div>
  );
};

export const Post = ({
  name,
  title,
  content,
  result,
  final_result,
  created_at
}: PostStructure) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleHashtagClick = (hashtag: string): void => {
    const formattedHashtag = hashtag.replace('#', '');
    navigate(`/hashtag?q=${encodeURIComponent(formattedHashtag)}`);
  };

  const extractHashtags = (content: string) => {
    const regex = /#[a-zA-Z0-9_]+/g;
    return content.match(regex) || [];
  };

  const getScoreColor = (score: number) => {
    if (score > 0.7) {
      return 'bg-green-600';
    } else if (score >= 0.4) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }

  };

  const getAuthenticityBadge = (authenticity: string) => {
    if (authenticity === "Real") {
      return { bg: "bg-green-50", text: "text-green-700", icon: <Check className="h-4 w-4 mr-1" /> };
    } else if (authenticity === "Fake") {
      return { bg: "bg-red-50", text: "text-red-700", icon: <X className="h-4 w-4 mr-1" /> };
    } else if (authenticity?.includes("Real/Fake")) {
      return { bg: "bg-gray-100", text: "text-gray-700", icon: <Info className="h-4 w-4 mr-1" /> };
    } else {
      return { bg: "bg-yellow-50", text: "text-yellow-700", icon: <AlertTriangle className="h-4 w-4 mr-1" /> };
    }
  };

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


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {/* Post Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-semibold">{name.substring(0, 2)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {formatDate(created_at)}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {final_result ? (
                  <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                    <Check className="h-4 w-4 mr-1" />
                    Real
                  </span>
                ) : (
                  <span className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm">
                    <X className="h-4 w-4 mr-1" />
                    Fake
                  </span>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
            <p className="text-gray-600 mb-4"><ReadMoreText2 text={content} /></p>

            <div className="flex flex-wrap gap-2 mt-3">
              {extractHashtags(content).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-green-700 bg-green-50 px-2.5 py-1 rounded-md text-sm hover:bg-green-100 transition cursor-pointer"
                  onClick={() => handleHashtagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Analysis Results */}
          <div className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2 text-green-700" />
              Fact Analysis Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* News Verification */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-800">News Checker</h4>
                  <span className={`flex items-center ${getAuthenticityBadge(result.NewsChecker.news_authenticity).text} ${getAuthenticityBadge(result.NewsChecker.news_authenticity).bg} px-2 py-0.5 rounded-md text-xs`}>
                    {getAuthenticityBadge(result.NewsChecker.news_authenticity).icon}
                    {result.NewsChecker.news_authenticity}
                  </span>
                </div>
                <ReadMoreText text={result.NewsChecker.reason} />
              </div>

              {/* Structure Analysis */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-800">Structure Analyzer</h4>
                  <span className={`flex items-center ${getAuthenticityBadge(result.StructureAnalyzer.news_authenticity).text} ${getAuthenticityBadge(result.StructureAnalyzer.news_authenticity).bg} px-2 py-0.5 rounded-md text-xs`}>
                    {getAuthenticityBadge(result.StructureAnalyzer.news_authenticity).icon}
                    {result.StructureAnalyzer.news_authenticity}
                  </span>
                </div>
                <ReadMoreText text={result.StructureAnalyzer.reason} />
              </div>

              {/* Semantic Analysis */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-800">Semantic Analyzer</h4>
                  <span className={`flex items-center ${getAuthenticityBadge2(result.SemanticAnalyzer.confidence_score).text} ${getAuthenticityBadge2(result.SemanticAnalyzer.confidence_score).bg} px-2 py-0.5 rounded-md text-xs`}>
                    {getAuthenticityBadge2(result.SemanticAnalyzer.confidence_score).icon}
                    {getAuthenticityBadge2(result.SemanticAnalyzer.confidence_score).cont}
                  </span>
                </div>
                <ReadMoreText text={result.StructureAnalyzer.reason} />
              </div>


              {/* Evidence Verification */}
              {result.EvidenceVerifier.remarks !== "Error" ? (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-800">Evidence Verifier</h4>
                    <span className={`flex items-center ${getAuthenticityBadge3(result.EvidenceVerifier.evidence_comparison).text} ${getAuthenticityBadge3(result.EvidenceVerifier.evidence_comparison).bg} px-2 py-0.5 rounded-md text-xs`}>
                      {getAuthenticityBadge3(result.EvidenceVerifier.evidence_comparison).icon}
                      {getAuthenticityBadge3(result.EvidenceVerifier.evidence_comparison).cont}
                    </span>
                  </div>
                  <ReadMoreText text={result.EvidenceVerifier.reason} />
                </div>
                // <div className="bg-white p-4 rounded-lg shadow-sm">
                //   <h4 className="font-medium text-gray-800 mb-2">Evidence Verification</h4>
                //   <span className={`flex items-center ${getAuthenticityBadge3(result.EvidenceVerifier.evidence_comparison).text} ${getAuthenticityBadge3(result.EvidenceVerifier.evidence_comparison).bg} px-2 py-0.5 rounded-md text-xs`}>
                //     {getAuthenticityBadge3(result.EvidenceVerifier.evidence_comparison).icon}
                //     {getAuthenticityBadge3(result.EvidenceVerifier.evidence_comparison).cont}
                //   </span>
                //   <ReadMoreText text={result.EvidenceVerifier.reason} />
                //   {/* <div className="mt-2">
                //     <span className="text-xs text-gray-500">Similarity Score:</span>
                //     <div className="h-2 w-full bg-gray-200 rounded-full mt-1 overflow-hidden">
                //       <div
                //         className={`h-2 ${getScoreColor(result.EvidenceVerifier.semantic_similarity_score)}`}
                //         style={{ width: `${result.EvidenceVerifier.semantic_similarity_score * 100}%` }}
                //       ></div>
                //     </div>
                //     <span className="text-xs text-gray-500 float-right mt-1">
                //       {(result.EvidenceVerifier.semantic_similarity_score * 100).toFixed(0)}%
                //     </span>
                //   </div> */}
                // </div>
              ) : (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-800 mb-2">Evidence Verification</h4>
                  <p className="text-sm text-gray-600 mb-2">{"The URLs that you provided don't contain any valid information regarding your News."}</p>
                  {/* <div className="mt-2">
                    <span className="text-xs text-gray-500">Similarity Score:</span>
                    <div className="h-2 w-full bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-2 ${getScoreColor(0)}`}
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 float-right mt-1">0%</span>
                  </div> */}
                </div>
              )}
            </div>

            {/* Final Verdict */}
            <div className={`mt-6 p-4 rounded-lg ${final_result ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-start">
                {final_result ? (
                  <Check className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-semibold ${final_result ? 'text-green-700' : 'text-red-700'} mb-1`}>
                    {final_result ? 'This information appears to be accurate' : 'This information requires caution'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {final_result
                      ? 'Based on our analysis, this post contains information that is likely to be accurate. Always verify important news from multiple reliable sources.'
                      : 'Our analysis detected potential issues with this post. We recommend checking additional reliable sources before sharing.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};