'use client'

import { useEffect, useState } from 'react'
import ListItem from './Components/listItem'
import { Title } from '@/components/Title'

export type Student = {
  id: number
  image: string
  name: string
  curso: string
  finalized: number
  presence: number
}

export default function Ranking() {
  const [list, setList] = useState<Array<Student>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setList([
        {
          id: 1,
          image: 'foto.png',
          name: 'Fulaninho da Silva',
          curso: 'BTI - Campus Pau dos Ferros',
          finalized: 6,
          presence: 365,
        },
        {
          id: 2,
          image: 'foto.png',
          name: 'Fulaninho da Silva',
          curso: 'BTI - Campus Pau dos Ferros',
          finalized: 6,
          presence: 365,
        },
        {
          id: 3,
          image: 'foto.png',
          name: 'Fulaninho da Silva',
          curso: 'BTI - Campus Pau dos Ferros',
          finalized: 6,
          presence: 365,
        },
        {
          id: 4,
          image: 'foto.png',
          name: 'Fulaninho da Silva',
          curso: 'BTI - Campus Pau dos Ferros',
          finalized: 6,
          presence: 365,
        },
        {
          id: 5,
          image: 'foto.png',
          name: 'Fulaninho da Silva',
          curso: 'BTI - Campus Pau dos Ferros',
          finalized: 6,
          presence: 365,
        },
        {
          id: 6,
          image: 'foto.png',
          name: 'Fulaninho da Silva',
          curso: 'BTI - Campus Pau dos Ferros',
          finalized: 6,
          presence: 365,
        },
        {
          id: 7,
          image: 'foto.png',
          name: 'Fulaninho da Silva',
          curso: 'BTI - Campus Pau dos Ferros',
          finalized: 6,
          presence: 365,
        },
        {
          id: 8,
          image: 'foto.png',
          name: 'Fulaninho da Silva',
          curso: 'BTI - Campus Pau dos Ferros',
          finalized: 6,
          presence: 365,
        },
        {
          id: 9,
          image: 'foto.png',
          name: 'Fulaninho da Silva',
          curso: 'BTI - Campus Pau dos Ferros',
          finalized: 6,
          presence: 365,
        },
        {
          id: 10,
          image: 'foto.png',
          name: 'Fulaninho da Silva',
          curso: 'BTI - Campus Pau dos Ferros',
          finalized: 6,
          presence: 365,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="w-full max-h-[80vh] flex-col p-2">
      <section className="w-full p-2 h-10 mb-4 flex items-center justify-between">
        <Title title="Ranking" />
        <div className="border-l-[2px] border-darkRed h-5 flex items-center text-center">
          <p className="pl-1 leading-4 text-xs font-semibold">
            Minha Posição: #40
          </p>
        </div>
      </section>
      <section className="h-full overflow-auto">
        {!loading && (
          <ul>
            {list.map((student: Student, index: number) => {
              return (
                <li key={index}>
                  <ListItem student={student} index={index} />
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
