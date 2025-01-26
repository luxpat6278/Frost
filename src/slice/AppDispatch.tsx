import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store'; // Импортируйте AppDispatch
import { signIn, signOut } from './authSlice';

const LoginComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Применение AppDispatch

    const handleLogin = async () => {
        await dispatch(signIn('username', 'password')); // Вызов действия signIn
    };

    const handleLogout = () => {
        dispatch(signOut()); // Вызов действия signOut
    };

    return (
        <div>
            <button onClick={handleLogin}>Sign In</button>
            <button onClick={handleLogout}>Sign Out</button>
        </div>
    );
};

export default LoginComponent;
