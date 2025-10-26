import { useState, useCallback, FormEvent } from 'react'
import ky from 'ky'
import { UploadFilePageViewProps } from './upload-file.view'

export function useUploadFilePage(): UploadFilePageViewProps {
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState('')

  const updateFile = useCallback((target: File) => {
    setFile(target)
  }, [])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setError('')
      setDownloadUrl('')
      e.preventDefault()
      if (!file) {
        setError('Select a file')
        return
      }
      setIsSubmitting(true)

      const data = await file.bytes()

      try {
        const { url, id } = await ky
          .post('/files', {
            hooks: {
              beforeRequest: [
                (request) => {
                  // @ts-ignore
                  const token = (document.cookie ?? ' ')
                    .split('; ')
                    .find((row) => row.startsWith('XSRF-TOKEN='))
                    .split('=')[1]

                  request.headers.set('X-XSRF-TOKEN', decodeURIComponent(token))
                },
              ],
            },
            json: {
              contentType: file.type,
              filename: file.name,
            },
          })
          .json<{ url: string; id: string }>()

        await ky.put(url, {
          body: data,
          headers: {
            'Content-Type': file.type,
          },
          onDownloadProgress: (progress) => {
            setProgress(progress.percent)
          },
        })
        setDownloadUrl(`/downloads/${id}`)
      } catch (error) {
        setError(error.message)
      } finally {
        setFile(null)
        setIsSubmitting(false)
      }
    },
    [file]
  )

  return {
    file,
    error,
    progress,
    isSubmitting,
    downloadUrl,
    updateFile,
    handleSubmit,
  }
}
