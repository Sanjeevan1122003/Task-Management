import React, { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { initializeDefaultData } from './utils/storage';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const { user, login, logout, loading } = useAuth();

  useEffect(() => {
    initializeDefaultData();
  }, []);

  const handleLogin = (userData) => {
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Task Management System</h1>
        {user && (
          <div className="user-info">
            <span>Welcome, {user.username} ({user.role})</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </header>

      <main className="app-main">
        {!user ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <Dashboard
            isAdmin={user.role === 'admin'}
            userId={user.id}
          />
        )}
      </main>
    </div>
  );
}

export default App;;
