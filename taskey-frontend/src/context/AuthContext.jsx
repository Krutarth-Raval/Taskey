import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('/profile');
                    setUser(response.data.user);
                } catch (error) {
                    console.error("Error fetching user profile", error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            toast.success('Logged in successfully!');
            return response.data.user;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return null;
        }
    };

    const register = async (data) => {
        try {
            const response = await api.post('/register', data);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            toast.success('Registered successfully!');
            return response.data.user;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return null;
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error("Error during logout", error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            toast.success('Logged out successfully!');
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
