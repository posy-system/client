import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import InputCompo from '../components/inputfield/InputCompo'
import ButtonCompo from '../components/button/ButtonCompo'
import { LoginUser } from '../apis/LoginApis'

export default function Loginpage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      toast.error('Please enter username and password');
      return;
    }

    try {
      setLoading(true);
      const data = await LoginUser({ username: username.trim(), password });

      if (data?.token) {
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      }

      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      toast.success(data?.message || 'Login successful');

      const role = data?.user?.role;
      if (role === 'admin') {
        navigate('/admindashboard');
      } else if (role === 'cashier') {
        navigate('/cashierpage');
      } else {
        navigate('/home');
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='bg-white/10 rounded-xl w-[800px] '>
      <form onSubmit={handleSubmit}>
        <InputCompo
          type="text"
          placeholder="Enter your username"
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <InputCompo
          type="password"
          placeholder="Enter your password"
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

      <ButtonCompo
        variant="blue"
        type="submit"
        disabled={loading}
        
      >
        {loading ? 'Logging in...' : 'Login'}
      </ButtonCompo>
      </form>

      
      

      </div>
    </div>
  )
}
