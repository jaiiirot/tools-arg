import { useEffect } from "react"
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — ${import.meta.env.VITE_APP_NAME ?? "GSM Tools"}`
  }, [title])
}
