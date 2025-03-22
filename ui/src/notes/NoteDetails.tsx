import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteNote, getNote, Note } from "../services/notes";
import './notes.css';

export default function NoteDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [note, setNote] = useState<Note>();

    useEffect(() => {
        const fetchNote = async () => setNote(await getNote(Number(id)));
        fetchNote();
    }, [id]);

    async function doDeleteNote() {
        await deleteNote(parseInt(id ?? ""));
        navigate(`/notes`);
    }
    
    return (
        <div>
            <Link to='/notes' >Back to note list</Link>
            <h1>View note</h1>
            {note ?
                <>
                    <div className='note'>
                        <h2>{note?.title}</h2>
                        <p>{note?.content}</p>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <Link to={`edit`} >edit</Link>
                        |
                        <a href="/" onClick={doDeleteNote}>delete</a>
                    </div>
                </>
            :
                <div>
                    <p>Failed to retrieve note</p>
                </div>
            }
        </div>
    )
}