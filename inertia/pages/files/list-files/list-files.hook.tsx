import { ListFilesPageViewProps } from './list-files.view'

interface UseListFilesPageProps {
  errors: Record<string, string>
}

export function useListFilesPage({ errors }: UseListFilesPageProps): ListFilesPageViewProps {
  return { errors }
}
