import { useState, useEffect } from 'react';
import MapView from './MapView';
import ConfigureReservation from './ConfigureReservation';
import AccessControlView from './AccessControlView';
import ReservationsListView from './ReservationListView';

export default function UserMobileLayout() {
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

  const [activeTab, setActiveTab] = useState('mapa');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [activeReservation, setActiveReservation] = useState(null);
  const [countdown, setCountdown] = useState(300);

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

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 sm:p-4">
      {/* Contenedor que emula un dispositivo móvil */}
      <div className="w-full max-w-md bg-background min-h-screen sm:min-h-[850px] sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col relative">
        <header className="bg-slate-900 text-white p-4 text-center font-bold text-base tracking-wide flex-shrink-0">
          Parqueo Móvil
        </header>

        <div className="flex-1 p-4 pb-24 overflow-y-auto">
          {isConfiguring ? (
            <ConfigureReservation 
              space={selectedSpace} 
              onConfirm={handleConfirmReservation} 
              onCancel={() => setIsConfiguring(false)} 
            />
          ) : (
            <>
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
                <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold">U</div>
                  <h3 className="text-lg font-bold text-slate-800">Angelo</h3>
                  <p className="text-xs text-slate-400 mb-4">Estudiante - Computación</p>
                  <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono border border-slate-200 text-left space-y-1">
                    <div><span className="text-slate-400">UID RFID:</span> <span className="font-bold text-slate-700">04:AF:89:2C</span></div>
                    <div><span className="text-slate-400">Carné:</span> <span className="font-bold text-slate-700">20261102</span></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Tab Bar inferior móvil */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 shadow-lg z-40">
          <button onClick={() => { setIsConfiguring(false); setActiveTab('mapa'); }} className="flex flex-col items-center flex-1">
            <span className={`text-lg ${activeTab === 'mapa' ? 'opacity-100' : 'opacity-40'}`}>📍</span>
            <span className={`text-[10px] ${activeTab === 'mapa' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>Inicio</span>
          </button>
          <button onClick={() => { setIsConfiguring(false); setActiveTab('acceso'); }} className="flex flex-col items-center flex-1">
            <span className={`text-lg ${activeTab === 'acceso' ? 'opacity-100' : 'opacity-40'}`}>🔒</span>
            <span className={`text-[10px] ${activeTab === 'acceso' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>Acceso</span>
          </button>
          <button onClick={() => { setIsConfiguring(false); setActiveTab('reservas'); }} className="flex flex-col items-center flex-1">
            <span className={`text-lg ${activeTab === 'reservas' ? 'opacity-100' : 'opacity-40'}`}>📅</span>
            <span className={`text-[10px] ${activeTab === 'reservas' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>Reservas</span>
          </button>
          <button onClick={() => { setIsConfiguring(false); setActiveTab('perfil'); }} className="flex flex-col items-center flex-1">
            <span className={`text-lg ${activeTab === 'perfil' ? 'opacity-100' : 'opacity-40'}`}>👤</span>
            <span className={`text-[10px] ${activeTab === 'perfil' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>Perfil</span>
          </button>
        </nav>
      </div>
    </div>
  );
}