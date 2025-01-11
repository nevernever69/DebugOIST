import mongoose from 'mongoose'

interface IEvent {
  title: string
  description: string
  Date: string
  registration: string
  publicId: string
}

const EventSchema = new mongoose.Schema<IEvent>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    Date: {
      type: String,
      required: true
    },
    registration: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Event: mongoose.Model<IEvent> =
  mongoose.models.Event || mongoose.model('Event', EventSchema)

export default Event
