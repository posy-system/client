import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function RequireRole({ allowedRoles }) {
  const token = localStorage.getItem('token');
  const userRaw = localStorage.getItem('user');

  let role = '';
  try {
    const user = userRaw ? JSON.parse(userRaw) : null;
    role = (user?.role || '').toLowerCase();
  } catch {
    role = '';
  }

  const isAllowed = Boolean(token) && Array.isArray(allowedRoles) && allowedRoles.includes(role);

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
