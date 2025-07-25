import { useState } from 'react';
import { Alert, Button, Stack, TextInput } from '@mantine/core';
import classes from './LoginDialog.module.css';
import api from '../../../api/api'

interface LoginDialogProps {
    onSuccess: () => void
}

export function LoginDialog({ onSuccess }: LoginDialogProps) {
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [usernameValue, setUsernameValue] = useState('');
    const usernameFloating = usernameValue.trim().length !== 0 || usernameFocused || undefined;

    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const passwordFloating = passwordValue.trim().length !== 0 || passwordFocused || undefined;

    const [errorMessage, setErrorMessage] = useState("")

    const onLogin = async () => {
        setErrorMessage("")
        api.post('/public/api/auth/login', {
            userName: usernameValue,
            password: passwordValue,
        }).then(data => {
            localStorage.setItem('token', data.data.token);
            onSuccess()
        }).catch(err => {
            setErrorMessage(err.message)
        });
    }

    return (
        <Stack>
            {errorMessage && <Alert variant="light" color="red">
                {errorMessage}
            </Alert>}

            <TextInput
                label="Username"
                placeholder="Username"
                required
                classNames={classes}
                value={usernameValue}
                onChange={(event) => setUsernameValue(event.currentTarget.value)}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
                mt="md"
                autoComplete="nope"
                data-floating={usernameFloating}
                labelProps={{ 'data-floating': usernameFloating }}
            />
            <TextInput
                label="Password"
                placeholder="Password"
                required
                type='password'
                classNames={classes}
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.currentTarget.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                mt="md"
                autoComplete="nope"
                data-floating={passwordFloating}
                labelProps={{ 'data-floating': passwordFloating }}
            />
            <Button onClick={onLogin}>
                Login
            </Button>
        </Stack>
    )
}