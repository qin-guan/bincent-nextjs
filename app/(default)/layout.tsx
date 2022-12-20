'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import LoginButton from './LoginButton'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const header = pathname === '/' ? 'Explore with Bincent' : 'Bincent'

  return (
    <div className={`h-screen flex flex-col`}>
      <div className="navbar">
        <div className="container mx-auto">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">{header}</Link>
          </div>

          <div className="flex-none">
            <LoginButton />
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>
    </div>
  )
}
