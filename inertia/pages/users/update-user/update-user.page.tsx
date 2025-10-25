import { PageProps } from '@inertiajs/core'
import { useUpdateUserPage } from './update-user.hook'
import { UpdateUserView } from './update-user.view'
import { AuthLayout } from '~/lib/layouts/auth.layout'

interface UpdateUserPageProps extends PageProps {
  errors?: Record<string, string>
  flash?: {
    success?: string
    error?: string
  }
  values: {
    id: string
    username: string
  }
}

export default function UpdateUserPage({ errors = {}, flash, values }: UpdateUserPageProps) {
  const props = useUpdateUserPage({
    errors,
    values: { ...values, password: '' },
  })
  return (
    <AuthLayout flash={flash}>
      <UpdateUserView {...{ ...props, flash }} />
    </AuthLayout>
  )
}
