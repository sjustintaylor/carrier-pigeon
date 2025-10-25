import { useState, useCallback } from 'react'
import ky from 'ky'
import { UploadFilePageViewProps } from './upload-file.view'

export function useUploadFilePage(): UploadFilePageViewProps {
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>('')
  const [progress, setProgress] = useState(0)

  const updateFile = useCallback((target: File) => {
    setFile(target)
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!file) {
      setError('Select a file')
      return
    }
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      
      ky.post('', {
        body: formData,
        onDownloadProgress: (progress) => {
          setProgress(progress.percent)
        },
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return {
    file,
    error,
    isSubmitting,
    updateFile,
    handleSubmit,
  }
}
