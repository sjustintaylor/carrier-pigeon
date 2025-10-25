import { PropsWithChildren } from 'react'

import { Navbar } from '../components/navbar.component'
import { Alert } from '../components/alert.component'

interface AuthLayoutProps extends PropsWithChildren {
  flash?: {
    success?: string
    error?: string
  }
}

export function AuthLayout({ children, flash }: AuthLayoutProps) {
  return (
    <>
      <div className="bg-muted flex min-h-svh flex-col">
        {flash?.error && (
          <div className="mb-6">
            <Alert intent="ERROR" title="" message={flash.error} />
          </div>
        )}

        {flash?.success && (
          <div className="mb-6">
            <Alert intent="SUCCESS" title="" message={flash.success} />
          </div>
        )}
        <Navbar />
        {children}
      </div>
    </>
  )
}
