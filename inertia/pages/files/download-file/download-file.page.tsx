import { PageProps } from '@inertiajs/core'
import { AuthLayout } from '~/lib/layouts/auth.layout'
import { useDownloadFilePage } from './download-file.hook'
import { DownloadFileView } from './download-file.view'

interface AddUserPageProps extends PageProps {
  flash?: {
    success?: string
    error?: string
  }
  url: string
  filename: string
}

export default function AddUserPage({ url, filename, flash }: AddUserPageProps) {
  useDownloadFilePage(url, filename)
  return (
    <AuthLayout flash={flash}>
      <DownloadFileView {...{ ...{ url, filename } }} />
    </AuthLayout>
  )
}
