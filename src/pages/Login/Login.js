import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { createUseStyles } from 'react-jss';
import * as Yup from 'yup';

// material-ui imports
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// local imports
import store from '../../store/_storeConfig';
import { logIn, logOut } from '../../store/loginHandle';
import { loginBackground } from '../../assets';
import { Alert, TextField } from '../../components';

// styles
const useStyles = createUseStyles({
    login: {
        display: 'grid',
        placeItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${loginBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    loginCard: {
        width: '400px',

        '& .MuiCardContent-root': {
            paddingBottom: '0px',
            textAlign: 'center'
        }
    },
    loginBtnContainer: {
        display: 'flex',
        paddingTop: '20px',
        paddingBottom: '30px',
    },
    loginBtn: {
        width: '90%'
    }
});

const Login = () => {
    const navigate = useNavigate();
    const [isAlertOpened, setIsAlertOpened] = useState(false);

    const styles = useStyles();

    const initialValues = {
        username: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is Required'),
        password: Yup.string().required('Password is Required')
    });

    const handleSubmit = (values, onSubmitProps) => {
        store.dispatch(logOut());

        const data = { username: values.username, password: values.password };
        store.dispatch(logIn(data));

        onSubmitProps.resetForm();

        const unsubscribe = store.subscribe(() => {
            const token = store.getState().login.token;

            if (token !== null) {
                navigate('/dashboard');
                unsubscribe();
            } else {
                setIsAlertOpened(true);
            }
        });
    };

    const loginForm = (props) => (
        <Form>
            <Typography variant='h3' sx={{ my: 3 }}>
                CRM Login
            </Typography>

            <TextField
                name='username'
                label='Username'
                formikProps={props}
                width='90%'
            />

            <TextField
                type='password'
                name='password'
                label='Password'
                formikProps={props}
                width='90%'
            />

            <div className={styles.loginBtnContainer}>
                <div className={styles.loginBtn}>
                    <Button
                        type='reset'
                        size='large'
                        variant='outlined'
                    >
                        Clear
                    </Button>
                </div>
                <div className={styles.loginBtn}>
                    <Button
                        type='submit'
                        size='large'
                        variant='contained'
                    >
                        Login
                    </Button>
                </div>
            </div>
        </Form>
    );

    return (
        <div className={styles.login}>
            <Card className={styles.loginCard}>
                <CardContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(props) => loginForm(props)}
                    </Formik>
                </CardContent>
            </Card>
            <Alert
                state={{ isAlertOpened, setIsAlertOpened }}
                message='Invalid Credentials'
                severity={'error'}
            />
        </div>
    )
};

export default Login;