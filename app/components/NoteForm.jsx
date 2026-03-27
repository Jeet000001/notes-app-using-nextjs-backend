"use client";

import { useState } from "react";

const NoteForm = ({ savedNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(savedNotes)

  const createNote = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
        // title, content are javascript object and json.stringify conver the object into string
      });

      const result = await response.json();
      if(result.success){
        setNotes([result.data, ...notes])
        setTitle("")
        setContent("")
      }

      if (response.ok) {
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Note
        </h1>
        <form onSubmit={createNote} className="space-y-4">
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 active:scale-95 transition duration-200"
          >
            {loading ? "Loading..." : "Create Note"}
          </button>
        </form>
      </div>
      <div className="max-w-5xl mx-auto px-4 pb-8">

            <h1 className="text-4xl font-bold text-center mb-10 tracking-tight">
                Notes Dashboard
            </h1>

            {notes.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No notes found. Start adding some ✍️
                </p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="group bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                                {note.title}
                            </h2>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {note.content}
                            </p>

                            <div className="flex justify-between items-center">
                                <button className="text-sm px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                                    ✏️ Edit
                                </button>

                                <button className="text-sm px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                                    🗑 Delete
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    </div>
  );
};

export default NoteForm;
