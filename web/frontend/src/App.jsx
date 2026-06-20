import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from './views/auth/LoginView';
import AdminLayout from './views/admin/AdminLayout';
import DashboardDashboardView from './views/admin/DashboardDashboardView';
import UserMobileLayout from './views/user/UserMobileLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pantalla de autenticación */}
        <Route path="/login" element={<LoginView />} />
        
        {/* Panel de Control para el Administrador (PC/Escritorio) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardDashboardView />} />
        </Route>

        {/* Aplicación Móvil para el Usuario Común (Smartphone/PC) */}
        <Route path="/user" element={<UserMobileLayout />} />

        {/* Redirección por defecto si no hay sesión activa */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}