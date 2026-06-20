import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = 'user=; Max-Age=-99999999; path=/';
    document.cookie = 'role=; Max-Age=-99999999; path=/';
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Fijo */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="p-6 border-b border-slate-100">
            <h1 className="text-xl font-black tracking-tight">PARK-ON</h1>
            <p className="text-xs text-slate-400 font-medium">PARKING INTELLIGENCE</p>
          </div>
          <nav className="p-4 space-y-1">
            <NavItem to="/admin" icon="📊" label="Dashboard" active />
            <NavItem to="/admin/map" icon="🗺️" label="Mapa del parqueo" />
            <NavItem to="/admin/reservations" icon="📅" label="Reservas" />
            <NavItem to="/admin/access" icon="🚪" label="Accesos (RFID)" />
            <NavItem to="/admin/alerts" icon="⚠️" label="Alertas" badge="4" />
          </nav>
        </div>
        
        {/* Footer Sidebar (Estado ESP32) */}
        <div className="p-6 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500 uppercase mb-2">Estado del sistema</div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-emerald-700">OPERATIVO</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">Conectado a ESP32</div>
          <button onClick={handleLogout} className="mt-4 text-sm text-red-500 font-semibold hover:underline">Cerrar sesión</button>
        </div>
      </aside>

      {/* Contenido Principal Dinámico */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold">Dashboard</h2>
            <p className="text-xs text-slate-500">Resumen general del sistema</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-500">12 may 2025 • 10:30 AM</span>
            <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold border border-blue-100">
              <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs">AD</span>
              <span>Administrador</span>
            </div>
          </div>
        </header>
        
        {/* Aquí se inyectan las vistas hijas (El Dashboard en sí) */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, badge }) {
  return (
    <Link to="#" className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
      <div className="flex items-center space-x-3">
        <span className="text-lg opacity-80">{icon}</span>
        <span>{label}</span>
      </div>
      {badge && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{badge}</span>}
    </Link>
  );
}