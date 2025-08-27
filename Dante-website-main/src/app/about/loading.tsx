export default function LoadingAbout() {
  return (
    <main className="min-h-screen animated-bg">
      <div className="container py-28 space-y-16">
        {/* Title skeleton */}
        <div className="space-y-3 animate-fade-in">
          <div className="h-9 w-40 bg-white/10 rounded-md" />
          <div className="h-4 w-72 bg-white/10 rounded-md" />
        </div>

        {/* Team grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden p-0"
            >
              {/* Banner placeholder */}
              <div className="relative h-28 w-full rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 bg-[length:200%_200%] animate-gradient" />
              </div>
              {/* Avatar placeholder */}
              <div className="-mt-8 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-white/10 border border-white/10" />
              </div>
              {/* Text lines */}
              <div className="px-4 py-6 space-y-3">
                <div className="h-5 w-40 bg-white/10 rounded" />
                <div className="h-3 w-28 bg-white/10 rounded" />
                <div className="h-3 w-full bg-white/10 rounded" />
                <div className="h-3 w-5/6 bg-white/10 rounded" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 bg-white/10 rounded-full" />
                  <div className="h-6 w-16 bg-white/10 rounded-full" />
                  <div className="h-6 w-16 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
