import { Link } from '@inertiajs/react'
import { Input } from '~/lib/ui/input.component'
import { Button } from '~/lib/ui/button.component'
import { Label } from '~/lib/ui/label.component'
import { Alert, AlertDescription } from '~/lib/ui/alert.component'
import { Card, CardHeader, CardContent } from '~/lib/ui/card.component'
import { AuthLayout } from '~/lib/layouts/auth.layout'
import { GitHubAuthButton } from '~/lib/ui/github-auth-button.component'

export interface LoginPageViewProps {
  formData: {
    email: string
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
    <AuthLayout title="Sign In">
      {flash?.error && (
        <div className="mb-6">
          <Alert intent="destructive">
            <AlertDescription>{flash.error}</AlertDescription>
          </Alert>
        </div>
      )}

      {flash?.success && (
        <div className="mb-6">
          <Alert intent="default">
            <AlertDescription>{flash.success}</AlertDescription>
          </Alert>
        </div>
      )}

      <Card className="max-w-full w-96">
        <CardHeader className="text-left mb-8">
          <h2 className="text-lg font-medium text-neutral-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-neutral-900 hover:text-neutral-700">
              Create one
            </Link>
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email_input">Email Address</Label>
              <Input
                id="email_input"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                invalid={!!errors.email}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
              {errors.email && (
                <Alert intent="destructive">
                  <AlertDescription>{errors.email}</AlertDescription>
                </Alert>
              )}
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
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                invalid={!!errors.password}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              {errors.password && (
                <Alert intent="destructive">
                  <AlertDescription>{errors.password}</AlertDescription>
                </Alert>
              )}
            </div>

            <Button type="submit" className="w-full" loading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-neutral-500">Or continue with</span>
            </div>
          </div>
          <GitHubAuthButton>Sign in with GitHub</GitHubAuthButton>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
