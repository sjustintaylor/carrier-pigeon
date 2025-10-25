import { PageProps } from '@inertiajs/core'
import { useAddUserPage } from './add-user.hook'
import { AddUserView } from './add-user.view'
import { AuthLayout } from '~/lib/layouts/auth.layout'

interface AddUserPageProps extends PageProps {
  errors?: Record<string, string>
  flash?: {
    success?: string
    error?: string
  }
}

export default function AddUserPage({ errors = {}, flash }: AddUserPageProps) {
  const props = useAddUserPage({
    errors,
    values: { username: '', password: '' },
  })
  return (
    <AuthLayout flash={flash}>
      <AddUserView {...{ ...props }} />
    </AuthLayout>
  )
}
