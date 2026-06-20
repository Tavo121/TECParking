import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardDashboardView from './DashboardDashboardView';
import MapView from '../MapView'; // Reutilización limpia del plano de parqueo
import UsersAdminView from './UsersAdminView'; // Componente de gestión añadido

export default function AdminLayout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // Control dinámico de las pestañas

  // Estado compartido simulado para el mapa de administración
  const [spaces] = useState([
    { id: 'A1', status: 'ocupado', isPhysicalSensor: false },
    { id: 'A7', status: 'libre', isPhysicalSensor: true },
    { id: 'A6', status: 'libre', isPhysicalSensor: true },
    { id: 'A5', status: 'ocupado', isPhysicalSensor: false },
    { id: 'A4', status: 'libre', isPhysicalSensor: false },
    { id: 'A3', status: 'libre', isPhysicalSensor: true },
    { id: 'A2', status: 'ocupado', isPhysicalSensor: false },
    { id: 'A8', status: 'ocupado', isPhysicalSensor: false },
  ]);

  const handleLogout = () => {
    document.cookie = 'user=; Max-Age=-99999999; path=/';
    document.cookie = 'role=; Max-Age=-99999999; path=/';
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden">
      {/* Menú Lateral de Operaciones (Sidebar) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="p-6 border-b border-slate-100">
            <h1 className="text-xl font-black tracking-tight text-slate-900">PARK-ON</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Parking Intelligence</p>
          </div>
          
          <nav className="p-4 space-y-1">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              <div className="flex items-center space-x-3"><span>📊</span><span>Dashboard</span></div>
            </button>
            <button onClick={() => setActiveTab('mapa')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${activeTab === 'mapa' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              <div className="flex items-center space-x-3"><span>🗺️</span><span>Mapa del parqueo</span></div>
            </button>
            <button onClick={() => setActiveTab('usuarios')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${activeTab === 'usuarios' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              <div className="flex items-center space-x-3"><span>👥</span><span>Usuarios</span></div>
            </button>
            <button onClick={() => alert("Mapeo de Alertas del ESP32 en desarrollo")} className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">
              <div className="flex items-center space-x-3"><span>⚠️</span><span>Alertas</span></div>
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">4</span>
            </button>
          </nav>
        </div>
        
        {/* Monitoreo del Enlace del ESP32 Hardware */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Estado de Red</div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-800">ESP32 LINK ONLINE</span>
          </div>
          <button 
            onClick={handleLogout} 
            className="w-full mt-4 text-center bg-red-50 border border-red-200 text-red-600 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition"
          >
            Salir del Sistema
          </button>
        </div>
      </aside>

      {/* Contenedor de Trabajo Variable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center flex-shrink-0 shadow-sm">
          <div>
            <h2 className="text-lg font-black text-slate-900 capitalize">{activeTab}</h2>
            <p className="text-xs text-slate-400 font-medium">Panel de control de infraestructura centralizado</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">ADMIN CONTROL</span>
          </div>
        </header>
        
        {/* Inyección Dinámica Reactiva de Subvistas */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && <DashboardDashboardView />}
          {activeTab === 'mapa' && (
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <MapView spaces={spaces} selectedSpace={null} onSelectSpace={() => {}} onNavigateToReserve={() => {}} />
            </div>
          )}
          {activeTab === 'usuarios' && <UsersAdminView />}
        </div>
      </div>
    </div>
  );
}