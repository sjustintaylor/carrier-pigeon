import { useState, useCallback } from 'react'
import { router } from '@inertiajs/react'
import { ListFilesPageViewProps } from './list-files.view'

interface ListFilesFormData extends Record<string, string> {
  username: string
  password: string
}

interface UseListFilesPageProps {
  errors: Record<string, string>
  values: Partial<ListFilesFormData>
}

export function useListFilesPage({
  errors,
  values,
}: UseListFilesPageProps): ListFilesPageViewProps {
  const [formData, setFormData] = useState<ListFilesFormData>({
    username: values.username_input || '',
    password: values.password || '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback((field: keyof ListFilesFormData, value: string) => {
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
