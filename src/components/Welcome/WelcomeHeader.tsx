import { useState } from 'react';
import { Burger, Container, Group, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './WelcomeHeader.module.css';
import { LoginDialog } from '../Login/LoginDialog';
import { useNavigate } from 'react-router-dom';

const links = [
    { link: '/notes', label: 'Notes' },
    { link: '/short-url', label: 'Short URL' },
    { link: '/admin', label: 'Admin' },
    { link: '/login', label: 'Login' },
];

export function WelcomeHeader() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const navigate = useNavigate()


    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                if (link.link === "/login") {
                    setOpenLoginDialog(true)
                } else {
                    setActive(link.link)
                    navigate(link.link)
                }
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <>
            <Modal
                opened={openLoginDialog}
                onClose={() => setOpenLoginDialog(false)}
                title="Login"
                centered
            >
                <LoginDialog onSuccess={() => setOpenLoginDialog(false)} />
            </Modal>
            <header className={classes.header}>
                <Container size="md" className={classes.inner}>
                    <Title className={classes.title}>React Playground</Title>

                    <Group gap={5} visibleFrom="xs">
                        {items}
                    </Group>

                    <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
                </Container>
            </header>
        </>

    );
}