"use client"
import React, { useEffect, useState } from 'react'

const NotesDisplay = () => {
    const [notes, setNotes] = useState([])
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch("/api/notes")

                if (!res.ok) {
                    throw new Error("Failed to fetch notes")
                }

                const result = await res.json();
                setNotes(result); // important
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-lg font-medium animate-pulse">Loading notes...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">

            {/* Heading */}
            <h1 className="text-4xl font-bold text-center mb-10 tracking-tight">
                Notes Dashboard
            </h1>

            {/* Empty State */}
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
                            {/* Title */}
                            <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                                {note.title}
                            </h2>

                            {/* Content */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {note.content}
                            </p>

                            {/* Actions */}
                            <div className="flex justify-between items-center mt-auto">
                                <button className="text-sm px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                                    ✏️ Edit
                                </button>

                                <button className="text-sm px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                                    🗑 Delete
                                </button>
                            </div>

                            {/* Hover Accent */}
                            <div className="h-1 w-0 bg-blue-500 mt-4 group-hover:w-full transition-all duration-300 rounded"></div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}

export default NotesDisplay;