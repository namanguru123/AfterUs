import mongoose from 'mongoose'

const digitalAssetSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  title: {
    type: String,
    required: true
  },

  encryptedData: {
    iv: String,
    content: String,
    authTag: String
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

export default mongoose.model('DigitalAsset', digitalAssetSchema)