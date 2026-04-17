'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideFooter = pathname === '/contact'

  return (
    <LenisProvider>
      <CustomCursor />
      <Navigation />
      <main className="flex-grow">{children}</main>
      {!hideFooter ? <Footer /> : null}
    </LenisProvider>
  )
}
