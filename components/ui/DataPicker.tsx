'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calander'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-[240px] justify-start rounded-lg border border-gray-300 text-left font-normal shadow-sm transition-all duration-200 hover:shadow-md',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-5 w-5 text-primary' />
          {date ? (
            <span className='font-medium text-primary'>
              {format(date, 'PPP')}
            </span>
          ) : (
            <span className='text-muted-foreground'>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='z-40 w-auto rounded-lg border border-gray-200 bg-white p-2 shadow-lg'
        align='start'
      >
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
          className='rounded-lg'
        />
      </PopoverContent>
    </Popover>
  )
}
