import { PageProps } from '@inertiajs/core'
import { useUploadFilePage } from './upload-file.hook'
import { UploadFileView } from './upload-file.view'
import { AuthLayout } from '~/lib/layouts/auth.layout'

interface UploadFilePageProps extends PageProps {
  errors?: Record<string, string>
  flash?: {
    success?: string
    error?: string
  }
}

export default function UploadFilePage({ errors = {}, flash }: UploadFilePageProps) {
  const props = useUploadFilePage({
    errors,
    values: { username: '', password: '' },
  })
  return (
    <AuthLayout flash={flash}>
      <UploadFileView {...{ ...props }} />
    </AuthLayout>
  )
}
