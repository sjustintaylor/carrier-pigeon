import { useState, useCallback } from 'react'
import { router } from '@inertiajs/react'
import { UpdateUserPageViewProps } from './update-user.view'

interface UpdateUserFormData extends Record<string, string> {
  id: string
  username: string
  password: string
}

interface UseUpdateUserPageProps {
  errors: Record<string, string>
  values: UpdateUserFormData
}

export function useUpdateUserPage({
  errors,
  values,
}: UseUpdateUserPageProps): UpdateUserPageViewProps {
  const [formData, setFormData] = useState<UpdateUserFormData>({
    id: values.id || '',
    username: values.username || '',
    password: values.password || '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback((field: keyof UpdateUserFormData, value: string) => {
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

      router.put(`/users/${Number(values.id)}`, formData, {
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
