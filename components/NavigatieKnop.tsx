'use client'

import { useRouter } from 'next/navigation'

type NavigatieKnopProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export default function NavigatieKnop({ href, children, className = '' }: NavigatieKnopProps) {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push(href)} className={className}>
      {children}
    </button>
  )
}
