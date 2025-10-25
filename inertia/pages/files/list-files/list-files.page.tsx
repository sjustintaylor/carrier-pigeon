import { PageProps } from '@inertiajs/core'
import { useListFilesPage } from './list-files.hook'
import { ListFilesView } from './list-files.view'
import { AuthLayout } from '~/lib/layouts/auth.layout'
import { FileRecord } from './list-files.types'

interface ListFilesPageProps extends PageProps {
  errors?: Record<string, string>
  flash?: {
    success?: string
    error?: string
  }
  values: FileRecord[]
}

export default function ListFilesPage({ errors = {}, flash }: ListFilesPageProps) {
  const props = useListFilesPage({
    errors,
  })
  return (
    <AuthLayout flash={flash}>
      <ListFilesView {...{ ...props }} />
    </AuthLayout>
  )
}
