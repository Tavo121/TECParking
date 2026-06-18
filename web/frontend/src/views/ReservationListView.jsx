import { useState } from 'react';

export default function ReservationsListView({ activeReservation, countdown, formatTime, onCancel, onViewMap }) {
  const [activeTab, setActiveTab] = useState('activas');

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl2 shadow-soft border border-border space-y-6">
      <h2 className="text-xl font-bold text-foreground">Mis reservas</h2>

      {/* Sub-tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button 
          onClick={() => setActiveTab('activas')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'activas' ? 'bg-white shadow-sm text-foreground' : 'text-muted'}`}
        >
          Activas
        </button>
        <button 
          onClick={() => setActiveTab('historial')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${activeTab === 'historial' ? 'bg-white shadow-sm text-foreground' : 'text-muted'}`}
        >
          Historial
        </button>
      </div>

      {activeTab === 'activas' ? (
        <div className="space-y-6">
          {activeReservation ? (
            <div className="border border-border rounded-xl p-5 space-y-4 shadow-sm bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground text-lg">Espacio {activeReservation.spaceId}</h3>
                  <p className="text-xs text-muted">Nivel 1 — Estándar</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-muted block">Expira en</span>
                  <span className="text-lg font-black text-primary font-mono">{formatTime(countdown)}</span>
                </div>
              </div>

              <button 
                onClick={onViewMap}
                className="w-full py-2.5 border border-primary text-primary font-semibold text-sm rounded-xl hover:bg-cyan-50/50 transition text-center block"
              >
                Ver en el mapa
              </button>
            </div>
          ) : (
            <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl text-muted text-sm">
              No tienes ninguna reserva en curso en este momento.
            </div>
          )}

          {/* Próximas reservas fijas del Mockup */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground">Próximas reservas en agenda</h4>
            <div className="border border-border rounded-xl p-4 space-y-3 bg-slate-50/50">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-bold text-foreground block">Espacio A2</span>
                  <span className="text-xs text-muted">Hoy — 3:00pm</span>
                </div>
                <button 
                  onClick={() => alert("Cancelación de reserva futura")}
                  className="text-xs font-bold text-red-500 hover:text-red-700"
                >
                  Cancelar reserva
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-sm text-muted">
          <div className="p-3 border border-border rounded-lg flex justify-between">
            <span>Espacio A6 (15 de Junio)</span>
            <span className="text-emerald-600 font-semibold">Completado</span>
          </div>
          <div className="p-3 border border-border rounded-lg flex justify-between">
            <span>Espacio A3 (12 de Junio)</span>
            <span className="text-red-500 font-semibold">Expirado</span>
          </div>
        </div>
      )}
    </div>
  );
}