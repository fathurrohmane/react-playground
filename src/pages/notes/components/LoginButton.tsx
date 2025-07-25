import { Button } from '@mantine/core';
import { useState, useEffect } from 'react';

interface LoginButtonProps {
    onLogin: () => void,
    onLogout: () => void,
}

function LoginButton({ onLogin, onLogout }: LoginButtonProps) {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const hasToken = localStorage.getItem('token') != null;
        setLoggedIn(hasToken);
    });

    return (
        <Button onClick={() => {
            if (isLoggedIn) {
                onLogout();
            } else {
                onLogin();
            }
        }}>
            {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
    );
}

export default LoginButton;
