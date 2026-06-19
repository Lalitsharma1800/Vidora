'use client'

import { Dialog } from '@base-ui/react/dialog'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '#/lib/utils.ts'

function Sheet({
  ...props
}: ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root data-slot="sheet" {...props} />
}

function SheetPortal({ ...props }: ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal data-slot="sheet-portal" {...props} />
}

function SheetBackdrop({
  className,
  ...props
}: ComponentProps<typeof Dialog.Backdrop>) {
  return (
    <Dialog.Backdrop
      data-slot="sheet-backdrop"
      className={cn(
        'fixed inset-0 z-40 bg-black/60 backdrop-blur-[1px] transition-opacity duration-300 data-closed:opacity-0 data-open:opacity-100',
        className,
      )}
      {...props}
    />
  )
}

type SheetSide = 'left' | 'right'

interface SheetContentProps extends ComponentProps<typeof Dialog.Popup> {
  side?: SheetSide
  children: ReactNode
}

function SheetContent({
  className,
  side = 'left',
  children,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetBackdrop />
      <Dialog.Popup
        data-slot="sheet-content"
        className={cn(
          'fixed z-50 flex flex-col bg-sidebar text-sidebar-foreground shadow-xl outline-none transition-transform duration-300 ease-in-out data-closed:pointer-events-none',
          side === 'left' &&
            'top-14 left-0 h-[calc(100vh-3.5rem)] w-[min(18rem,calc(100vw-1rem))] border-r border-sidebar-border data-closed:-translate-x-full data-open:translate-x-0',
          side === 'right' &&
            'top-14 right-0 h-[calc(100vh-3.5rem)] w-[min(18rem,calc(100vw-1rem))] border-l border-sidebar-border data-closed:translate-x-full data-open:translate-x-0',
          className,
        )}
        {...props}
      >
        {children}
      </Dialog.Popup>
    </SheetPortal>
  )
}

export { Sheet, SheetBackdrop, SheetContent, SheetPortal }
