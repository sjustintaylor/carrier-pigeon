import { useState, useCallback } from 'react'
import { router } from '@inertiajs/react'
import { LoginPageViewProps } from './login.view'

interface LoginFormData extends Record<string, string> {
  email: string
  password: string
}

interface UseLoginPageProps {
  errors: Record<string, string>
  values: Partial<LoginFormData>
}

export function useLoginPage({ errors, values }: UseLoginPageProps): LoginPageViewProps {
  const [formData, setFormData] = useState<LoginFormData>({
    email: values.email_input || '',
    password: values.password || '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback((field: keyof LoginFormData, value: string) => {
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

      router.post('/login', formData, {
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
