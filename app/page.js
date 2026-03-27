import dbconnect from "@/lib/db";
import React from "react";
import NoteForm from "./components/Notes";
import Notes from "@/models/notes";

export const dynamic = "force-dynamic";

const getNotes = async () => {
  await dbconnect();
  const notes = await Notes.find({}).sort({ createdAt: -1 }).lean();

  return notes.map((note) => ({
    ...note,
    _id: undefined,
    id: note._id.toString(),
  }));
};

const page = async () => {
  const notes = await getNotes();

  return (
    <div className="min-h-screen">
      <NoteForm savedNotes={notes} />
    </div>
  );
};

export default page;