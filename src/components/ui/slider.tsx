'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

type TVariant = 'default' | 'video' | 'volume'
interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  variant?: TVariant
  showThumb?: boolean
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant = 'default', showThumb, ...props }, ref) => {
  const variantConfig = {
    default: {
      track: 'h-1 bg-secondary',
      range: 'bg-primary  rounded-full',
    },
    video: {
      track: 'h-1 bg-white',
      range: 'bg-primary rounded-full',
    },
    volume: {
      track: 'h-1 bg-gray-400',
      range: 'bg-white rounded-full',
    },
  }
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={`relative w-full grow overflow-hidden  ${variantConfig[variant].track}`}
      >
        <SliderPrimitive.Range
          className={`absolute h-full ${variantConfig[variant].range}`}
        />
      </SliderPrimitive.Track>
      {showThumb && (
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      )}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
