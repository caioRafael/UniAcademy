export interface ITitleProps {
  title: string
}

export function Title({ title }: ITitleProps) {
  return (
    <h1 className="font-semibold text-2xl after:block w-fit after:h-[3px] after:w-3/5 after:bg-[#D20240] mb-2">
      {title}
    </h1>
  )
}
