import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import NoteCard from '../components/Notes/NoteCard.jsx';
import { Button } from '@mantine/core';
import { WelcomeHeader } from '@/components/Welcome/WelcomeHeader.js';

export function NotesPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [notes, setNotes] = useState([])
    const navigate = useNavigate()

    const refresh = () => {
        if (!localStorage.getItem("token")) {
            navigate("/")
            return
        }

        fetch('http://15.235.192.203:8080/api/notes', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((res) => {
                console.log(res);
                if (!res.ok) throw new Error('Network error');
                return res.json();
            })
            .then((data) => {
                setNotes(data.data)
            })
            .catch((err) => {
                console.log(err);
                window.alert(err)
            });
    }

    const onSubmit = (e) => {
        e.preventDefault()
        fetch('http://15.235.192.203:8080/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                title: username,
                content: password
            })
        }).then((res) => {
            if (!res.ok) throw new Error('Network error');
            return res.json();
        })
            .then((data) => {
                refresh()
            })
            .catch((err) => window.alert(err));
    }

    const onEdit = (id, title, content) => {
        fetch(`http://15.235.192.203:8080/api/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).then((res) => {
            if (!res.ok) throw new Error('Network error');
            return res.json();
        })
            .then(() => {
                refresh()
            })
            .catch((err) => window.alert(err));
    }

    const onDelete = (id) => {
        fetch(`http://15.235.192.203:8080/api/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((res) => {
            if (!res.ok) throw new Error('Network error');
            return res.json();
        })
            .then(() => {
                refresh()
            })
            .catch((err) => window.alert(err));
    }

    useEffect(() => {
        // refresh()
    }, [])

    return (
        <div>
            <WelcomeHeader />
            <div style={{ padding: "10px 20px", flexGrow: 1, alignItems: "center", display: 'flex', flexDirection: 'column' }}>
                <form style={{ display: 'flex', flexDirection: "column", width: "400px", gap: "4px" }}>
                    <label htmlFor="title">Title</label>
                    <input id='title' type="text" placeholder='Title' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="content">Content</label>
                    <input id='content' type="text" placeholder='Content' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={(e) => onSubmit(e)}>
                        Post
                    </Button>
                </form>
                <div style={{ alignSelf: "flex-start", display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {notes.map((item) => <NoteCard key={item.id} title={item.title} content={item.content} onEdit={(newTitle, newContent) => {
                        onEdit(item.id, newTitle, newContent)
                    }} onDelete={() => onDelete(item.id)} />)}
                </div>
            </div>
        </div>
    )
}
