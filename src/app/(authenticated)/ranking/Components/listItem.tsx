'use client'

import { CalendarCheck, CheckCircle2 } from 'lucide-react'
import { Student } from '../page'

type Item = {
  student: Student
  index: number
}

export default function ListItem(props: Item) {
  return (
    <section className="w-full h-full px-4 mb-2 flex items-center text-[14px] rounded-sm border-[1px] border-border cursor-pointer hover:bg-accent">
      <div className="w-[10%]">
        {props.index === 0 && (
          <img
            alt="colocation"
            src="https://i.imgur.com/0GdmlIu.png"
            className="w-10"
          />
        )}
        {props.index === 1 && (
          <img
            alt="colocation"
            src="https://i.imgur.com/Xcu7Ifo.png"
            className="w-10"
          />
        )}
        {props.index === 2 && (
          <img
            alt="colocation"
            src="https://i.imgur.com/JAYHwcC.png"
            className="w-10"
          />
        )}
      </div>
      <p className="text-sm font-bold text-darkBlue min-w-[16%]">
        {props.index + 1}º Lugar
      </p>

      <div className="flex items-center w-[40%]">
        <img
          className="mr-2 w-10 h-10 rounded-full"
          src="https://github.com/shadcn.png"
        />
        <div>
          <p className="font-semibold text-darkBlue">{props.student.name}</p>
          <p className="text-[10px]">{props.student.curso}</p>
        </div>
      </div>

      <div className="flex items-center text-[12px] justify-center w-[17%]">
        <span className="mr-2 bg-black rounded-full p-1.5">
          <CheckCircle2 color="#70EF6E" />
        </span>
        <div>
          <p className="font-semibold">Finalizados</p>
          <p className="text-sm font-bold">
            {props.student.finalized < 10
              ? '0' + props.student.finalized
              : props.student.finalized}
          </p>
        </div>
      </div>

      <div className="flex items-center text-[12px] justify-center w-[17%]">
        <span className="mr-2 bg-black rounded-full p-1.5">
          <CalendarCheck color="white" />
        </span>
        <div>
          <p className="font-semibold">Presença</p>
          <p className="text-sm font-bold">{props.student.presence}</p>
        </div>
      </div>
    </section>
  )
}
