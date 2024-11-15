import React, { useState } from 'react';
import { login } from '../../../api/services/auth';
import GoogleLogo from '../assets/Googlelogo.png';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [email_user, setEmail] = useState('');
    const [password_user, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email_user, password_user); // Panggil fungsi login
            navigate('/home'); // Arahkan ke halaman home setelah login berhasil
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
                <h1 className="text-white text-6xl font-bold text-center mt-10 mb-20">FUTURE PATH</h1>
                <div className="bg-white bg-opacity-10 border backdrop-blur-lg p-7 rounded-md shadow-md w-99">
                    <h2 className="text-white text-2xl mt-4 text-center font-medium">Sign In</h2>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-white" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email_user}
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
                                value={password_user}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="border border-white rounded-md w-full p-2"
                            />
                        </div>
                        <button type="submit" className="w-full bg-sky-800 text-white p-2 rounded-md hover:bg-white hover:text-sky-700">
                            Sign In
                        </button>
                        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
                        <p className="mt-4 text-center">
                            No account? <a className="text-white hover:underline" href="/signup">Create one</a>
                        </p>
                        <p className="mt-2 text-center">Or sign in with</p>
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

export default SignIn;