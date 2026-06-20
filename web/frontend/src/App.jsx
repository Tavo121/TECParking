import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from './views/auth/LoginView';
import AdminLayout from './views/admin/AdminLayout';
import UserPageLayout from './views/user/UserPageLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Portal de entrada */}
        <Route path="/login" element={<LoginView />} />
        
        {/* Flujo Administrativo Centralizado (PC) */}
        <Route path="/admin" element={<AdminLayout />} />

        {/* Flujo Conductores Formato Web Expansivo */}
        <Route path="/user" element={<UserPageLayout />} />

        {/* Captura de rutas huérfanas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}