const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  title: String,

  content: String,

  editedAt: {
    type: Date,
    default: Date.now
  }
});

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    content: {
      type: String,
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    history: [historySchema]
  },
  {
    timestamps: true
  }
);

noteSchema.index({
  title: "text",
  content: "text"
});

module.exports = mongoose.model("Note", noteSchema);