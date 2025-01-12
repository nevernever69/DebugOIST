'use client'
import React, { useEffect } from 'react'
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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import { useForm, SubmitHandler } from 'react-hook-form'
import { formSchema, FormDataType } from '@/src/Schema/Event'
import { zodResolver } from '@hookform/resolvers/zod'
import useEvent from '@/src/store/Event'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const EventsComponent: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema)
  })
  const [preview, setPreview] = React.useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
      setValue('thumbnail', file)
    }
  }

  const { addEvent, loading, events, getEvents } = useEvent()

  const onSubmit: SubmitHandler<FormDataType> = async data => {
    try {
      const newForm = new FormData()
      newForm.append('title', data.name)
      newForm.append('description', data.description)
      newForm.append('thumbnail', data.thumbnail as File)
      newForm.append('date', data.date)
      newForm.append('time', data.time)
      newForm.append('registration', data.registration)

      await addEvent(newForm)
      router.replace(pathname)
    } catch (e: any) {
      console.error('error adding event', e)
    } finally {
      setPreview(null)
      reset()
    }
  }

  useEffect(() => {
    getEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const eventRef = React.useRef<HTMLButtonElement>(null)
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
                <TableRow key={event.publicId}>
                  <TableCell colSpan={2}>{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>
                    {event.registration > Date.now() ? 'Open' : 'Closed'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className={'text-primary'} />
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={'mt-10 flex flex-col space-y-4'}
          >
            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'name'}>Name</Label>
              <Input id={'name'} {...register('name')} />
              {errors.name && (
                <span className={'text-xs font-medium text-red-500'}>
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'description'}>Description</Label>
              <Textarea id={'description'} {...register('description')} />
              {errors.description && (
                <span className={'text-xs font-medium text-red-500'}>
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className='flex flex-col space-y-4'>
              <Label
                htmlFor='thumbnail'
                className='flex cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border border-dashed border-selected p-4 text-text-secondary transition-all duration-200 hover:border-selected hover:bg-background-secondary'
              >
                {preview ? (
                  <Image
                    src={preview}
                    width={100}
                    height={100}
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
                // accept='image/*'
                type='file'
                onChange={handleFileChange}
              />
              <Button
                variant='ghost'
                disabled={!preview}
                className='mx-auto w-1/2'
              >
                Discard
              </Button>
              {errors.thumbnail && (
                <span className='text-xs font-medium text-red-500'>
                  {errors.thumbnail.message}
                </span>
              )}
            </div>
            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'date'}>Date</Label>
              <Input id={'date'} type={'date'} {...register('date')} />
              {errors.date && (
                <span className={'text-xs font-medium text-red-500'}>
                  {errors.date.message}
                </span>
              )}
            </div>
            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'time'}>Time</Label>
              <Input id={'time'} type={'time'} {...register('time')} />
              {errors.time && (
                <span className={'text-xs font-medium text-red-500'}>
                  {errors.time.message}
                </span>
              )}
            </div>

            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'registration'}>Registration</Label>
              <Input
                id={'registration'}
                type={'date'}
                {...register('registration')}
              />
              {errors.registration && (
                <span className={'text-xs font-medium text-red-500'}>
                  {errors.registration.message}
                </span>
              )}
            </div>
            <div className={'flex flex-grow justify-between'}>
              <Button
                type={'reset'}
                className={
                  'bg-primary text-white hover:bg-background-secondary hover:text-primary dark:text-black dark:hover:text-white'
                }
              >
                Discard
              </Button>
              <Button
                type={'submit'}
                className={
                  'bg-primary text-white hover:bg-background-secondary hover:text-primary dark:text-black dark:hover:text-white'
                }
              >
                {loading ? 'Creating...' : 'Create Event'}
              </Button>
            </div>
          </form>
          <SheetFooter className={'my-4'}>
            <SheetClose asChild className={'mr-4'}>
              Cancel
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default EventsComponent
