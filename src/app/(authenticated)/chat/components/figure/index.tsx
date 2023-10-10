import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { getInitialLetters } from '@/utils/getInitialLetters'
import { getInitialWords } from '@/utils/getInitialWords'
import { twMerge } from 'tailwind-merge'

export interface IFigureProps {
  name: string
  on?: boolean
  count?: number
  avatar?: { src?: string; alt?: string }
}

export function Figure({ name, on, count, avatar }: IFigureProps) {
  return (
    <figure className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage
          src={avatar?.src}
          alt={avatar?.alt ?? 'Avatar do usuário'}
        />
        <AvatarFallback>{getInitialLetters(name)}</AvatarFallback>
      </Avatar>
      <figcaption>
        <h2
          data-count={count}
          className={twMerge(
            'flex item-center after:block after:px-2 after:font-semibold after:bg-[#00657766] after:rounded-[50%] after:ml-2 text-[.875rem]',
            count ? 'after:content-[attr(data-count)]' : 'after:hidden',
          )}
        >
          {getInitialWords(name)}
        </h2>
        <span
          className={cn(
            'flex items-center before:content-[""] before:block before:w-2 before:h-2 before:rounded-[50%] before:mr-2 text-[.875rem]',
            on ? 'before:bg-[#1FEA1B]' : 'before:bg-[#A9A9A9]',
          )}
        >
          {on ? 'Online' : 'Offline'}
        </span>
      </figcaption>
    </figure>
  )
}
