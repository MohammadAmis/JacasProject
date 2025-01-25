const SkeletonLoader = () => (
    <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-64 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );

export default SkeletonLoader;