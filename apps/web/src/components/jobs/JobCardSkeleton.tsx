export function JobCardSkeleton() {
  return (
    <div className="job-card animate-pulse p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="h-5 w-20 rounded-full bg-slate-200" />
        <div className="h-4 w-4 rounded bg-slate-200" />
      </div>
      <div className="mb-1 h-4 w-full rounded bg-slate-200" />
      <div className="mb-3 h-4 w-3/4 rounded bg-slate-200" />
      <div className="h-3 w-1/2 rounded bg-slate-200" />
      <div className="mt-3 flex justify-between">
        <div className="h-3 w-24 rounded bg-slate-200" />
        <div className="h-3 w-16 rounded bg-slate-200" />
      </div>
    </div>
  )
}
