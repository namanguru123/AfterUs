
import mongoose from "mongoose";

const DigitalAssetSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Email",
        "Documents",
        "Financial",
        "Health",
        "Cloud",
        "Other",
      ],
    },

    assetType: {
      type: String,
      enum: ["Account", "File", "Note"],
      required: true
    },  


    encryptedData: {
      type: Object,
      required: true
    },


    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DigitalAsset", DigitalAssetSchema);
