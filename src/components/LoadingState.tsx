import { LoaderCircle } from 'lucide-react'

export function LoadingState({ message = 'Loading products…' }: { message?: string }) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded bg-white px-6 py-10 text-center shadow-sm"
      role="status"
      aria-live="polite"
    >
      <LoaderCircle className="h-8 w-8 animate-spin text-[#2874f0]" aria-hidden="true" />
      <p className="m-0 text-slate-600">{message}</p>
    </div>
  )
}
