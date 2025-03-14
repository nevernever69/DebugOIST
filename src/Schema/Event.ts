import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().trim().nonempty({ message: 'Name is required' }),
  description: z
    .string()
    .trim()
    .nonempty({ message: 'Description is required' }),
  thumbnail: z
    .instanceof(File, { message: 'Thumbnail must be a file' })
    .nullable()
    .refine(file => file != null, { message: 'Thumbnail is required' }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date format'
  }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Invalid time format'
  }),
  registration: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date format'
  })
})

export type FormDataType = z.infer<typeof formSchema>
