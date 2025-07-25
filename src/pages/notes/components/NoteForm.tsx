import api from '@/api/api.js';
import { Button, Card, Container, Flex, Stack, TextInput } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useState } from 'react';

interface NoteFormProps {
    onComplete: () => void,
    onReset: () => void,
    showError: (errorMessage: string) => void
}

function NoteForm({ onComplete, onReset, showError }: NoteFormProps) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [onFocus, setOnFocus] = useState(false)
    const ref = useClickOutside(() => {
        if (onFocus) {
            reset()
        }
    });

    const reset = () => {
        setTitle('')
        setContent('')
        setOnFocus(false)
        onReset()
    }

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        api.post('/api/notes', {
            title,
            content
        }).then(() => {
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
                        <Button onClick={(e) => { onSubmit(e) }} variant='subtle' >
                            Save
                        </Button>
                    </Flex>}
                </Stack>
            </Card>
        </Container >
    )
}

export default NoteForm;