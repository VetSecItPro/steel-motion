export default function CategoryLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
        <div className="h-8 bg-sm-surface-secondary rounded w-1/3 mx-auto" />
        <div className="h-4 bg-sm-surface-secondary rounded w-2/3 mx-auto" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-sm-surface-secondary rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
