import mongoose from "mongoose";

const conditionSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String, // TIME_BASED, MULTI_PARTY, MANUAL
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    triggerRule: String,
  },
  { timestamps: true }
);

export default  mongoose.model("Condition", conditionSchema);
