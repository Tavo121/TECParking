import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Leer cookies
    const cookies = document.cookie.split(';');
    let savedRole = null;
    let savedUser = null;

    cookies.forEach((cookie) => {
      const parts = cookie.trim().split('=');
      const name = parts[0];
      const value = parts.slice(1).join('=');
      if (name === 'role') savedRole = value;
      if (name === 'user' && value) {
        try {
          savedUser = JSON.parse(decodeURIComponent(value));
        } catch(e) {
        }
      }
    });

    if (savedRole && savedUser) {
      setRole(savedRole);
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

    const logout = async () => {
      try {
        await logoutUser();
      } catch(e) {
      }
      // Limpiar cookies locales (vital para evitar auto-login automático)
      document.cookie = 'token=; Max-Age=-99999999; path=/';
      document.cookie = 'role=; Max-Age=-99999999; path=/';
      document.cookie = 'user=; Max-Age=-99999999; path=/';
      
      setUser(null);
      setRole(null);
      window.location.href = '/login';
    }

  if (loading) return null; // Avoid flicker

  return (
    <Router>
      <Routes>
        {/* Cualquier otra ruta redirige basado en si hay sesión */}
        <Route 
          path="*" 
          element={<Navigate to={user ? `/${role}` : "/login"} replace />} 
        />
      </Routes>
    </Router>
  );
}

