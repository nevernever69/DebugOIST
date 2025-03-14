'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/src/components/ui/label'
import { Input } from '@/src/components/ui/input'
import CustomTextArea from '@/src/components/ui/textarea'
import { FileUpload } from '@/src/components/ui/file-upload'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormDataType, formSchema } from '@/src/Schema/Event'
import useEvent from '@/src/store/Event'
import { useRouter } from 'next/navigation'
import { useModal } from '@/src/components/ui/animated-modal'

export default function EventForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      thumbnail: undefined,
      date: '',
      time: '',
      registration: ''
    }
  })

  const { addEvent, loading } = useEvent()
  const { setOpen } = useModal()
  const handleFileUpload = (files: File[]) => {
    setValue('thumbnail', files[0])
    console.log('Uploaded files:', files)
  }

  const onSubmit: SubmitHandler<FormDataType> = async data => {
    try {
      const formData = new FormData()
      formData.append('eventName', data.name)
      formData.append('description', data.description)
      formData.append('thumbnail', data.thumbnail as File)
      formData.append('eventDate', data.date)
      formData.append('eventTime', data.time)
      formData.append('registrationDate', data.registration)
      await addEvent(formData)
      setOpen(false)
    } catch (e: any) {
      console.log(e, 'Event creation failed')
    } finally {
      reset()
    }
  }

  return (
    <div className='shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8'>
      <form className='my-4 space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer>
          <Label htmlFor='name'>Event Name</Label>
          <Input
            id='name'
            placeholder='Name of the Event'
            type='text'
            {...register('name')}
          />
          {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor='description'>Event Description</Label>
          <CustomTextArea
            id='description'
            nameField={'description'}
            placeholder='Description for the event'
            register={register}
          />
          {errors.description && (
            <span className='text-red-500'>{errors.description.message}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor='file-upload'>Event Thumbnail</Label>
          <div className='mx-auto min-h-10 w-full max-w-4xl rounded-lg border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black'>
            <FileUpload onChange={handleFileUpload} />
            {errors.thumbnail && (
              <span className='text-red-500'>{errors.thumbnail.message}</span>
            )}
          </div>
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor='date'>Event Date</Label>
          <Input
            id='date'
            placeholder='Event Date'
            type='date'
            {...register('date')}
          />
          {errors.date && (
            <span className='text-red-500'>{errors.date.message}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor='time'>Event Time</Label>
          <Input
            id='time'
            placeholder='Event Time'
            type='time'
            {...register('time')}
          />
          {errors.time && (
            <span className='text-red-500'>{errors.time.message}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor='registration'>Registration Ends</Label>
          <Input
            id='registration'
            placeholder='Event registration Date'
            type='date'
            {...register('registration')}
          />
          {errors.registration && (
            <span className='text-red-500'>{errors.registration.message}</span>
          )}
        </LabelInputContainer>
        <div className='flex justify-end pt-4'>
          <button
            type={'submit'}
            className='inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors hover:bg-[linear-gradient(110deg,#000103,45%,#1e2631,95%,#000103)] hover:bg-[length:150%_100%] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'
            disabled={loading}
          >
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  )
}

const LabelInputContainer = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  )
}
