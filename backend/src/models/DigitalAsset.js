import mongoose from "mongoose";

const DigitalAssetSchema = new mongoose.Schema(
  {
    // WHO CREATED IT
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // BASIC INFO
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // HIGH-LEVEL CLASSIFICATION (OPTIONAL, UX ONLY)
    category: {
      type: String,
      enum: ["Documents", "Financial", "Health", "Personal", "Other"],
      default: "Other",
    },

    // ACTUAL ASSET TYPE (LOGIC DRIVEN)
    assetType: {
      type: String,
      enum: ["TEXT", "PDF", "IMAGE", "LINK"],
      required: true,
    },

    // ENCRYPTED CONTENT (STRUCTURED)
    encryptedPayload: {
      text: { type: String },          // for TEXT
      fileKey: { type: String },        // S3 / cloud key
      fileName: { type: String },
      mimeType: { type: String },
      size: { type: Number },
      url: { type: String },            // encrypted link
    },

    file: {
      path: String,
      originalName: String,
      mimeType: String,
      size: Number,

      iv: String,
      authTag: String,
      algorithm: String,
    },


    // SECURITY FLAGS
    isEncrypted: {
      type: Boolean,
      default: true,
    },

    // SOFT DELETE
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DigitalAsset", DigitalAssetSchema);
