import { PackageOpen } from 'lucide-react'

export function EmptyState({ message = 'No products found' }: { message?: string }) {
  return (
    <div
      className="flex flex-col items-center gap-2 rounded bg-white px-6 py-10 text-center text-slate-600 shadow-sm"
      role="status"
    >
      <PackageOpen className="h-10 w-10 text-slate-400" aria-hidden="true" />
      <p className="m-0">{message}</p>
    </div>
  )
}
