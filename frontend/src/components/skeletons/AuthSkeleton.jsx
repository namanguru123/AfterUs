const AuthSkeleton = () => {
  return (
    <div className="h-screen w-screen flex bg-slate-50">

      {/* Sidebar Skeleton */}
      <aside className="w-80 bg-gradient-to-b from-slate-900 to-slate-800 p-6">
        <div className="h-10 w-40 bg-slate-700 rounded mb-8 animate-pulse" />

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full bg-slate-700 rounded-lg animate-pulse"
            />
          ))}
        </div>

        <div className="mt-auto pt-10">
          <div className="h-16 w-full bg-slate-700 rounded-xl animate-pulse" />
        </div>
      </aside>

      {/* Main Skeleton */}
      <div className="flex-1 flex flex-col">

        {/* Header Skeleton */}
        <div className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="h-8 w-40 bg-slate-200 rounded animate-pulse" />
          <div className="flex gap-3">
            <div className="h-9 w-28 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-9 w-24 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-9 w-9 bg-slate-200 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 p-8 space-y-4">
          <div className="h-6 w-1/3 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
        </div>

      </div>
    </div>
  );
};

export default AuthSkeleton;
