import { useEffect, useState } from 'react'
import NoteCard from '../components/Notes/NoteCard.jsx';
import { Button, Card, Container, Flex, Stack, TextInput } from '@mantine/core';
import { WelcomeHeader } from '@/components/Welcome/WelcomeHeader.js';
import { useClickOutside } from '@mantine/hooks';

export function NotesPage() {
    const [notes, setNotes] = useState([])
    const [selectedNoteId, setSelectedNoteId] = useState(-1)

    const refresh = () => {
        const token = localStorage.getItem('token')
        fetch('http://15.235.192.203:8080/api/notes', {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        throw new Error('Please login to access');
                    } else {
                        throw new Error('Network error');
                    }
                }
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
        refresh()
    }, [])

    const editNote = (noteId) => {
        setSelectedNoteId(noteId)
    }

    return (
        <>
            <WelcomeHeader onRefresh={() => refresh()} onLogout={() => {
                setNotes([])
            }} />
            <NoteForm
                selectedNote={notes.find(item => item.id == selectedNoteId)}
                onComplete={() => {
                    setSelectedNoteId(-1)
                    refresh()
                }}
                onReset={() => setSelectedNoteId(-1)} />
            <Container mt={20}>
                <Flex gap={8} wrap='wrap'>
                    {notes.map((item) =>
                        <NoteCard key={item.id} title={item.title} content={item.content} onEdit={() => {
                            editNote(item.id)
                        }} onDelete={() => onDelete(item.id)} isEditing={selectedNoteId === item.id} />)}
                </Flex>
            </Container>
        </>
    )
}

function NoteForm({ selectedNote, onComplete, onReset }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [onFocus, setOnFocus] = useState(false)
    const ref = useClickOutside(() => {
        reset()
    });

    useEffect(() => {
        setTitle(selectedNote?.title ?? '');
        setContent(selectedNote?.content ?? '');
        setOnFocus(selectedNote != null);
    }, [selectedNote]);

    const reset = () => {
        setTitle('')
        setContent('')
        setOnFocus(false)
        onReset()
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
                onComplete()
            })
            .catch((err) => window.alert(err));
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
                title: title,
                content: content
            })
        }).then((res) => {
            if (!res.ok) throw new Error('Network error');
            return res.json();
        })
            .then((data) => {
                reset()
                onComplete()
            })
            .catch((err) => window.alert(err));
    }

    return (
        <Container ref={ref}>
            <Card withBorder radius='md' mt={20}>
                <Stack>
                    {onFocus && <TextInput
                        variant="unstyled"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />}

                    <TextInput
                        variant="unstyled"
                        placeholder="Write your note here..."
                        onFocus={() => setOnFocus(true)}
                        value={content} onChange={(e) => setContent(e.target.value)}
                    />
                    {onFocus && <Flex style={{ alignSelf: 'flex-end' }}>
                        <Button onClick={() => {
                            reset()
                        }} variant='subtle'>
                            Cancel
                        </Button>
                        <Button onClick={(e) => { if (selectedNote) { onEdit(selectedNote.id, title, content) } else { onSubmit(e) } }} variant='subtle' >
                            Save
                        </Button>
                    </Flex>}
                </Stack>
            </Card>
        </Container >
    )
}
