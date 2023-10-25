'use client'

import { CalendarCheck, CheckCircle2, User } from 'lucide-react'
import { Student } from './Lista'
import Image from 'next/image'
import firstRanking from '@/assets/firstRanking.png'
import secondRanking from '@/assets/secondRanking.png'
import thirdRanking from '@/assets/thirdRanking.png'

type Item = {
  student: Student
  index: number
}

export default function ListItem(props: Item) {
  return (
    <section className="w-full h-full px-4 mb-2 flex items-center text-[14px] rounded-sm border-[1px] border-border cursor-pointer hover:bg-accent">
      <div className="w-[10%]">
        {props.index === 0 && (
          <Image
            width={40}
            height={40}
            alt="colocation"
            src={firstRanking}
            className="w-10"
          />
        )}
        {props.index === 1 && (
          <Image
            width={40}
            height={40}
            alt="colocation"
            src={secondRanking}
            className="w-10"
          />
        )}
        {props.index === 2 && (
          <Image
            width={40}
            height={40}
            alt="colocation"
            src={thirdRanking}
            className="w-10"
          />
        )}
      </div>
      <p className="text-sm font-bold text-darkBlue min-w-[16%]">
        {props.index + 1}º Lugar
      </p>

      <div className="flex items-center w-[40%]">
        {(props.student?.usuario_completo_read?.profile_read?.foto && (
          <Image
            width={40}
            height={40}
            alt=""
            className="mr-2 w-10 h-10 rounded-full"
            src={props.student?.usuario_completo_read?.profile_read?.foto}
          />
        )) || (
          <div className="mr-2 w-10 h-10 rounded-full flex items-center justify-center">
            <User />
          </div>
        )}

        <div>
          <p className="font-semibold text-darkBlue">
            {props.student?.usuario_completo_read?.profile_read?.nome_completo}
          </p>
          <p className="text-[10px]">
            {props.student?.usuario_completo_read?.email}
          </p>
        </div>
      </div>

      <div className="flex items-center text-[12px] justify-center w-[17%]">
        <span className="mr-2 bg-black rounded-full p-1.5">
          <CheckCircle2 color="#70EF6E" />
        </span>
        <div>
          <p className="font-semibold">Finalizados</p>
          <p className="text-sm font-bold">
            {props.student?.usuario_completo_read?.progressos_read
              ?.cursos_finalizados < 10
              ? '0' +
                props.student?.usuario_completo_read?.progressos_read
                  ?.cursos_finalizados
              : props.student?.usuario_completo_read?.progressos_read
                  ?.cursos_finalizados || '00'}
          </p>
        </div>
      </div>

      <div className="flex items-center text-[12px] justify-center w-[17%]">
        <span className="mr-2 bg-black rounded-full p-1.5">
          <CalendarCheck color="white" />
        </span>
        <div>
          <p className="font-semibold">Presença</p>
          <p className="text-sm font-bold">
            {props.student?.usuario_completo_read?.progressos_read
              ?.aulas_finalizadas_total < 10
              ? '0' +
                props.student?.usuario_completo_read?.progressos_read
                  ?.aulas_finalizadas_total
              : props.student?.usuario_completo_read?.progressos_read
                  ?.aulas_finalizadas_total || '00'}
          </p>
        </div>
      </div>
    </section>
  )
}
