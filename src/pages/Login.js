import React, { useState } from 'react'
import { makeStyles } from "tss-react/mui";
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import backimage from '../images/login-back.svg';
import store from '../store/_storeConfig';
import { logIn, setLog } from '../store/loginHandle';

const useStyles = makeStyles()((theme) => {
    return {
        container: {
            minHeight: '100vh',
            backgroundImage: `url(${backimage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
        field: {
            width: '90%',
        },
        loginCard: {
            width: '400px',
            '& .MuiCardContent-root:last-child': {
                paddingBottom: '0px',
                textAlign: 'center',
            },
        }
    }
});

function Login() {
    const { classes } = useStyles();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    var uError = false;
    
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    var pError = false;

    const handleClear = () => {
        setUsername('');
        setPassword('');

        clearErrors();
    }

    const clearErrors = () => {
        setUsernameError(false);
        setPasswordError(false);

        uError = false;
        pError = false;
    }

    const validate = () => {
        clearErrors();

        if (username === '') {
            setUsernameError(true);
            uError = true;
        }

        if (password === '') {
            setPasswordError(true);
            pError = true;
        }

        if (uError && pError) {
            return false;
        }

        return true;
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if (validate()) {
            var data = { username, password };

            store.dispatch(logIn(data));
            store.dispatch(setLog());

            handleClear();
            
            if (store.getState().token !== null) {
                navigate('/dashboard');
            }
            else alert('Login Failed');
        }
    }

    return (
        <div className='login'>
            <Grid
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                className={classes.container}
            >
                <Grid item xs={1}>
                    <Card className={classes.loginCard}>
                        <CardContent>
                            <Typography variant='h3' sx={{ my: 3 }}>
                                CRM Login
                            </Typography>

                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='username'
                                value={username}
                                label='Username'
                                variant='standard'
                                color='secondary'
                                error={usernameError}
                                className={classes.field}
                                helperText={usernameError ? "Can not be Empty" : null}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{ mt: 3 }}
                            />

                            <TextField
                                required
                                fullWidth
                                type='password'
                                name='password'
                                value={password}
                                label='Password'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={passwordError}
                                helperText={passwordError ? "Can not be Empty" : null}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mt: 4, mb: 3 }}
                            />

                            <Grid
                                container
                                direction='row'
                                sx={{ my: 3 }}
                            >
                                <Grid item xs={6}>
                                    <Button sx={{ width: '90%' }}
                                        size='large'
                                        variant='outlined'
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button sx={{ width: '90%' }}
                                        size='large'
                                        variant='contained'
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;