import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const correctPassword = '0711'; // 비밀번호 설정

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <header className="admin-header">
          <h1>Admin Panel - Login</h1>
          <nav>
            <Link to="/" className="home-button">Go to Home Page</Link>
          </nav>
        </header>
        <main className="admin-main">
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <p>Enter password to access Admin Panel:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <nav>
          <Link to="/" className="home-button">Go to Home Page</Link>
        </nav>
      </header>
      <main className="admin-main">
        <section>
          <h2>This is the Admin Page. Product management features are disabled in static mode.</h2>
          <p>To enable product management, you need a backend server.</p>
        </section>
      </main>
    </div>
  );
}

export default AdminPage;