import { useState, useCallback } from 'react'
import { router } from '@inertiajs/react'
import { UploadFilePageViewProps } from './upload-file.view'

interface UploadFileFormData extends Record<string, string> {
  username: string
  password: string
}

interface UseUploadFilePageProps {
  errors: Record<string, string>
  values: Partial<UploadFileFormData>
}

export function useUploadFilePage({
  errors,
  values,
}: UseUploadFilePageProps): UploadFilePageViewProps {
  const [formData, setFormData] = useState<UploadFileFormData>({
    username: values.username_input || '',
    password: values.password || '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback((field: keyof UploadFileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (isSubmitting) return

      setIsSubmitting(true)

      router.post('/users', formData, {
        preserveScroll: true,
        onFinish: () => setIsSubmitting(false),
      })
    },
    [formData, isSubmitting]
  )

  return {
    formData,
    updateField,
    handleSubmit,
    isSubmitting,
    errors,
  }
}
