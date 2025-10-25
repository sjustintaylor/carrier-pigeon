import { Head } from '@inertiajs/react'
import { Alert } from '~/lib/components/alert.component'
import { Label } from '~/lib/components/label.component'

export interface UploadFilePageViewProps {
  updateFile: (target: File) => void
  handleSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  file: File | null
  error: string
  progress: number
}

export function UploadFileView({
  handleSubmit,
  isSubmitting,
  updateFile,
  file,
  error,
  progress,
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
        {isSubmitting && <progress value={progress} />}
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </>
  )
}
