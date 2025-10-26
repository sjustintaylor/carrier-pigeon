import { Head } from '@inertiajs/react'

export interface DownloadFilePageViewProps {
  url: string
  filename: string
}
export const DownloadFileView = ({ url, filename }: DownloadFilePageViewProps) => {
  return (
    <>
      <Head title="Download file" />

      <section className="text-sm">
        <p>
          Your file should begin downloading automatically. If it does not, click the link below.
        </p>
        <a href={url} download={filename} target="_blank" className="text-blue-800 hover:underline">
          Download file manually
        </a>
      </section>
    </>
  )
}
