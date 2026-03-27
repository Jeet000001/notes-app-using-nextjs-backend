"use client"
import dbconnect from "@/lib/db";
import React from "react";
import NoteForm from "./components/Notes";
import Notes from "@/models/notes";

export const dynamic = "force-dynamic"; // ensures SSR refresh on every request

const getNotes = async () => {
  await dbconnect();
  const notes = await Notes.find({}).sort({ createdAt: -1 }).lean();

  return notes.map(({ _id, title, content, createdAt }) => ({
    id: _id.toString(),
    title: title || "",
    content: content || "",
    createdAt: createdAt?.toISOString() || new Date().toISOString(),
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