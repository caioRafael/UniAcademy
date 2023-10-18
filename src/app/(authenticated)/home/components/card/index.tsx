import { Badge } from '@/components/ui/badge'
import * as C from '@/components/ui/card'

export interface ICardProps {
  title: string
  description: string
  url: string
  tag: string
  className?: string
  onClick?: () => void
}

export function Card({
  title,
  description,
  tag,
  url,
  className,
  onClick,
}: ICardProps) {
  return (
    <C.Card
      style={{ backgroundImage: `url(${url})` }}
      className={`bg-no-repeat bg-cover bg-center hover:cursor-pointer hover:brightness-75 transition-all border-none ${className}`}
      onClick={onClick}
    >
      <C.CardContent className="h-full flex flex-col justify-between gap-6 pt-4 bg-gradient-to-b from-transparent to-black rounded-lg">
        <div>
          <Badge className="bg-[#F2F2F2] text-[#0F172A] uppercase text-[.5rem]">
            {tag}
          </Badge>
        </div>
        <div>
          <C.CardTitle className="flex gap-1 text-white before:block before:h-auto before:w-[4px] before:bg-[#D20240] mb-2 text-sm md:text-2xl">
            {title}
          </C.CardTitle>
          <C.CardDescription className="text-[#C5C5C5] text-[.8rem] font-normal">
            {description}
          </C.CardDescription>
        </div>
      </C.CardContent>
    </C.Card>
  )
}
