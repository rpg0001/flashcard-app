import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../services/notes";
import './notes.css';

export function CreateNote() {
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();
    const navigate = useNavigate();

    async function doCreateNote() {
        if (title && content) {
            const note = await createNote(title, content, 3); // TODO provide user id
            if (note) navigate(`/notes/${note.id}`);
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        doCreateNote();
    }

    return (
        <div>
            <h1>Add new note</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input 
                        type='text' 
                        id='title' 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='content'>Content</label>
                    <input 
                        type='text' 
                        id='content' 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}