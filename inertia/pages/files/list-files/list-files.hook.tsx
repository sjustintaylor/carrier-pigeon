import { useCallback, useState } from 'react'
import { ListFilesPageViewProps } from './list-files.view'
import { router } from '@inertiajs/core'

export function useListFilesPage(): Pick<ListFilesPageViewProps, 'handleDelete' | 'isDeleting'> {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = useCallback(
    (id: number) => {
      if (isDeleting) {
        return
      }
      setIsDeleting(true)
      router.delete(`/files/${id}`, { preserveScroll: true, onFinish: () => setIsDeleting(false) })
    },
    [isDeleting]
  )

  return { handleDelete, isDeleting }
}
