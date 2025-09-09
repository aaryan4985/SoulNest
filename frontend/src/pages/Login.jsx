import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import Navbar from '../components/Navbar';
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  CssBaseline,
  Paper,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';

const defaultTheme = createTheme();

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
        role: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password, role } = loginInfo;
        if (!username || !password || !role) {
            return handleError('username, password and role are required');
        }
        try {
            const url = `${import.meta.env.VITE_API_URL}/auth/login/${role}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('userRole', role);
                setTimeout(() => navigate('/dashboard'), 1000);
            } else if (error) {
                handleError(error?.details[0].message);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        
        <Box sx={{
            minHeight: '100vh',
            minWidth: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgb(218, 245, 255)',
            '@media (max-width: 900px)': {
                minWidth: '100vw',
                p: 0,
            }
        }}>
            <Paper elevation={6} sx={{
                display: 'flex',
                width: '60%',
                minHeight: '720px',
                height: '80vh',
                borderRadius: 8,
                overflow: 'hidden',
                '@media (max-width: 900px)': {
                    flexDirection: 'column',
                    width: '95vw',
                    height: 'auto',
                    minHeight: '100vh',
                    borderRadius: 0,
                }
            }}>
                <Box sx={{
                    flex: 1,
                    width: '50%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    '@media (max-width: 900px)': {
                        width: '100%',
                        height: '220px',
                        minHeight: '180px',
                        maxHeight: '220px',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        zIndex: 1,
                    }
                }}>
                    <img
                        src="/src/assets/login-image.png"
                        alt="Login Visual"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </Box>
                <Box sx={{
                    flex: 1,
                    width: '50%',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    '@media (max-width: 900px)': {
                        width: '100%',
                        p: 2,
                        minHeight: 'calc(100vh - 200px)',
                    }
                }}>
                    <Box sx={{ p: 4.8, pt: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <img
                                src="/src/assets/d-logo.png"
                                alt="Logo"
                                style={{
                                    width: '90px',
                                    height: '90px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                        <Typography 
                            component="h1" 
                            variant="h5"
                            sx={{
                                mb: 6,
                                textAlign: 'center',
                                fontFamily: '"Montserrat", sans-serif',
                                fontWeight: 400,
                                fontSize: { xs: '1rem', sm: '1.2rem' },
                            }}
                        >
                            Learning beyond the classroom
                        </Typography>
                        <Box component="form" onSubmit={handleLogin} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '400px',
                            mx: 'auto',
                        }}>
                            <FormControl fullWidth margin="normal" variant="standard">
                                <InputLabel id="role-select-label">Select Role</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    name="role"
                                    value={loginInfo.role}
                                    onChange={handleChange}
                                    required
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            fontSize: '0.85rem',
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontSize: '0.85rem',
                                        },
                                        '& .MuiInput-underline:before': { borderBottomColor: 'rgba(0, 0, 0, 0.42)' },
                                        '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
                                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'rgba(0, 0, 0, 0.87)' },
                                    }}
                                >
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="teacher">Teacher</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={loginInfo.username}
                                onChange={handleChange}
                                variant="standard"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: '0.85rem',
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '0.85rem',
                                    },
                                    '& .MuiInput-underline:before': { borderBottomColor: 'rgba(0, 0, 0, 0.42)' },
                                    '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'rgba(0, 0, 0, 0.87)' },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="username"
                                                edge="end"
                                            >
                                                <PersonIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                value={loginInfo.password}
                                onChange={handleChange}
                                variant="standard"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: '0.85rem',
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '0.85rem',
                                    },
                                    '& .MuiInput-underline:before': { borderBottomColor: 'rgba(0, 0, 0, 0.42)' },
                                    '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'rgba(0, 0, 0, 0.87)' },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center', mt: 8, mb: 8 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ borderRadius: 10, px: 3, py: 1.2, fontSize: '0.72rem', flex: 1 }}
                                >
                                    Log In
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            <ToastContainer />
        </Box>
        </ThemeProvider>
    );
}

export default Login;

/* Responsive image style for mobile */
/*
.login-image-responsive {
  object-fit: cover;
}
@media (max-width: 900px) {
  .login-image-responsive {
    object-fit: contain !important;
    background: #fff;
  }
}
*/
