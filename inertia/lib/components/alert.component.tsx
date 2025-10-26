const DestuctiveIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}
const SuccessIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
export const Alert = ({
  title,
  message,
  intent,
}: {
  title?: string
  message?: string
  intent: 'SUCCESS' | 'ERROR'
}) => {
  return (
    <div className={intent === 'SUCCESS' ? 'alert' : 'alert-destructive'}>
      {intent === 'SUCCESS' && <SuccessIcon />}
      {intent === 'ERROR' && <DestuctiveIcon />}
      {title && <h2>{title}</h2>}
      {message && <section>{message}</section>}
    </div>
  )
}
