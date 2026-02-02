export default function ArticleLoading() {
  return (
    <main className="min-h-screen bg-sm-surface-primary">
      {/* Hero image skeleton */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="h-[400px] bg-sm-surface-secondary rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-4 w-32 bg-sm-surface-secondary rounded animate-pulse" />
          <div className="h-10 w-full bg-sm-surface-secondary rounded-lg animate-pulse" />
          <div className="h-6 w-3/4 bg-sm-surface-secondary rounded animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-sm-surface-secondary rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-sm-surface-secondary rounded animate-pulse" />
              <div className="h-3 w-24 bg-sm-surface-secondary rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-sm-surface-secondary rounded animate-pulse" style={{ width: `${85 + Math.random() * 15}%` }} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
