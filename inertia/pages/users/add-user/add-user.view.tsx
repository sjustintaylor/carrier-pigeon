import { Head, Link } from '@inertiajs/react'
import { Alert } from '~/lib/components/alert.component'
import { Label } from '~/lib/components/label.component'

export interface AddUserPageViewProps {
  formData: {
    username: string
    password: string
  }
  updateField: (field: string, value: string) => void
  handleSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  errors: Record<string, string>
  flash?: {
    success?: string
    error?: string
  }
}

export function AddUserView({
  formData,
  updateField,
  handleSubmit,
  isSubmitting,
  errors,
  flash,
}: AddUserPageViewProps) {
  return (
    <>
      <Head title="Sign in" />

      {flash?.error && (
        <div className="mb-6">
          <Alert intent="ERROR" title="" message={flash.error} />
        </div>
      )}

      {flash?.success && (
        <div className="mb-6">
          <Alert intent="SUCCESS" title="" message={flash.success} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-96 mx-auto mt-24">
        <div className="space-y-2">
          <Label htmlFor="username_input">Username</Label>
          <input
            id="username_input"
            type="text"
            className="input"
            value={formData.username}
            onChange={(e) => updateField('username', e.target.value)}
            placeholder="Enter your email"
            required
            autoComplete="username"
            aria-invalid={!!errors.username}
          />
          {errors.username && <Alert intent="ERROR" message={errors.username} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <input
            id="password"
            type="password"
            className="input"
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            aria-invalid={!!errors.password}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
          {errors.password && <Alert intent="ERROR" message={errors.password} />}
        </div>

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </>
  )
}
