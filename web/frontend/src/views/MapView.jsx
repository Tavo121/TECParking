import { useState } from 'react';

export default function MapView({ spaces, selectedSpace, onSelectSpace, onNavigateToReserve }) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl2 shadow-soft border border-border">
        <h2 className="text-lg font-bold text-foreground mb-4 text-center md:text-left">
          Seleccione el espacio para reservar
        </h2>

        {/* Replicación de la maqueta física del Parqueo */}
        <div className="grid grid-cols-3 gap-4 border-2 border-border p-4 rounded-xl bg-slate-50 relative min-h-[350px]">
          
          {/* Columna Izquierda (A7, A6, etc.) */}
          <div className="flex flex-col justify-between space-y-4">
            {spaces.filter(s => ['A1', 'A7', 'A6', 'A5'].includes(s.id)).map(space => (
              <SlotCard key={space.id} space={space} isSelected={selectedSpace?.id === space.id} onClick={() => onSelectSpace(space)} />
            ))}
          </div>

          {/* Pasillo Central (Flechas de flujo de tránsito) */}
          <div className="flex flex-col justify-center items-center space-y-8 text-slate-400 font-bold">
            <div className="flex flex-col items-center">
              <span>↓</span>
              <div className="w-0.5 h-16 bg-slate-300"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-16 bg-slate-300"></div>
              <span>↑</span>
            </div>
          </div>

          {/* Columna Derecha (A4, A3, etc.) */}
          <div className="flex flex-col justify-between space-y-4">
            {spaces.filter(s => ['A4', 'A3', 'A2', 'A8'].includes(s.id)).map(space => (
              <SlotCard key={space.id} space={space} isSelected={selectedSpace?.id === space.id} onClick={() => onSelectSpace(space)} />
            ))}
          </div>
        </div>

        {/* Leyenda de Estados */}
        <div className="flex justify-center space-x-6 mt-6 text-sm font-medium">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-white border border-border"></span>
            <span className="text-muted">Libre</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-accent"></span>
            <span className="text-muted">Reservado</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-red-500"></span>
            <span className="text-muted">Ocupado</span>
          </div>
        </div>
      </div>

      {/* Panel de Acción Inferior Dinámico */}
      {selectedSpace ? (
        <div className="bg-white p-6 rounded-xl2 shadow-soft border border-border space-y-4 animate-fade-in">
          {selectedSpace.status === 'libre' ? (
            <>
              <button 
                onClick={onNavigateToReserve}
                className="w-full btn-primary flex justify-between items-center px-6 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition"
              >
                <span>Reservar espacio {selectedSpace.id}</span>
                <span>→</span>
              </button>
              <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-xl text-sm text-blue-700">
                <span className="font-bold">i</span>
                <p>Tu reserva se mantendrá por 5 minutos. Si no llegas a tiempo, el espacio se liberará automáticamente.</p>
              </div>
            </>
          ) : (
            <div className="p-4 bg-slate-100 text-slate-600 rounded-xl text-center font-medium">
              El espacio {selectedSpace.id} está actualmente <span className="font-bold text-red-500">{selectedSpace.status}</span>. Selecciona otro.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl2 border border-border text-center text-muted shadow-soft">
          No hay espacios seleccionados
        </div>
      )}
    </div>
  );
}

function SlotCard({ space, isSelected, onClick }) {
  const baseStyle = "h-20 w-full rounded-lg font-bold flex flex-col items-center justify-center border transition-all cursor-pointer relative overflow-hidden ";
  
  let statusStyle = "";
  if (space.status === 'ocupado') statusStyle = "bg-red-500 border-red-600 text-white";
  else if (space.status === 'reservado') statusStyle = "bg-accent border-amber-600 text-white";
  else statusStyle = isSelected ? "bg-cyan-50 border-primary text-primary ring-2 ring-primary/20" : "bg-white border-border text-foreground hover:border-slate-400";

  return (
    <div onClick={onClick} className={baseStyle + statusStyle}>
      {space.status === 'ocupado' ? (
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xs tracking-wider opacity-75">{space.id}</span>
          <span className="text-xl">🚗</span>
        </div>
      ) : (
        <span className="text-base">{space.id}</span>
      )}
      {space.isPhysicalSensor && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400 border border-white" title="Conectado al ESP32 hardware"></span>
      )}
    </div>
  );
}