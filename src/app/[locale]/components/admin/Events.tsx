'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DatePickerDemo } from '@/components/ui/DataPicker'
import {
  Sheet,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const EventsComponent: React.FC = () => {
  const [preview, setPreview] = React.useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }
  const eventRef = React.useRef<HTMLButtonElement>(null)
  const events = [
    {
      id: 1,
      name: 'Event 1',
      description: 'Description 1',
      thumbnail: 'https://via.placeholder.com/150',
      date: '2021-08-01',
      time: '12:00',
      registration: new Date('2021-07-01').getTime()
    },
    {
      id: 2,
      name: 'Event 2',
      description: 'Description 2',
      thumbnail: 'https://via.placeholder.com/150',
      date: '2021-08-02',
      time: '12:00',
      registration: new Date('2025-07-02').getTime()
    },
    {
      id: 3,
      name: 'Event 3',
      description: 'Description 3',
      thumbnail: 'https://via.placeholder.com/150',
      date: '2021-08-03',
      time: '12:00',
      registration: new Date('2021-07-03').getTime()
    },
    {
      id: 4,
      name: 'Event 4',
      description: 'Description 4',
      thumbnail: 'https://via.placeholder.com/150',
      date: '2021-08-04',
      time: '12:00',
      registration: new Date('2025-07-04').getTime()
    }
  ]
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className={'text-2xl'}>Events</CardTitle>
          <CardDescription className={'text-xl'}>Manage events</CardDescription>
        </CardHeader>
        <CardContent
          className={'flex flex-col items-center justify-center space-y-10'}
        >
          <div
            className={
              'flex h-72 w-1/2 cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg border-4 border-dashed border-primary p-4'
            }
            onClick={() => eventRef.current?.click()}
          >
            <h3 className={'text-center text-lg font-semibold'}>
              Create Event
            </h3>
          </div>

          <Table>
            <TableCaption>Events</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2}>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map(event => (
                <TableRow key={event.id}>
                  <TableCell colSpan={2}>{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>
                    {event.registration > Date.now() ? 'Open' : 'Closed'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant={'ghost'} className='h-8 w-8 p-0'>
                          <MoreHorizontal className={'text-primary'} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align={'end'}
                        className={'bg-dropdown'}
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator
                          className={'mx-auto bg-selected'}
                        />
                        <DropdownMenuItem className={'cursor-pointer'}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className={'cursor-pointer'}>
                          Update
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total events: {events.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
      <Sheet>
        <SheetTrigger ref={eventRef} className={'sr-only'} asChild>
          <Button>Create Event</Button>
        </SheetTrigger>
        <SheetContent aria-label={'Create Event'}>
          <SheetHeader>
            <SheetTitle className={'text-2xl'}>Create Event</SheetTitle>
            <SheetDescription className={'text-sm'}>
              Fill in the form below to create an event
            </SheetDescription>
          </SheetHeader>
          <Separator className={'mx-auto my-10 bg-primary'} />
          <div className={'mt-10 flex flex-col space-y-4'}>
            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'name'}>Name</Label>
              <Input id={'name'} />
            </div>
            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'description'}>Description</Label>
              <Textarea id={'description'} />
            </div>
            <div className='flex flex-col space-y-4'>
              <Label
                htmlFor='thumbnail'
                className='flex cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border border-dashed border-selected p-4 text-text-secondary transition-all duration-200 hover:border-selected hover:bg-background-secondary'
              >
                {preview ? (
                  <img
                    src={preview}
                    alt='Preview'
                    className='h-20 w-20 rounded-lg object-cover'
                  />
                ) : (
                  <>
                    <span className='font-medium text-text-secondary'>
                      Upload Thumbnail
                    </span>
                    <span className='text-muted-foreground text-sm'>
                      (Click to select an image)
                    </span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-6 w-6 text-secondary'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 16.5V12m0 0V7.5m0 4.5h4.5M12 12H7.5M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z'
                      />
                    </svg>
                  </>
                )}
              </Label>
              <Input
                id='thumbnail'
                className='hidden'
                accept='image/*'
                type='file'
                onChange={handleFileChange}
              />
              <Button
                variant='ghost'
                onClick={() => setPreview(null)}
                disabled={!preview}
                className='mx-auto w-1/2'
              >
                Discard
              </Button>
            </div>
            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'date'}>Date</Label>
              <Input id={'date'} type={'date'} />
            </div>
            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'time'}>Time</Label>
              <Input id={'time'} type={'time'} />
            </div>

            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'registration'}>Registration</Label>
              <Input id={'registration'} type={'date'} />
            </div>
          </div>
          <SheetFooter className={'my-4'}>
            <SheetClose asChild className={'mr-4'}>
              Cancel
            </SheetClose>
            <div className={'flex flex-grow justify-between'}>
              <Button
                className={
                  'bg-primary text-white hover:bg-background-secondary hover:text-primary dark:text-black dark:hover:text-white'
                }
              >
                Discard
              </Button>
              <Button
                className={
                  'bg-primary text-white hover:bg-background-secondary hover:text-primary dark:text-black dark:hover:text-white'
                }
              >
                Create
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default EventsComponent
