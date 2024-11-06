import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model("Notes", noteSchema);
