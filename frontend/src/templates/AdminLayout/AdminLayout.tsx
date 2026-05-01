import type { ReactNode } from 'react'
import { TmuxLayout } from '@/templates/TmuxLayout'

export function AdminLayout({ children }: { children: ReactNode }) {
  return <TmuxLayout paneTitle="admin">{children}</TmuxLayout>
}
