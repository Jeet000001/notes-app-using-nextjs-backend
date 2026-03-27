"use client";

import { useState } from "react";

const NoteForm = ({ savedNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(Array.isArray(savedNotes) ? savedNotes : []);

  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      if (result.success) {
        setNotes((prevNotes) => [result.data, ...prevNotes]);
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
    <div className="flex flex-col h-screen w-full bg-[#f5f0eb] font-sans overflow-hidden">
      {/* Top bar */}
      <div className="flex-shrink-0 py-4 px-7 border-b-[1.5px] border-[#e0d8cf] bg-[#f5f0eb]">
        <h1 className="font-serif font-bold text-[clamp(1.3rem,3vw,1.9rem)] text-[#2b2218] tracking-tight">
          📓 NoteKeeper <span className="text-sm font-normal text-[#9c8e80] ml-2">Your personal notebook</span>
        </h1>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Form panel */}
        <div className="flex-shrink-0 w-full md:w-[360px] border-r md:border-r-[1.5px] border-[#e0d8cf] p-7 pb-6 flex flex-col bg-[#faf7f4] overflow-y-auto">
          <label className="text-[0.7rem] font-semibold tracking-wider uppercase text-[#9c8e80] mb-1">Title</label>
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border-[1.5px] border-[#ddd4c8] rounded-xl bg-white text-[#2b2218] text-sm outline-none mb-4 focus:border-[#c9a96e] focus:ring-3 focus:ring-[#c9a96e]/20 transition"
          />
          <label className="text-[0.7rem] font-semibold tracking-wider uppercase text-[#9c8e80] mb-1">Content</label>
          <textarea
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 min-h-[120px] px-3 py-2 border-[1.5px] border-[#ddd4c8] rounded-xl bg-white text-[#2b2218] text-sm outline-none mb-5 resize-none focus:border-[#c9a96e] focus:ring-3 focus:ring-[#c9a96e]/20 transition"
          />
          <button
            onClick={createNote}
            disabled={loading || !title.trim() || !content.trim()}
            className="w-full py-3 bg-[#2b2218] text-[#f5f0eb] font-semibold text-sm rounded-xl cursor-pointer transition hover:bg-[#3d3020] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "+ Create Note"}
          </button>
        </div>

        {/* Notes panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 flex items-baseline gap-2 px-7 py-5 border-b-[1.5px] border-[#e0d8cf] bg-[#f5f0eb]">
            <h2 className="font-serif font-semibold text-[clamp(1rem,2.5vw,1.35rem)] text-[#2b2218]">All Notes</h2>
            <span className="text-[0.78rem] text-[#9c8e80] bg-[#e8e0d6] px-2 py-[2px] rounded-full">{notes.length}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-7 scrollbar-thin scrollbar-thumb-[#d4c9bc] scrollbar-track-transparent">
            {notes.length === 0 ? (
              <div className="text-center py-14 text-[#b0a49a]">
                <div className="text-3xl mb-3">✍️</div>
                <p className="text-sm">No notes yet. Create your first one!</p>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {notes.map((note) => (
                  <div key={note._id} className="bg-white border-[1.5px] border-[#e8e0d6] rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-200">
                    <div className="font-serif font-semibold text-[#2b2218] text-base truncate">{note.title}</div>
                    <div className="text-sm text-[#7a6e64] line-clamp-3 flex-1">{note.content}</div>
                    <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
                      <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
                      {note.updatedAt !== note.createdAt && (
                        <p>Updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-1">
                      <button className="flex-1 py-1 bg-[#eef4ff] text-[#3b6fd4] font-semibold text-xs rounded-lg active:scale-95 hover:opacity-80">Edit</button>
                      <button className="flex-1 py-1 bg-[#fff0f0] text-[#d94f4f] font-semibold text-xs rounded-lg active:scale-95 hover:opacity-80">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;