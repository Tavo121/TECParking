import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapView from '../MapView';
import ConfigureReservation from './ConfigureReservation';
import AccessControlView from './AccessControlView';
import ReservationsListView from './ReservationListView';

export default function UserPageLayout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mapa'); // 'mapa', 'acceso', 'reservas', 'perfil'
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [activeReservation, setActiveReservation] = useState(null);
  const [countdown, setCountdown] = useState(300);

  const [spaces, setSpaces] = useState([
    { id: 'A1', status: 'ocupado', isPhysicalSensor: false },
    { id: 'A7', status: 'libre', isPhysicalSensor: true },
    { id: 'A6', status: 'libre', isPhysicalSensor: true },
    { id: 'A5', status: 'ocupado', isPhysicalSensor: false },
    { id: 'A4', status: 'libre', isPhysicalSensor: false },
    { id: 'A3', status: 'libre', isPhysicalSensor: true },
    { id: 'A2', status: 'ocupado', isPhysicalSensor: false },
    { id: 'A8', status: 'ocupado', isPhysicalSensor: false },
  ]);

  useEffect(() => {
    let timer;
    if (activeReservation && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0 && activeReservation) {
      setSpaces(prev => prev.map(s => s.id === activeReservation.spaceId ? { ...s, status: 'libre' } : s));
      setActiveReservation(null);
    }
    return () => clearInterval(timer);
  }, [activeReservation, countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirmReservation = (durationMinutes) => {
    setSpaces(prev => prev.map(s => s.id === selectedSpace.id ? { ...s, status: 'reservado' } : s));
    setActiveReservation({ spaceId: selectedSpace.id, duration: durationMinutes });
    setCountdown(300);
    setIsConfiguring(false);
    setSelectedSpace(null);
    setActiveTab('acceso');
  };

  const handleCancelReservation = () => {
    const targetId = activeReservation.spaceId;
    setSpaces(prev => prev.map(s => s.id === targetId ? { ...s, status: 'libre' } : s));
    setActiveReservation(null);
  };

  const handleLogout = () => {
    document.cookie = 'user=; Max-Age=-99999999; path=/';
    document.cookie = 'role=; Max-Age=-99999999; path=/';
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* Barra de Navegación de Página Completa */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-black text-slate-900 tracking-tight">TECParking</span>
          <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-blue-100">Portal Conductor</span>
        </div>
        
        {/* Pestañas de Navegación Web */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button onClick={() => { setIsConfiguring(false); setActiveTab('mapa'); }} className={`flex-1 sm:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'mapa' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>📍 Mapa</button>
          <button onClick={() => { setIsConfiguring(false); setActiveTab('acceso'); }} className={`flex-1 sm:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'acceso' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>🔒 Acceso RFID</button>
          <button onClick={() => { setIsConfiguring(false); setActiveTab('reservas'); }} className={`flex-1 sm:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'reservas' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>📅 Mis Reservas</button>
          <button onClick={() => { setIsConfiguring(false); setActiveTab('perfil'); }} className={`flex-1 sm:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'perfil' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>👤 Perfil</button>
        </div>

        {/* Control de Cierre de Sesión */}
        <button 
          onClick={handleLogout}
          className="w-full sm:w-auto px-4 py-2 border border-red-200 text-red-600 font-bold text-sm rounded-xl hover:bg-red-50 transition flex items-center justify-center space-x-2"
        >
          <span>Cerrar Sesión</span>
          <span>🚪</span>
        </button>
      </nav>

      {/* Área de Contenido Expansiva */}
      <main className="flex-1 p-6 max-w-6xl w-full mx-auto flex items-center justify-center">
        {isConfiguring ? (
          <ConfigureReservation 
            space={selectedSpace} 
            onConfirm={handleConfirmReservation} 
            onCancel={() => setIsConfiguring(false)} 
          />
        ) : (
          <div className="w-full">
            {activeTab === 'mapa' && (
              <MapView 
                spaces={spaces} 
                selectedSpace={selectedSpace} 
                onSelectSpace={setSelectedSpace} 
                onNavigateToReserve={() => setIsConfiguring(true)} 
              />
            )}
            {activeTab === 'acceso' && (
              <AccessControlView 
                activeReservation={activeReservation} 
                countdown={countdown} 
                formatTime={formatTime} 
                onCancel={handleCancelReservation} 
              />
            )}
            {activeTab === 'reservas' && (
              <ReservationsListView 
                activeReservation={activeReservation} 
                countdown={countdown} 
                formatTime={formatTime} 
                onCancel={handleCancelReservation}
                onViewMap={() => setActiveTab('mapa')}
              />
            )}
            {activeTab === 'perfil' && (
              <div className="bg-white p-8 rounded-xl2 border border-slate-200 text-center max-w-md mx-auto shadow-soft">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black">A</div>
                <h3 className="text-xl font-bold text-slate-800">Angelo</h3>
                <p className="text-sm text-slate-400 mb-6">Estudiante de Ingeniería en Computadores (TEC)</p>
                <div className="bg-slate-50 p-4 rounded-xl text-xs font-mono border border-slate-200 text-left space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">UID Tarjeta:</span> <span className="font-bold text-slate-700">04:AF:89:2C</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Carné Universitario:</span> <span className="font-bold text-slate-700">20261102</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Estado de Cuenta:</span> <span className="font-bold text-emerald-600">Activo</span></div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}