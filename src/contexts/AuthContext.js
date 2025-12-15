import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, setCurrentUser, clearCurrentUser } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getCurrentUser());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setCurrentUser(userData);
        setUser(userData);
    };

    const logout = () => {
        clearCurrentUser();
        setUser(null);
    };

    const isAdmin = () => {
        return user && user.role === 'admin';
    };

    const value = {
        user,
        login,
        logout,
        isAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};