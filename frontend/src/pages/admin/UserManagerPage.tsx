import { AdminLayout } from '@/templates/AdminLayout'
import { useAdminUsers, useUpdateUserRole, useAdjustBalance } from '@/features/admin/hooks/useAdmin'
import { Avatar } from '@/atoms/Avatar'
import { Badge } from '@/atoms/Badge'
import { Button } from '@/atoms/Button'
import { TerminalSpinner } from '@/atoms/Spinner'

export default function UserManagerPage() {
  const { data: users, isLoading } = useAdminUsers()
  const updateRole   = useUpdateUserRole()
  const adjustBalance = useAdjustBalance()

  return (
    <AdminLayout>
      {isLoading ? <TerminalSpinner label="Loading users..." /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border border-terminal-border">
            <thead className="bg-tmux-statusbar">
              <tr>{['user','email','role','balance','status','actions'].map((h) => (
                <th key={h} className="text-left px-3 py-2 text-terminal-muted capitalize">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {(users ?? []).map((u) => (
                <tr key={u.id} className="border-t border-terminal-border hover:bg-terminal-secondary">
                  <td className="px-3 py-2 flex items-center gap-2">
                    <Avatar name={u.displayName} size="sm" />
                    {u.displayName}
                  </td>
                  <td className="px-3 py-2 text-terminal-muted">{u.email}</td>
                  <td className="px-3 py-2">
                    <Badge status="active">{u.role}</Badge>
                  </td>
                  <td className="px-3 py-2 text-terminal-green">${u.balance.toFixed(2)}</td>
                  <td className="px-3 py-2">
                    <Badge status={u.isActive ? 'active' : 'failed'}>{u.isActive ? 'active' : 'suspended'}</Badge>
                  </td>
                  <td className="px-3 py-2">
                    <Button size="sm" variant="ghost"
                      onClick={() => updateRole.mutate({ userId: u.id, role: 'client' })}>
                      edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
