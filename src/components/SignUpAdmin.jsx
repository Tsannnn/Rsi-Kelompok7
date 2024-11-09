// src/pages/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import GoogleLogo from '../assets/Googlelogo.png';
import { Link, useNavigate } from 'react-router-dom';

const SignUpAdmin = () => {
    const navigate = useNavigate();
    const [email_admin, setEmail] = useState('');
    const [password_admin, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/future-path/admin/auth/register', {
                email_admin,
                password_admin,
            }
            );
            console.log("Response from server:", response.data); // Tambahkan log ini

            if (response.data.data.token) {
                localStorage.setItem('token', response.data.data.token);
                console.log("Token saved:", response.data.data.token); // Tambahkan log ini
            } else {
                setError('Login failed: Token not found in response');
                return;
            }
            navigate('/home');
        } catch (err) {
            console.error(err);
            if (err.response) {
                setError('Login failed: ' + (err.response.data.message || 'Unknown error'));
            } else {
                setError('Login failed: Network error');
            }
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-[url('./images/Harvard.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="block">
                <h1 className="text-white text-6xl font-bold text-center my-10">FUTURE PATH</h1>
                <div className="bg-white bg-opacity-10 border backdrop-blur-lg p-7 rounded-md shadow-md w-99">
                    <h2 className="text-white text-2xl mt-3 text-center font-medium">Sign Up</h2>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-white" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email_admin}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="border border-white rounded-md w-full p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password_admin}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="border border-white rounded-md w-full p-2"
                            />
                        </div>
                        <button type="submit" className="w-full bg-sky-800 text -white p-2 rounded-md hover:bg-white hover:text-sky-700">
                            Sign Up
                        </button>
                        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
                        {success && <p className="mt-2 text-green-500 text-center">{success}</p>}
                        <p className="mt-4 text-center">
                            Already have an account? <a className="text-white hover:underline" href="/signin">Sign In</a>
                        </p>
                        <p className="mt-2 text-center">Or sign up with</p>
                        <div className="flex justify-center mt-2">
                            <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded p-1 mt-1 hover:bg-transparent">
                                <img src={GoogleLogo} alt="Google Logo" className="h-7" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpAdmin;