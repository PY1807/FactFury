import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTrending } from '../hooks';
import TrendingPostSkeleton from './TrendingPostSkeleton';
// import { useTrending } from '../hooks';

interface TrendingHashtag {
  hashtag: string;
  count: number;
}

export const TrendingPost: React.FC = () => {
  const navigate = useNavigate();
  const {loading,trending_hashtag}=useTrending();
  // let loading=false;
  // const trending_hashtag: TrendingHashtag[] = [
  //   {
  //     "hashtag": "#ViratKohli",
  //     "count": 5
  //   },
  //   {
  //     "hashtag": "#Cricket",
  //     "count": 5
  //   },
  //   {
  //     "hashtag": "#AI",
  //     "count": 2
  //   },
  //   {
  //     "hashtag": "#TechInnovation",
  //     "count": 1
  //   },
  //   {
  //     "hashtag": "#FutureTech",
  //     "count": 1
  //   }
  // ];

  const handleHashtagClick = (hashtag: string): void => {
    // Remove the # symbol for the URL
    const formattedHashtag = hashtag.replace('#', '');
    navigate(`/hashtag?q=${encodeURIComponent(formattedHashtag)}`);
  };

  if(loading){
    return(
      <TrendingPostSkeleton/>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Trending Now</h2>
      <div className="space-y-2">
        {trending_hashtag.map((item, index) => (
          <div 
            key={index}
            onClick={() => handleHashtagClick(item.hashtag)}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-3 rounded-md transition-colors duration-200 border-b border-gray-100 last:border-0"
          >
            <div>
              <p className="font-semibold text-green-700 hover:underline">
                {item.hashtag}
              </p>
              <p className="text-sm text-gray-600">
                {item.count} {item.count === 1 ? 'post' : 'posts'}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-green-700 transition-colors duration-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPost;