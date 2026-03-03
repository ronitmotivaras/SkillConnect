const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
      default: "",
      maxlength: 200,
    },
  },
  { timestamps: true },
);

// Prevent duplicate connection requests
connectionSchema.index({ learner: 1, mentor: 1 }, { unique: true });

module.exports = mongoose.model("Connection", connectionSchema);
