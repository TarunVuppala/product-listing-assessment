import { RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded bg-white p-6 shadow-sm" role="alert">
      <p className="m-0 text-slate-800">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#ffd814] px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-[#f7ca00]"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Retry
      </button>
    </div>
  )
}
