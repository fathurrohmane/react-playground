import { Button, Group, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import Note from "@/types/Note";
import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import api from "@/api/api";

interface NoteDialogProps {
    note?: Note,
    open: boolean,
    onClose: (updateNote: Note) => void,
    showError: (message: string) => void,
}

function NoteDialog({ note, open, onClose, showError }: NoteDialogProps) {
    const [title, setTitle] = useState(note?.title ?? '')
    const [content, setContent] = useState(note?.content ?? '')

    const ref = useClickOutside(() => {
        if (open) {
            console.log('Outside dialog');
        }
    });

    const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        api.put(`/api/notes/${note?.id}`, {
            title,
            content
        }).then(() => {
            onClose({
                id: note?.id ?? -1,
                title,
                content
            })
        }).catch((err) => showError(err.message));
    }

    return (<Modal
        ref={ref}
        opened={open}
        onClose={() => { }}
        withCloseButton={false}
        centered >
        <Stack>
            <TextInput
                variant="unstyled"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
                autosize
                minRows={2}
                maxRows={22}
                variant="unstyled"
                placeholder="Take a note..."
                value={content} onChange={(e) => setContent(e.target.value)}
            />
            <Group justify="flex-end">
                <Button onClick={(e) => { onEdit(e) }} variant='subtle' >
                    Close
                </Button>
            </Group>
        </Stack>
    </Modal>)
}

export default NoteDialog;