import mongoose from 'mongoose'

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
  }
}
