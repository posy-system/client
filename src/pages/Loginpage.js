import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import InputCompo from '../components/inputfield/InputCompo'
import ButtonCompo from '../components/button/ButtonCompo'
import { LoginUser } from '../apis/LoginApis'
import { FaRegUser } from 'react-icons/fa'
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi'

export default function Loginpage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordInputType = useMemo(() => (showPassword ? 'text' : 'password'), [showPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      toast.error('Please enter username and password');
      return;
    }

    try {
      setLoading(true);
      const data = await LoginUser({ username: username.trim(), password });

      const role = (data?.user?.role || '').toLowerCase();
      const hasValidLogin = Boolean(data?.token) && (role === 'admin' || role === 'cashier');

      if (!hasValidLogin) {
        const message =
          (typeof data?.message === 'string' && data.message.trim() ? data.message : null) ||
          'Invalid username or password';
        toast.error(message);
        return;
      }

      localStorage.setItem('token', data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      localStorage.setItem('user', JSON.stringify(data.user));

      const successMessage =
        typeof data?.message === 'string' && data.message.trim()
          ? data.message
          : 'Login successful';
      toast.success(successMessage);

      if (role === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/cashierpage');
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
    <div className="min-h-[calc(100vh-72px)] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/10 bg-white/60 p-6 shadow-xl backdrop-blur dark:bg-slate-950/60">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <FiLock className="text-xl" />
          </div>
          <h1 className="text-2xl font-semibold">Sign in</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputCompo
            type="text"
            placeholder="Enter your username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            disabled={loading}
            icon={<FaRegUser className="text-slate-500 dark:text-slate-300" />}
          />

          <InputCompo
            type={passwordInputType}
            placeholder="Enter your password"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            disabled={loading}
            icon={<FiLock className="text-slate-500 dark:text-slate-300" />}
          />

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
              disabled={loading}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
              {showPassword ? 'Hide password' : 'Show password'}
            </button>

            
          </div>

          <ButtonCompo
            variant="blue"
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Logging in...' : 'Login'}
          </ButtonCompo>
        </form>
      </div>
    </div>
  )
}
