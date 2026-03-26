import dbconnect from "@/lib/db";
import React from "react";
import NoteForm from "./components/NoteForm";

const page = async () => {
  await dbconnect();
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-4xl font-extrabold font-serif py-5">Noes App</h1>
      <div>
        <NoteForm />
      </div>
    </div>
  );
};

export default page;
