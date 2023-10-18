import React from 'react'
import { Option } from '../../page'

interface ToggleSwitchProps {
  selectedOption: Option
  setSelectedOption: any
  options: Option[]
}

const ToggleSwitch = ({
  selectedOption,
  setSelectedOption,
  options,
}: ToggleSwitchProps) => {
  const styleSelectedOption = 'bg-white text-black-1'
  const styleUnselectedOption = 'text-white'

  return (
    <ul className="flex bg-black rounded-md p-1 flex-wrap">
      {options.map((option: Option) => (
        <li
          key={option.id}
          className={`rounded py-2 px-3 cursor-pointer ${
            selectedOption.id === option.id
              ? styleSelectedOption
              : styleUnselectedOption
          }`}
          onClick={() => setSelectedOption(option)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  )
}

export default ToggleSwitch
