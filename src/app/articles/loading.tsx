export default function ArticlesLoading() {
  return (
    <main className="min-h-screen bg-sm-surface-primary">
      {/* Hero skeleton */}
      <div className="bg-[#0B1A2B] pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="h-8 w-48 bg-white/10 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-96 max-w-full bg-white/10 rounded-lg mx-auto mb-3 animate-pulse" />
          <div className="h-6 w-72 max-w-full bg-white/10 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Posts skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 w-48 bg-sm-surface-secondary rounded-lg animate-pulse mb-8" />
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-sm-surface-elevated rounded-xl border border-sm-border-default overflow-hidden">
                  <div className="h-48 bg-sm-surface-secondary animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-24 bg-sm-surface-secondary rounded animate-pulse" />
                    <div className="h-6 w-full bg-sm-surface-secondary rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-sm-surface-secondary rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-sm-surface-elevated rounded-xl border border-sm-border-default p-6">
              <div className="h-6 w-24 bg-sm-surface-secondary rounded animate-pulse mb-4" />
              <div className="h-10 bg-sm-surface-secondary rounded-lg animate-pulse" />
            </div>
            <div className="bg-sm-surface-elevated rounded-xl border border-sm-border-default p-6 space-y-3">
              <div className="h-6 w-20 bg-sm-surface-secondary rounded animate-pulse" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-sm-surface-secondary rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
