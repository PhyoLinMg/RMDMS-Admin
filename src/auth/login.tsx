import React, { useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../App';
import './login.css';

interface LoginFormData {
  username: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to your authentication endpoint
      // Example: const response = await api.login(formData.username, formData.password);
      
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - validate credentials (replace with actual auth logic)
      if (formData.username === 'admin' && formData.password === 'password') {
        // Success - Store auth token and update auth state
        const authToken = 'example-auth-token';
        login(authToken);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Login</h1>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="login-button" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          
          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;