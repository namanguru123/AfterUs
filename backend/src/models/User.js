import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    select: false 
  },

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  lastActiveAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true })

export default mongoose.model('User', userSchema)
