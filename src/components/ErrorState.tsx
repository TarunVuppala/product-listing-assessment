interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6" role="alert">
      <p className="mb-3">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded border border-slate-300 bg-white px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Retry
      </button>
    </div>
  )
}
