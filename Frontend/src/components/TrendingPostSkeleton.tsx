import React from 'react';

const TrendingPostSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Title Skeleton */}
      <div className="h-7 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
      
      {/* Trending Items Skeleton */}
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0"
          >
            <div className="space-y-2 animate-pulse">
              {/* Hashtag Skeleton */}
              <div className="h-5 w-24 bg-gray-200 rounded" />
              {/* Post Count Skeleton */}
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
            {/* Arrow Skeleton */}
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPostSkeleton;