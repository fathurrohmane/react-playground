import { useState, useEffect } from 'react';
import { Button, Container, Group, Modal, Title } from '@mantine/core';
import classes from './WelcomeHeader.module.css';
import { LoginDialog } from '../Login/LoginDialog';

export function WelcomeHeader({ onRefresh, onLogout }) {
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
                centered
            >
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

function LoginButton({ onLogin, onLogout }) {
    const [isLoggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const hasToken = localStorage.getItem('token') != null
        setLoggedIn(hasToken)
    })

    return (
        <Button onClick={() => {
            if (isLoggedIn) { onLogout() } else { onLogin() }
        }}>
            {isLoggedIn ? 'Logout' : 'Login'}
        </Button >
    )
}