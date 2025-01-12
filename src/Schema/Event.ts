import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  thumbnail: z.instanceof(File, { message: 'Thumbnail is required' }),
  date: z.string().nonempty({ message: 'Date is required' }),
  time: z.string().nonempty({ message: 'Time is required' }),
  registration: z.string().nonempty({ message: 'Registration is required' })
})

export type FormDataType = z.infer<typeof formSchema>
