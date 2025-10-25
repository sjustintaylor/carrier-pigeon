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
      <div className="bg-muted flex min-h-svh w-full flex-col bg-[url(/img/full-bloom.png)] bg-repeat">
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

        <div className="card mx-auto mt-20 max-w-3xl px-6">
          <Navbar />

          {children}
        </div>
      </div>
    </>
  )
}
