import React from 'react'
import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

export const _Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name], {
    loading: () => <div className="w-4 h-4" />,
  })

  return <LucideIcon {...props} />
}

const Icon = React.memo(_Icon)

export { Icon }
