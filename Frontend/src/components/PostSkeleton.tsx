import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 animate-pulse">
          {/* Post Header Skeleton */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>

            {/* Title Skeleton */}
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-3" />

            {/* Content Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>

            {/* Hashtags Skeleton */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="h-6 w-20 bg-gray-200 rounded-md" />
              ))}
            </div>
          </div>

          {/* Analysis Results Skeleton */}
          <div className="p-6 bg-gray-50">
            <div className="h-6 w-48 bg-gray-200 rounded mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Analysis Cards Skeleton */}
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-5 w-32 bg-gray-200 rounded" />
                    <div className="h-5 w-16 bg-gray-200 rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  </div>
                  {idx > 1 && (
                    <div className="mt-4">
                      <div className="h-2 w-full bg-gray-200 rounded-full" />
                      <div className="flex justify-end mt-1">
                        <div className="h-3 w-8 bg-gray-200 rounded" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Final Verdict Skeleton */}
            <div className="mt-6 p-4 rounded-lg bg-gray-100">
              <div className="flex items-start">
                <div className="h-6 w-6 bg-gray-200 rounded mr-3" />
                <div className="flex-1">
                  <div className="h-5 w-64 bg-gray-200 rounded mb-2" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;