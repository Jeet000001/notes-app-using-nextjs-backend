"use client";

import { useState } from "react";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

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
      console.log(result);

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
    <div className="">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6">
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
    </div>
  );
};

export default NoteForm;
