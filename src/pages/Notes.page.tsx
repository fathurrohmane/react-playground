import { useEffect, useState } from 'react'
import NoteCard from '../components/Notes/NoteCard.jsx';
import { Button, Card, Container, Flex, Notification, Stack, TextInput } from '@mantine/core';
import { WelcomeHeader } from '@/components/Welcome/WelcomeHeader.js';
import { useClickOutside, useTimeout } from '@mantine/hooks';
import api from '@/api/api.js';

export function NotesPage() {
    const [notes, setNotes] = useState([])
    const [selectedNoteId, setSelectedNoteId] = useState(-1)
    const [errorMessage, setErrorMessage] = useState("")
    const { start, clear } = useTimeout(() => setErrorMessage(""), 7000);

    const showError = (errorMessage: string) => {
        start()
        setErrorMessage(errorMessage)
    }

    const clearError = () => {
        clear()
        setErrorMessage("")
    }

    const refresh = () => {
        api.get('/api/notes').then(data => {
            setNotes(data.data)
        }).catch((err) => {
            showError(err.message)
        });
    }

    const onDelete = (id) => {
        api.delete(`/api/notes/${id}`)
            .then(() => {
                refresh()
            })
            .catch((err) => showError(err.message));
    }

    useEffect(() => {
        refresh()
    }, [])

    const editNote = (noteId: Number) => {
        setSelectedNoteId(noteId)
    }

    return (
        <>
            <WelcomeHeader onRefresh={() => refresh()} onLogout={() => {
                setNotes([])
            }} />

            <NoteForm
                selectedNote={notes.find(item => item.id === selectedNoteId)}
                onComplete={() => {
                    setSelectedNoteId(-1)
                    refresh()
                }}
                onReset={() => setSelectedNoteId(-1)}
                showError={(errorMessage: string) => showError(errorMessage)} />

            <Container mt={20}>
                <Flex gap={8} wrap='wrap'>
                    {notes.map((item) =>
                        <NoteCard key={item.id} title={item.title} content={item.content} onEdit={() => {
                            editNote(item.id)
                        }} onDelete={() => onDelete(item.id)} isEditing={selectedNoteId === item.id} />)}
                </Flex>
            </Container>

            {
                errorMessage && <Notification color="red" onClose={() => clearError()} style={{ position: 'fixed', top: 20, right: 20 }} title="Ops, something went wrong!">
                    {errorMessage}
                </Notification>
            }
        </>
    )
}

function NoteForm({ selectedNote, onComplete, onReset, showError }) {
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
        api.put(`/api/notes/${id}`, {
            title: title,
            content: content
        }).then(() => {
            onComplete()
        }).catch((err) => showError(err.message));
    }

    const onSubmit = (e) => {
        e.preventDefault()
        api.post('/api/notes', {
            title,
            content
        }).then((data) => {
            reset()
            onComplete()
        }).catch((err) => showError(err.message));
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
