import { PageProps } from '@inertiajs/core'
import { useUpdateUserPage } from './update-user.hook'
import { UpdateUserView } from './update-user.view'

interface UpdateUserPageProps extends PageProps {
  errors?: Record<string, string>
  flash?: {
    success?: string
    error?: string
  }
}

export default function UpdateUserPage({ errors = {}, flash }: UpdateUserPageProps) {
  const props = useUpdateUserPage({
    errors,
    values: { username: '', password: '' },
  })
  return <UpdateUserView {...{ ...props, flash }} />
}
