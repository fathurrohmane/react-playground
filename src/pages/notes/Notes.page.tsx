import api from '@/api/api.js';
import { WelcomeHeader } from '@/pages/notes/components/WelcomeHeader.js';
import { Container, Flex, Notification } from '@mantine/core';
import { useTimeout } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import NoteCard from './components/NoteCard';
import NoteForm from "./components/NoteForm";
import Note from '@/types/Note';
import NoteDialog from './components/NoteDialog';

export function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([])
    const [selectedNoteId, setSelectedNoteId] = useState(-1)
    const [errorMessage, setErrorMessage] = useState("")
    const { start, clear } = useTimeout(() => setErrorMessage(""), 7000);
    const [openNoteDialog, setOpenNoteDialog] = useState(false)

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

    const onDelete = (id: number) => {
        api.delete(`/api/notes/${id}`)
            .then(() => {
                refresh()
            })
            .catch((err) => showError(err.message));
    }

    useEffect(() => {
        refresh()
    }, [])

    const editNote = (noteId: number) => {
        setSelectedNoteId(noteId)
        setOpenNoteDialog(true)
    }

    const onDialogClose = (updateNote: Note) => {
        const updatedNotes = notes.map(item => item.id === updateNote.id ? { ...updateNote } : item)
        setNotes(updatedNotes)
        setOpenNoteDialog(false)
        setSelectedNoteId(-1)
    }

    return (
        <>
            {openNoteDialog && <NoteDialog note={notes.find(item => item.id === selectedNoteId)} open={openNoteDialog} onClose={onDialogClose} showError={showError} />}
            <WelcomeHeader onRefresh={() => refresh()} onLogout={() => {
                setNotes([])
            }} />

            <NoteForm
                onComplete={() => {
                    setSelectedNoteId(-1)
                    refresh()
                }}
                onReset={() => setSelectedNoteId(-1)}
                showError={showError} />

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
