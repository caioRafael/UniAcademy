'use client'

import { useState } from 'react'
import { Option } from '../../page'
import Annotations from '../annotations'
import ClassClipsList from '../classClipsList'
import CommentsList from '../commentsList'
import ToggleSwitch from '../toggleSwitch'
import { useClassContext } from '../../context/ClassesContext'

interface TabsContainerProps {
  token: string
  usernameId: number
  courseId: number
}

const TabsContainer = ({ token, usernameId }: TabsContainerProps) => {
  const { selectedClass } = useClassContext()
  const options: Option[] = [
    {
      id: 1,
      label: 'Comentários',
      component: <CommentsList token={token} usernameId={usernameId} />,
    },
    {
      id: 2,
      label: 'Anotações',
      component: <Annotations token={token} usernameId={usernameId} />,
    },
    {
      id: 3,
      label: 'Clipagens',
      component: <ClassClipsList token={token} usernameId={usernameId} />,
    },
  ]

  const [selectedOption, setSelectedOption] = useState<Option>(options[0])

  return (
    <>
      {selectedClass ? (
        <section className="mt-4">
          <div className="flex justify-between items-center mb-8 w-full gap-16 flex-wrap-reverse">
            <div className=" flex items-center">
              <span className="text-black text-xxs font-semibold border-l-xxs border-darkRed pl-1 mr-4">
                {selectedOption.label}
              </span>
              <span className="w-60 h-1 bg-darkRed max-w-64"></span>
            </div>
            <div className="flex gap-2 items-center">
              <ToggleSwitch
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
          </div>
          <div>{selectedOption.component}</div>
        </section>
      ) : (
        ''
      )}
    </>
  )
}

export default TabsContainer
