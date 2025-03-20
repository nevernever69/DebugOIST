import mongoose, { Document, Schema } from 'mongoose';

export interface IIndividualRegistration extends Document {
  eventId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  roll: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const IndividualRegistrationSchema = new Schema<IIndividualRegistration>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits'],
  },
  roll: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure that each event has unique email and roll registrations.
IndividualRegistrationSchema.index({ eventId: 1, email: 1 }, { unique: true });
IndividualRegistrationSchema.index({ eventId: 1, roll: 1 }, { unique: true });

export default mongoose.models.IndividualRegistration ||
  mongoose.model<IIndividualRegistration>('IndividualRegistration', IndividualRegistrationSchema);
