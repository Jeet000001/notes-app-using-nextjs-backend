import dbconnect from "@/lib/db";
import Notes from "@/models/notes";

const getNotes = async () => {
    await dbconnect();
    const notes = await Notes.find({}).sort({ createdAt: -1 });

    return notes.map((note) => ({
        ...note.toObject(),
        id: note._id.toString(),
    }));
};

const NotesDisplay = async () => {
    const notes = await getNotes();
    console.log(notes);
    return (
        <div>NotesDisplay</div>
    )
}

export default NotesDisplay