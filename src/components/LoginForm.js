import React, { useState } from 'react';
import { getUserByCredentials } from '../utils/storage';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const user = getUserByCredentials(username, password);

        if (user) {
            onLogin(user);
        } else {
            setError('Invalid username or password');
        }
    };

    const handlePassword = () => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    };


    return (
        <div className="login-container">
            <h2>Login to Task Manager</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        name="username"
                        type="text"
                        value={username}
                        autoComplete="current-username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <div className='password-container'>
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={handlePassword} >{showPassword ? "Hide" : "Show"}</span>
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;