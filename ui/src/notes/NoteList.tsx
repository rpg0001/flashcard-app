import './notes.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listNotes, Note } from "../services/notes";

export default function NoteList() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => setNotes(await listNotes());
        fetchNotes();
    }, [])
    
    return (
        <div>
            <h1>All notes</h1>
            <Link to='create'>Add new note</Link>
            <div className='note-list'>
                {notes.map(note => 
                    <div className='note'>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <Link to={`${note.id}`} >view note</Link>
                    </div>
                )}
            </div>
        </div>
    )
}