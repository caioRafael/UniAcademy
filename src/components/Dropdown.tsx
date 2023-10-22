'use client'

import { ComboboxItem } from './Combobox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface DropdownProps {
  options: ComboboxItem[]
  value: string
  setValue: (value: string) => void
  placeholder: string
}

export function Dropdown(props: DropdownProps) {
  const { options, value, placeholder, setValue } = props
  return (
    <Select onValueChange={(value) => setValue(value)} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={placeholder}
          className="font-medium text-xs"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="font-medium text-xs">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              className="font-medium text-xs"
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
