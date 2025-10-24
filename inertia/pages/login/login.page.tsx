import { PageProps } from '@inertiajs/core'
import { useLoginPage } from './login.hook'
import { LoginView } from './login.view'

interface LoginPageProps extends PageProps {
  errors?: Record<string, string>
  flash?: {
    success?: string
    error?: string
  }
}

export default function LoginPage({ errors = {}, flash }: LoginPageProps) {
  const props = useLoginPage({
    errors,
    values: { email: '', password: '' },
  })
  return <LoginView {...{ ...props, flash }} />
}