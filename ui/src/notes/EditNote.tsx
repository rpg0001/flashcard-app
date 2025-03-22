import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Note, getNote, updateNote } from "../services/notes";

export default function EditNote() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState<Note>();
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    useEffect(() => {
        const fetchNote = async () => setNote(await getNote(Number(id)));
        fetchNote();
    }, [id]);
    
    useEffect(() => {
        setTitle(note?.title);
        setContent(note?.content);
    }, [note])

    async function doUpdateNote() {
        if (title && content) {
            await updateNote(parseInt(id ?? ""), title, content);
            navigate(`/notes/${id}`);
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        doUpdateNote();
    }
    
    return (
        <div>
            <h1>Edit note #{id}</h1>
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
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}