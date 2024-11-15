import axios from 'axios';

export const login = async (email, password) => {
    const response = await axios.post('http://localhost:8080/future-path/auth/login', {
        email_user: email,
        password_user: password,
    });

    const { token, role_id } = response.data.data; // Ambil token dan role_id dari respons
    localStorage.setItem('token', token); // Simpan token di localStorage
    localStorage.setItem('role_id', role_id); // Simpan role_id di localStorage

    return { token, role_id };
};

// Fungsi untuk mendapatkan token dari localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Fungsi untuk mendapatkan role_id dari localStorage
export const getRoleId = () => {
    return localStorage.getItem('role_id');
};

// Fungsi untuk logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role_id');
};