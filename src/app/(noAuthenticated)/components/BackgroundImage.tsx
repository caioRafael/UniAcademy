'use client'

import Image from 'next/image'
import chamaleonRight from '@/assets/chameleon-right.svg'
import chamaleonLeft from '@/assets/chameleon-left.svg'

import { usePathname } from 'next/navigation'

export function BackgroundImage() {
  const pathname = usePathname()
  return (
    <Image
      width={720}
      height={1024}
      src={pathname !== '/' ? chamaleonLeft : chamaleonRight}
      alt="Chameleon"
      className="w-full h-screen object-cover"
    />
  )
}
