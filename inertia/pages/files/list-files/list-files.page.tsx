import { PageProps } from '@inertiajs/core'
import { useListFilesPage } from './list-files.hook'
import { ListFilesView } from './list-files.view'
import { AuthLayout } from '~/lib/layouts/auth.layout'
import { FileRecord } from './list-files.types'

interface ListFilesPageProps extends PageProps {
  flash?: {
    success?: string
    error?: string
  }
  values: FileRecord[]
}

export default function ListFilesPage({ flash, values }: ListFilesPageProps) {
  const props = useListFilesPage()
  return (
    <AuthLayout flash={flash}>
      <ListFilesView {...{ ...props, values }} />
    </AuthLayout>
  )
}
