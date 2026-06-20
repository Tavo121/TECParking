import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from './views/auth/LoginView';
import AdminLayout from './views/admin/AdminLayout';
import DashboardDashboardView from './views/admin/DashboardDashboardView';
// Importa tu App móvil anterior como UserMobileApp o similar

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        
        {/* Rutas de Administrador (Desktop) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardDashboardView />} />
          {/* Añade sub-rutas /admin/map, /admin/users, etc. */}
        </Route>

        {/* Rutas de Usuario (Mobile) */}
        {/* <Route path="/user/*" element={<UserMobileApp />} /> */}

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}