import { TmuxLayout } from '@/templates/TmuxLayout'
import { TerminalText } from '@/atoms/TerminalText'

export default function MarketplacePage() {
  return (
    <TmuxLayout paneTitle="marketplace">
      <TerminalText text="Marketplace — coming soon" prefix=">" />
    </TmuxLayout>
  )
}
