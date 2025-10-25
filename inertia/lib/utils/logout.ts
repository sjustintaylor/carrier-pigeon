import { router } from '@inertiajs/core'

export const handleLogout = () => {
  router.post('/logout')
}
