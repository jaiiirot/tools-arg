import * as RadixTooltip from '@radix-ui/react-tooltip'

interface TooltipProps { content: string; children: React.ReactNode }

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={300}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="bg-terminal-secondary border border-terminal-border text-terminal-text text-xs font-mono px-2 py-1 z-50"
            sideOffset={4}
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
