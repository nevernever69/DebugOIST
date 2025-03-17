import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import useEvent, { EventProps } from '@/src/store/Event'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '@/src/Schema/Event'
import Image from 'next/image'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'

interface FormDataType {
  title: string
  description: string
  date: string
  time: string
  thumbnail: File
  registration: string
}

interface Props {
  event: EventProps | null
}

const UpdateEventComponent = (props: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema)
  })

  const { updateEvent, loading } = useEvent()
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (props.event) {
      setValue('title', props.event.title)
      setValue('description', props.event.description)
      setValue('date', String(props.event.date))
      setValue('time', String(props.event.time))
      setValue('registration', String(props.event.registration))
      setPreview(
        `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${props.event.publicId}.png`
      )
    }
  }, [props.event, setValue])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
      setValue('thumbnail', file)
    }
  }

  const onSubmit: SubmitHandler<FormDataType> = async data => {
    try {
      const newEvent = new FormData()
      newEvent.append('title', data.title)
      newEvent.append('description', data.description)
      newEvent.append('date', data.date)
      newEvent.append('time', data.time)
      newEvent.append('registration', data.registration)
      if (data.thumbnail) newEvent.append('thumbnail', data.thumbnail)

      if (props.event?.publicId) {
        await updateEvent(props.event.publicId, newEvent)
      }

      reset()
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mt-10 flex flex-col space-y-4'
    >
      {/* Title Field */}
      <div className='flex flex-col space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input id='title' {...register('title')} />
        {errors.title && (
          <span className='text-xs text-red-500'>{errors.title.message}</span>
        )}
      </div>

      {/* Description Field */}
      <div className='flex flex-col space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea rows={8} id='description' {...register('description')} />
        {errors.description && (
          <span className='text-xs text-red-500'>
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Thumbnail Upload */}
      <div className='flex flex-col space-y-4'>
        <Label
          htmlFor='thumbnail'
          className='flex cursor-pointer flex-col items-center space-y-2 border-dashed border-selected p-4'
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
              <span>Upload Thumbnail</span>
              <span className='text-sm'>(Click to select an image)</span>
            </>
          )}
        </Label>
        <Input
          id='thumbnail'
          type='file'
          className='hidden'
          onChange={handleFileChange}
        />
        {errors.thumbnail && (
          <span className='text-xs text-red-500'>
            {errors.thumbnail.message}
          </span>
        )}
      </div>

      {/* Date Field */}
      <div className='flex flex-col space-y-2'>
        <Label htmlFor='date'>Date</Label>
        <Input id='date' type='date' {...register('date')} />
        {errors.date && (
          <span className='text-xs text-red-500'>{errors.date.message}</span>
        )}
      </div>

      {/* Time Field */}
      <div className='flex flex-col space-y-2'>
        <Label htmlFor='time'>Time</Label>
        <Input id='time' type='time' {...register('time')} />
        {errors.time && (
          <span className='text-xs text-red-500'>{errors.time.message}</span>
        )}
      </div>

      {/* Registration Field */}
      <div className='flex flex-col space-y-2'>
        <Label htmlFor='registration'>Registration</Label>
        <Input id='registration' type='date' {...register('registration')} />
        {errors.registration && (
          <span className='text-xs text-red-500'>
            {errors.registration.message}
          </span>
        )}
      </div>

      {/* Buttons */}
      <DialogFooter>
        <div className='flex w-full justify-between'>
          <DialogClose>
            <Button type='reset' className='bg-primary text-white'>
              Discard
            </Button>
          </DialogClose>
          <Button type='submit' className='bg-primary text-white'>
            {loading ? 'Updating...' : 'Update Event'}
          </Button>
        </div>
      </DialogFooter>
    </form>
  )
}

export default UpdateEventComponent
