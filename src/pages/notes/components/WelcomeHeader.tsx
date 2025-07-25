import { useState } from 'react';
import { Container, Group, Modal, Title } from '@mantine/core';
import classes from './WelcomeHeader.module.css';
import { LoginDialog } from './LoginDialog';
import LoginButton from './LoginButton';

interface WelcomeHeaderProps {
    onRefresh: () => void,
    onLogout: () => void,
}

export function WelcomeHeader({ onRefresh, onLogout }: WelcomeHeaderProps) {
    const [openLoginDialog, setOpenLoginDialog] = useState(false);

    const onLogin = () => {
        setOpenLoginDialog(true)
    }

    return (
        <>
            <Modal
                opened={openLoginDialog}
                onClose={() => setOpenLoginDialog(false)}
                title="Login"
                centered >
                <LoginDialog onSuccess={() => {
                    setOpenLoginDialog(false)
                    onRefresh()
                }} />
            </Modal>
            <header className={classes.header}>
                <Container size="md" className={classes.inner}>
                    <Title className={classes.title}>Basic Note App</Title>
                    <Group gap={3}>
                        <LoginButton onLogin={onLogin} onLogout={() => {
                            localStorage.removeItem('token')
                            onLogout()
                        }} />
                    </Group>
                </Container>
            </header>
        </>
    );
}

