export const AuthCardSkeleton = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-primary/5 via-white to-primary/5 py-12 px-2">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center animate-pulse" />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="h-8 w-32 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
          <div className="text-center">
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
};
