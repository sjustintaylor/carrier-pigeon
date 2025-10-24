import { PropsWithChildren } from 'react'

import { Navbar } from '../components/navbar.component'

interface AuthLayoutProps extends PropsWithChildren {}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="bg-muted flex min-h-svh flex-col">
        <Navbar />
        {children}
      </div>
    </>
  )
}
