import mongoose, { Document, Schema } from 'mongoose';

// Registration interface
export interface IRegistration extends Document {
  eventId: mongoose.Types.ObjectId;
  userId: string;
  userName: string;
  userEmail: string;
  registeredAt: Date;
  attended: boolean;
}

// Registration schema
const RegistrationSchema = new Schema<IRegistration>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  attended: {
    type: Boolean,
    default: false,
  },
});

// Create a compound index to prevent duplicate registrations
RegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });

// Export the model
export default mongoose.models.Registration || 
  mongoose.model<IRegistration>('Registration', RegistrationSchema); 