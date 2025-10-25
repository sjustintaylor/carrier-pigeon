import { PageProps } from '@inertiajs/core'
import { useListFilesPage } from './list-files.hook'
import { ListFilesView } from './list-files.view'
import { AuthLayout } from '~/lib/layouts/auth.layout'

interface ListFilesPageProps extends PageProps {
  errors?: Record<string, string>
  flash?: {
    success?: string
    error?: string
  }
}

export default function ListFilesPage({ errors = {}, flash }: ListFilesPageProps) {
  const props = useListFilesPage({
    errors,
    values: { username: '', password: '' },
  })
  return (
    <AuthLayout flash={flash}>
      <ListFilesView {...{ ...props }} />
    </AuthLayout>
  )
}
