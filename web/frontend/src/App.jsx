import { useState, useEffect } from 'react';
import MapView from './views/MapView';
import ConfigureReservation from './views/ConfigureReservation';
import AccessControlView from './views/AccessControlView';
import ReservationsListView from './views/ReservationListView';

export default function App() {
  // Estado global de Parqueos (3 sensores físicos reales, los demás simulados)
  const [spaces, setSpaces] = useState([
    { id: 'A1', status: 'ocupado', isPhysicalSensor: false },
    { id: 'A7', status: 'libre', isPhysicalSensor: true }, // Físico ESP32
    { id: 'A6', status: 'libre', isPhysicalSensor: true }, // Físico ESP32
    { id: 'A5', status: 'ocupado', isPhysicalSensor: false },
    { id: 'A4', status: 'libre', isPhysicalSensor: false },
    { id: 'A3', status: 'libre', isPhysicalSensor: true }, // Físico ESP32
    { id: 'A2', status: 'ocupado', isPhysicalSensor: false },
    { id: 'A8', status: 'ocupado', isPhysicalSensor: false },
  ]);

  const [activeTab, setActiveTab] = useState('mapa'); // 'mapa', 'acceso', 'reservas', 'perfil'
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [activeReservation, setActiveReservation] = useState(null);
  
  // Temporizador de tolerancia (5 minutos = 300 segundos)
  const [countdown, setCountdown] = useState(300);

  // Simulación/Preparación para escuchar los sockets del backend/ESP32
  useEffect(() => {
    /* Cuando integres el backend, descomenta esto:
    const ws = new WebSocket('ws://localhost:3001');
    ws.onmessage = (event) => {
       const sensorData = JSON.parse(event.data);
       // actualizas el estado de los espacios físicos basados en el pin del ESP32
    };
    */
  }, []);

  // Manejo del Countdown de reserva activa
  useEffect(() => {
    let timer;
    if (activeReservation && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0 && activeReservation) {
      // Liberación automática al expirar el tiempo de llegada
      setSpaces(prev => prev.map(s => s.id === activeReservation.spaceId ? { ...s, status: 'libre' } : s));
      setActiveReservation(null);
      alert(`La reserva para el espacio ${activeReservation.spaceId} ha expirado.`);
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
    setCountdown(300); // 5 minutos de tiempo límite de llegada
    setIsConfiguring(false);
    setSelectedSpace(null);
    setActiveTab('acceso'); // Te manda al flujo de portón/RFID
  };

  const handleCancelReservation = () => {
    const targetId = activeReservation.spaceId;
    setSpaces(prev => prev.map(s => s.id === targetId ? { ...s, status: 'libre' } : s));
    setActiveReservation(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans antialiased">
      
      {/* BARRA LATERAL (Solo visible en PC/Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-6 justify-between border-r border-slate-800">
        <div className="space-y-8">
          <div className="text-xl font-black tracking-wider text-primary text-[#0ea5a4]">TECParking</div>
          <nav className="flex flex-col space-y-2">
            <NavButton label="Mapa Parqueo" icon="📍" active={activeTab === 'mapa'} onClick={() => setActiveTab('mapa')} />
            <NavButton label="Acceso Puerta" icon="🔑" active={activeTab === 'acceso'} onClick={() => setActiveTab('acceso')} />
            <NavButton label="Mis Reservas" icon="📅" active={activeTab === 'reservas'} onClick={() => setActiveTab('reservas')} />
            <NavButton label="Mi Perfil" icon="👤" active={activeTab === 'perfil'} onClick={() => setActiveTab('perfil')} />
          </nav>
        </div>
        <div className="text-xs text-slate-500 font-medium">v1.0.0 — ESP32 Smart Link</div>
      </aside>

      {/* HEADER MÓVIL (Solo visible en Teléfonos) */}
      <header className="md:hidden bg-slate-950 text-white p-4 text-center font-bold text-lg tracking-wide shadow-md">
        TECParking Móvil
      </header>

      {/* CONTENEDOR DE CONTENIDO PRINCIPAL ADAPTATIVO */}
      <main className="flex-1 p-4 md:p-10 pb-24 md:pb-10 overflow-y-auto flex justify-center items-start">
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
              <div className="bg-white p-6 rounded-xl2 border border-border w-full max-w-md text-center">
                <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-slate-500">U</div>
                <h3 className="text-lg font-bold text-foreground">Usuario Autorizado TEC</h3>
                <p className="text-sm text-muted mb-4">Carretera Central, Campus Cartago</p>
                <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono border border-border text-left">
                  UID RFID Asignado: <span className="font-bold text-primary">04:AF:89:2C:11:A0</span>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* MENÚ DE NAVEGACIÓN INFERIOR (Solo visible en Teléfonos) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border flex justify-around p-2 shadow-lg z-50">
        <MobileNavTab label="Mapa" icon="📍" active={activeTab === 'mapa'} onClick={() => { setIsConfiguring(false); setActiveTab('mapa'); }} />
        <MobileNavTab label="Acceso" icon="🔒" active={activeTab === 'acceso'} onClick={() => { setIsConfiguring(false); setActiveTab('acceso'); }} />
        <MobileNavTab label="Reservas" icon="📅" active={activeTab === 'reservas'} onClick={() => { setIsConfiguring(false); setActiveTab('reservas'); }} />
        <MobileNavTab label="Perfil" icon="👤" active={activeTab === 'perfil'} onClick={() => { setIsConfiguring(false); setActiveTab('perfil'); }} />
      </nav>

    </div>
  );
}

// Botón de navegación lateral (Desktop)
function NavButton({ label, icon, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
        active 
          ? 'bg-primary text-white font-semibold shadow-md bg-[#0ea5a4]' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// Botón de navegación inferior (Mobile)
function MobileNavTab({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center p-1 space-y-0.5">
      <span className={`text-xl ${active ? 'scale-110 transition' : 'opacity-60'}`}>{icon}</span>
      <span className={`text-2xl font-bold tracking-tight ${active ? 'text-primary font-bold text-[#0ea5a4]' : 'text-muted'}`}>
        {label}
      </span >
    </button>
  );
}