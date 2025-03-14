'use client'
import React, { FormEvent, useState } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/src/components/ui/label'
import { Input } from '@/src/components/ui/input'
import CustomTextArea from '@/src/components/ui/textarea'
import { FileUpload } from '@/src/components/ui/file-upload'

export default function EventForm() {
  const [files, setFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    eventDate: '',
    eventTime: '',
    registrationDate: ''
  })

  const handleFileUpload = (files: File[]) => {
    setFiles(files)
    console.log('Uploaded files:', files)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const transferData = { ...formData, file: files[0] }
    // Process form submission here.
    console.log('data going to server: ', transferData)
  }

  return (
    <div className='shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8'>
      <form className='my-4 space-y-4' onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor='name'>Event Name</Label>
          <Input
            id='name'
            name={'name'}
            placeholder='Name of the Event'
            type='text'
            value={formData.eventName}
            onChange={e =>
              setFormData({ ...formData, eventName: e.target.value })
            }
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor='description'>Event Description</Label>
          <CustomTextArea
            id='description'
            nameField={'description'}
            placeholder='Description for the event'
            value={formData.description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor='file-upload'>Event Thumbnail</Label>
          <div className='mx-auto min-h-10 w-full max-w-4xl rounded-lg border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black'>
            <FileUpload onChange={handleFileUpload} />
          </div>
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor='date'>Event Date</Label>
          <Input
            id='date'
            name={'eventDate'}
            placeholder='Event Date'
            type='date'
            value={formData.eventDate}
            onChange={e =>
              setFormData({ ...formData, eventDate: e.target.value })
            }
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor='time'>Event Time</Label>
          <Input
            id='time'
            name={'eventTime'}
            placeholder='Event Time'
            type='time'
            value={formData.eventTime}
            onChange={e =>
              setFormData({ ...formData, eventTime: e.target.value })
            }
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor='registration'>Registration Ends</Label>
          <Input
            id='registration'
            name={'registrationDate'}
            placeholder='Event registration Date'
            type='date'
            value={formData.registrationDate}
            onChange={e =>
              setFormData({ ...formData, registrationDate: e.target.value })
            }
          />
        </LabelInputContainer>
        <div className='flex justify-end pt-4'>
          <button className='inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors hover:bg-[linear-gradient(110deg,#000103,45%,#1e2631,95%,#000103)] hover:bg-[length:150%_100%] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
            Create Event
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
