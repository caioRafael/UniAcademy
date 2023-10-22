import { cn } from '@/lib/utils'

export interface IAMessageProps {
  body?: any
  children?: React.ReactNode
  time: string
  sender?: boolean
}

export function Message({
  body,
  time,
  sender = true,
  children,
}: IAMessageProps) {
  return (
    <section className={cn('px-4', sender && 'flex flex-col items-end')}>
      <blockquote
        className={cn(
          'rounded-md p-4 font-semibold w-fit text-[.8rem]',
          sender ? 'bg-[#0000001A]' : 'bg-[#0A3947] text-white',
          children && 'flex gap-2 flex-wrap',
        )}
      >
        {body}
        {children}
      </blockquote>
      <span>
        <time className="text-[0.63rem]">{time}</time>
      </span>
    </section>
  )
}
