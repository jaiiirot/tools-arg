import { create } from "zustand"
import type { Notification } from "@/types/api"

interface NotificationState {
  notifications: Notification[]
  unreadCount:   number
  setNotifications: (n: Notification[]) => void
  markRead:         (id: string) => void
  markAllRead:      () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount:   0,
  setNotifications: (n) =>
    set({ notifications: n, unreadCount: n.filter((x) => !x.read).length }),
  markRead: (id) =>
    set((s) => {
      const notifications = s.notifications.map((n) => n.id === id ? { ...n, read: true } : n)
      return { notifications, unreadCount: notifications.filter((x) => !x.read).length }
    }),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}))
