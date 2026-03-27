import dbconnect from "@/lib/db";
import React from "react";
import NoteForm from "./components/NoteForm";
import Notes from "@/models/notes";
import NotesDisplay from "./components/NotesDisplay";

const getNotes = async () => {
  await dbconnect();
  const notes = await Notes.find({}).sort({ createdAt: -1 }).lean();

  return notes.map((note) => ({
    ...note,
    id: note._id.toString(),
  }));
};

const page = async () => {
  await dbconnect();
  const notes = await getNotes();
  console.log(notes);

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-4xl font-extrabold font-serif py-5">
        Noes App
      </h1>
      <div>
        <NoteForm savedNotes={notes} />

      </div>
    </div>
  );
};

export default page;