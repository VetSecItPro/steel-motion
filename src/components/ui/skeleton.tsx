import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-700/50",
        className
      )}
    />
  )
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-xl bg-[#1a3a5c]/40 border border-[#00F2FF]/20 overflow-hidden", className)}>
      {/* Image placeholder */}
      <Skeleton className="h-48 w-full rounded-none" />
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Category badge */}
        <Skeleton className="h-6 w-24 rounded-full" />
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        {/* Excerpt */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        {/* Meta */}
        <div className="flex items-center gap-4 pt-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonFeaturedPost({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-2xl bg-[#1a3a5c]/40 border border-[#00F2FF]/20 overflow-hidden", className)}>
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image placeholder */}
        <Skeleton className="h-64 md:h-full w-full rounded-none" />
        {/* Content */}
        <div className="p-8 space-y-6">
          <Skeleton className="h-6 w-24 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-4/5" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonSidebar({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Search */}
      <div className="bg-[#1a3a5c]/40 border border-[#00F2FF]/20 rounded-xl p-6">
        <Skeleton className="h-5 w-20 mb-4" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      {/* Categories */}
      <div className="bg-[#1a3a5c]/40 border border-[#00F2FF]/20 rounded-xl p-6">
        <Skeleton className="h-5 w-24 mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
