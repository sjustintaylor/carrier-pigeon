import { Head, Link } from '@inertiajs/react'
import { Alert } from '~/lib/components/alert.component'
import { Label } from '~/lib/components/label.component'

export interface LoginPageViewProps {
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

export function LoginView({
  formData,
  updateField,
  handleSubmit,
  isSubmitting,
  errors,
  flash,
}: LoginPageViewProps) {
  return (
    <>
      <Head title="Log in" />

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

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/password/reset"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            aria-invalid={!!errors.password}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
          {errors.password && <Alert intent="ERROR" message={errors.password} />}
        </div>

        <Button type="submit" className="w-full" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </>
  )
}
