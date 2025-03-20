import mongoose, { Document, Schema } from 'mongoose';

// Team Registration interface
export interface ITeamRegistration extends Document {
  eventId: mongoose.Types.ObjectId;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderRoll: string;
  member1Name: string;
  member1Roll: string;
  member2Name: string;
  member2Roll: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

// Team Registration schema
const TeamRegistrationSchema = new Schema<ITeamRegistration>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  teamName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  leaderName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  leaderEmail: {
    type: String,
    required: true,
  },
  leaderPhone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits'],
  },
  leaderRoll: {
    type: String,
    required: true,
  },
  member1Name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  member1Roll: {
    type: String,
    required: true,
  },
  member2Name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  member2Roll: {
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

// Create compound indexes
TeamRegistrationSchema.index({ eventId: 1, teamName: 1 }, { unique: true });
TeamRegistrationSchema.index({ eventId: 1, leaderRoll: 1 }, { unique: true });
TeamRegistrationSchema.index({ eventId: 1, member1Roll: 1 }, { unique: true });
TeamRegistrationSchema.index({ eventId: 1, member2Roll: 1 }, { unique: true });

// Add compound unique index for eventId and leaderEmail
TeamRegistrationSchema.index({ eventId: 1, leaderEmail: 1 }, { unique: true });

// Export the model
export default mongoose.models.TeamRegistration || 
  mongoose.model<ITeamRegistration>('TeamRegistration', TeamRegistrationSchema); 