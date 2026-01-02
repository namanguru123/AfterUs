import mongoose from "mongoose";    

const trustedPersonSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: String,
    email: String,

    permissions: {
      read: Boolean,
      act: Boolean,
      notify: Boolean,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TrustedPerson", trustedPersonSchema);
