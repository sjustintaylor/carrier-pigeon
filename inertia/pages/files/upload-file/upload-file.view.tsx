import { Head, Link } from '@inertiajs/react'
import { Alert } from '~/lib/components/alert.component'
import { Label } from '~/lib/components/label.component'
import { Navbar } from '~/lib/components/navbar.component'

export interface UploadFilePageViewProps {
  updateFile: (target: File) => void
  handleSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  file: File | null
}

export function UploadFileView({
  handleSubmit,
  isSubmitting,
  updateFile,
  file,
}: UploadFilePageViewProps) {
  return (
    <>
      <Head title="Upload file" />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-96 mx-auto mt-24">
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

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </>
  )
}
