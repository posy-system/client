import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function decodeJwtPayload(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;

  try {
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4 || 4)) % 4, '=');
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function RequireRole({ allowedRoles }) {
  const token = localStorage.getItem('token');
  const payload = decodeJwtPayload(token);

  const tokenExpMs = typeof payload?.exp === 'number' ? payload.exp * 1000 : null;
  const isExpired = typeof tokenExpMs === 'number' ? Date.now() >= tokenExpMs : false;

  // Prefer role from JWT payload (recommended). Fallback to localStorage user for older tokens.
  let role = (payload?.role || payload?.user?.role || '').toLowerCase();
  if (!role) {
    try {
      const userRaw = localStorage.getItem('user');
      const user = userRaw ? JSON.parse(userRaw) : null;
      role = (user?.role || '').toLowerCase();
    } catch {
      role = '';
    }
  }

  const isAllowed = Boolean(token) && !isExpired && Array.isArray(allowedRoles) && allowedRoles.includes(role);

  if (!isAllowed) {
    if (isExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
