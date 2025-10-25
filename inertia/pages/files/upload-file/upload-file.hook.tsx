import { useState, useCallback } from 'react'

import { UploadFilePageViewProps } from './upload-file.view'

export function useUploadFilePage(): UploadFilePageViewProps {
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFile = useCallback((target: File) => {
    setFile(target)
  }, [])

  const handleSubmit = useCallback(async () => {
    // TODO
  }, [])

  return {
    file,
    isSubmitting,
    updateFile,
    handleSubmit,
  }
}
