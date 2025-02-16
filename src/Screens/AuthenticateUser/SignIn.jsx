import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../../Components/CustomIcon';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../FirebaseConfig';
import { LinearProgress } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn(props) {
    const navigate = useNavigate()
    const [loader, setLoader] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const saveData = () => {
        setLoader(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError(false)

                // Signed up 
                const user = userCredential.user;
                console.log(user);
                setEmail('')
                setPassword('')
                localStorage.setItem('UID',userCredential.user.uid)
                navigate('/dashboard')
                // ...
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                setError(true)
                setLoader(false)
                console.log(errorMessage);

                // ..
            });
    };

    const handleSubmit = (event) => {
        if (name || email || password) {
            event.preventDefault();
            return;
        }
    };

    return (
        <>
            <CssBaseline enableColorScheme />

            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    {loader ? <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box> : null}
                    {error ?
                        <Typography
                            component="h4"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(1rem, 5vw, 1rem)', color: 'red' }}
                        >
                            Error Signing In!
                        </Typography>
                        : null
                    }
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <FormControl>
                            <FormLabel sx={{ mb: 1 }} htmlFor="email">Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                variant="outlined"
                                label="Enter Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel sx={{ mb: 1 }} htmlFor="password">Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                variant="outlined"
                                label="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={saveData}
                        >
                            Sign in
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            Dont't have an account?{' '}
                            <Link
                                onClick={() => navigate('/signup')}
                                variant="body2"
                                sx={{ alignSelf: 'center', cursor:'pointer'}}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignUpContainer>
        </>
    );
}