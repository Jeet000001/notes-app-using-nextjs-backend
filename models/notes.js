import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,   
      maxLength: 100,
    },
    content: {
      type: String,
      required: true, 
      maxLength: 2000,
    },
  },
  {
    timestamps: true, // it automaticaly hadels createdAt & updatedAt
  }
);

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
// If the Note model already exists the use it || create a moderl named Note