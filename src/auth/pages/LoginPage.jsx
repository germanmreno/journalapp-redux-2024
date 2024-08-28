import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"

import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks"

import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from "../layout/AuthLayout"

import { useForm } from "../../hooks"

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const { errorMessage } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.ui)

    const { email, password, onInputChange, formState } = useForm(formData);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(startLoginWithEmailPassword(formState));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            placeholder="correo@google.com"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            placeholder="Contraseña"
                            fullWidth
                        />
                    </Grid>
                    <Grid container
                        spacing={2}
                        sx={{ mt: 1 }}
                        display={errorMessage ? '' : 'none'}
                    >

                        <Grid
                            item
                            xs={12}
                        >
                            <Alert severity='error'
                            >
                                {errorMessage}
                            </Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={loading}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={loading}
                                variant="contained"
                                fullWidth
                                onClick={onGoogleSignIn}
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                    >
                        <Link
                            component={RouterLink}
                            color="inherit"
                            to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>


    )
}
