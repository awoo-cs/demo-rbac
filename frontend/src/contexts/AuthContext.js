import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

axios.defaults.baseURL = 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            axios.get('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setAuthData({ token, user: response.data });
            })
            .catch(() => {
                localStorage.removeItem('token');
                setAuthData(null);
            });
        }
    }, []);

    const register = async(email, password, role) => {
        try{
            const response = await axios.post('/api/auth/register', { email, password, role });
            const { message } = response.data;
            console.log(message);
        }catch (error){
            console.error('Error registrando usuario:', error.response?.data?.message || error.message);
        }
    };

    const login = async (email, password) => {
        try{
            const response = await axios.post('/api/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setAuthData({ token, user });
        }catch(error){
            throw new error('Email o Password Invalida')
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthData(null);
    };

    return(
        <AuthContext.Provider value={{ authData, setAuthData, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};