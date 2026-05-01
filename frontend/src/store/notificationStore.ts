import { create } from 'zustand'

export interface Notification {
  id:        string
  title:     string
  message:   string
  type:      'info' | 'success' | 'warning' | 'error'
  read:      boolean
  createdAt: string
}

interface NotificationStore {
  notifications: Notification[]
  unreadCount:   number
  setNotifications:(ns: Notification[]) => void
  markRead:        (id: string) => void
  markAllRead:     () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications:  [],
  unreadCount:    0,
  setNotifications:(notifications) =>
    set({ notifications, unreadCount: notifications.filter((n) => !n.read).length }),
  markRead: (id) =>
    set((s) => {
      const updated = s.notifications.map((n) => n.id === id ? { ...n, read: true } : n)
      return { notifications: updated, unreadCount: updated.filter((n) => !n.read).length }
    }),
  markAllRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })), unreadCount: 0 })),
}))
