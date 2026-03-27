"use client";

import { useState } from "react";

const NoteForm = ({ savedNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(savedNotes || []);

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
        setNotes([result.data, ...notes]);
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .notes-root {
          display: flex;
          flex-direction: column;
          height: 100dvh;
          width: 100%;
          background: #f5f0eb;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ── Top bar ── */
        .notes-topbar {
          flex-shrink: 0;
          padding: 18px 28px 14px;
          border-bottom: 1.5px solid #e0d8cf;
          background: #f5f0eb;
        }
        .notes-topbar h1 {
          font-family: 'Lora', serif;
          font-size: clamp(1.3rem, 3vw, 1.9rem);
          font-weight: 700;
          color: #2b2218;
          letter-spacing: -0.02em;
        }
        .notes-topbar span {
          font-size: 0.78rem;
          color: #9c8e80;
          font-weight: 400;
          margin-left: 10px;
        }

        /* ── Main split ── */
        .notes-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* ── Form panel ── */
        .form-panel {
          flex-shrink: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          border-right: none;
          padding: 28px 24px 24px;
          background: #faf7f4;
          overflow-y: auto;
        }

        @media (min-width: 768px) {
          .form-panel {
            width: 360px;
            border-right: 1.5px solid #e0d8cf;
            overflow: hidden;
          }
        }

        .form-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9c8e80;
          margin-bottom: 6px;
        }

        .form-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #ddd4c8;
          border-radius: 10px;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #2b2218;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          margin-bottom: 18px;
        }
        .form-input:focus {
          border-color: #c9a96e;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.15);
        }
        .form-input::placeholder { color: #bbb0a4; }

        .form-textarea {
          width: 100%;
          flex: 1;
          min-height: 120px;
          padding: 11px 14px;
          border: 1.5px solid #ddd4c8;
          border-radius: 10px;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #2b2218;
          outline: none;
          resize: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          margin-bottom: 20px;
        }
        .form-textarea:focus {
          border-color: #c9a96e;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.15);
        }
        .form-textarea::placeholder { color: #bbb0a4; }

        .form-submit {
          width: 100%;
          padding: 12px;
          background: #2b2218;
          color: #f5f0eb;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          flex-shrink: 0;
        }
        .form-submit:hover { background: #3d3020; }
        .form-submit:active { transform: scale(0.98); }
        .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── Notes panel ── */
        .notes-panel {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
          padding: 0;
        }

        /* Fixed heading inside notes panel */
        .notes-panel-header {
          flex-shrink: 0;
          padding: 22px 28px 14px;
          border-bottom: 1.5px solid #e0d8cf;
          background: #f5f0eb;
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .notes-panel-header h2 {
          font-family: 'Lora', serif;
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          font-weight: 600;
          color: #2b2218;
        }
        .notes-count {
          font-size: 0.78rem;
          color: #9c8e80;
          background: #e8e0d6;
          padding: 2px 9px;
          border-radius: 20px;
        }

        /* Scrollable notes grid */
        .notes-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 24px 28px;
          scrollbar-width: thin;
          scrollbar-color: #d4c9bc transparent;
        }
        .notes-scroll::-webkit-scrollbar { width: 5px; }
        .notes-scroll::-webkit-scrollbar-track { background: transparent; }
        .notes-scroll::-webkit-scrollbar-thumb { background: #d4c9bc; border-radius: 10px; }

        .notes-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 600px) {
          .notes-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1100px) {
          .notes-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .note-card {
          background: #fff;
          border: 1.5px solid #e8e0d6;
          border-radius: 14px;
          padding: 18px 18px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: box-shadow 0.2s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .note-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #c9a96e, #e8c98a);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .note-card:hover {
          box-shadow: 0 8px 28px rgba(43,34,24,0.1);
          transform: translateY(-2px);
        }
        .note-card:hover::before { opacity: 1; }

        .note-title {
          font-family: 'Lora', serif;
          font-size: 1rem;
          font-weight: 600;
          color: #2b2218;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .note-content {
          font-size: 0.85rem;
          color: #7a6e64;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .note-actions {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }
        .btn-edit, .btn-delete {
          flex: 1;
          padding: 7px 0;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.1s;
        }
        .btn-edit:active, .btn-delete:active { transform: scale(0.97); }
        .btn-edit {
          background: #eef4ff;
          color: #3b6fd4;
        }
        .btn-edit:hover { opacity: 0.8; }
        .btn-delete {
          background: #fff0f0;
          color: #d94f4f;
        }
        .btn-delete:hover { opacity: 0.8; }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #b0a49a;
        }
        .empty-state .empty-icon {
          font-size: 3rem;
          margin-bottom: 12px;
        }
        .empty-state p {
          font-size: 0.95rem;
        }

        /* On small screens: show form on top, notes below (stacked) */
        @media (max-width: 767px) {
          .notes-body {
            flex-direction: column;
          }
          .notes-panel {
            flex: 1;
          }
        }
      `}</style>

      <div className="notes-root">
        {/* Top bar */}
        <div className="notes-topbar">
          <h1>📓 NoteKeeper <span>Your personal notebook</span></h1>
        </div>

        {/* Body: form | notes */}
        <div className="notes-body">

          {/* ── Form Panel ── */}
          <div className="form-panel">
            <div className="form-label">Title</div>
            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
            <div className="form-label">Content</div>
            <textarea
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-textarea"
            />
            <button
              onClick={createNote}
              disabled={loading || !title.trim() || !content.trim()}
              className="form-submit"
            >
              {loading ? "Saving..." : "+ Create Note"}
            </button>
          </div>

          {/* ── Notes Panel ── */}
          <div className="notes-panel">
            {/* Fixed header */}
            <div className="notes-panel-header">
              <h2>All Notes</h2>
              <span className="notes-count">{notes.length}</span>
            </div>

            {/* Scrollable content */}
            <div className="notes-scroll">
              {notes.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✍️</div>
                  <p>No notes yet. Create your first one!</p>
                </div>
              ) : (
                <div className="notes-grid">
                  {notes.map((note) => (
                    <div key={note.id} className="note-card">
                      <div className="note-title">{note.title}</div>
                      <div className="note-content">{note.content}</div>
                      <div className="note-actions">
                        <button className="btn-edit">Edit</button>
                        <button className="btn-delete">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default NoteForm;