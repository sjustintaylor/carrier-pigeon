import { Head, Link } from '@inertiajs/react'
import { Alert } from '~/lib/components/alert.component'
import { Label } from '~/lib/components/label.component'

export interface UploadFilePageViewProps {
  updateFile: (target: File) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
  file: File | null
  error: string
  progress: number
  downloadUrl: string
}

export function UploadFileView({
  handleSubmit,
  isSubmitting,
  updateFile,
  file,
  error,
  progress,
  downloadUrl,
}: UploadFilePageViewProps) {
  return (
    <>
      <Head title="Upload file" />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-96 mx-auto">
        <h1 className="font-bold">Upload a new file</h1>
        <div className="space-y-2">
          <Label htmlFor="file_input">Select the file</Label>
          <input
            id="file_input"
            type="file"
            className="input"
            required
            onChange={(e) => {
              if (e.target.files) {
                updateFile(e.target.files[0])
              }
            }}
          />
          {error && <Alert intent="ERROR" message={error} />}
          {file && (
            <section>
              File details:
              <ul>
                <li>Name: {file.name}</li>
                <li>Type: {file.type}</li>
                <li>Size: {file.size} bytes</li>
              </ul>
            </section>
          )}
        </div>
        {file && <Alert message="The uploaded file will expire in 7 days" intent="SUCCESS" />}
        {downloadUrl && (
          <div>
            <Link href={downloadUrl} className="text-blue-800 hover:underline my-4">
              The download link for your file
            </Link>
          </div>
        )}
        {isSubmitting && <progress value={progress} />}
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </>
  )
}
