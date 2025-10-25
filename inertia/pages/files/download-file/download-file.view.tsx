import { Head } from '@inertiajs/react'

export interface DownloadFilePageViewProps {
  url: string
  filename: string
}
export const DownloadFileView = ({ url, filename }: DownloadFilePageViewProps) => {
  return (
    <>
      <Head title="Download file" />
      <div className="card mx-auto mt-32 max-w-xl">
        <section className="text-sm">
          <p>
            Your file should begin downloading automatically. If it does not, click the link below.
          </p>
          <a href={url} download={filename} target="_blank">
            Download file manually
          </a>
        </section>
      </div>
    </>
  )
}
