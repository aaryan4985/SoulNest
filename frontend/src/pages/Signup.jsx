import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import Navbar from '../components/Navbar';



function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        username: '',
        password: '',
        role: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { username, password, role } = signupInfo;
        if (!username || !password || !role) {
            return handleError('username, password and role are required');
        }
        try {
            const url = `${import.meta.env.VITE_API_URL}/auth/signup/${role}`;
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
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:w-1/2 flex items-center justify-center bg-blue-100 p-8">
                    <img src="/src/assets/login-image.png" alt="Signup Visual" className="object-cover w-full h-60 md:h-full rounded-lg" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex justify-center mb-4">
                        <img src="/src/assets/d-logo.png" alt="Logo" className="w-20 h-20 object-contain" />
                    </div>
                    <h1 className="text-2xl font-bold text-center mb-6 font-montserrat">Learning beyond the classroom</h1>
                    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full max-w-xs mx-auto">
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Select Role</label>
                            <select
                                id="role"
                                name="role"
                                value={signupInfo.role}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                            >
                                <option value="">Select...</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                autoFocus
                                value={signupInfo.username}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={signupInfo.password}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={handleClickShowPassword}
                                    className="absolute inset-y-0 right-0 px-2 flex items-center text-gray-500"
                                    tabIndex={-1}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition"
                        >
                            Sign Up
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Signup;

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
