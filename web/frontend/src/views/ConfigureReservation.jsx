import { useState } from 'react';

export default function ConfigureReservation({ space, onConfirm, onCancel }) {
  const [time, setTime] = useState(60); // Minutos por defecto

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl2 shadow-soft border border-border space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <h2 className="text-xl font-bold text-foreground">Reservar espacio</h2>
        <button onClick={onCancel} className="text-muted hover:text-foreground">Volver</button>
      </div>

      {/* Info Tarjeta */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
        <div className="text-xs text-amber-800 font-bold uppercase tracking-wide">Espacio Seleccionado</div>
        <div className="text-3xl font-extrabold text-amber-900 mt-1">{space.id}</div>
        <div className="text-sm text-amber-700 mt-2">Ubicación: Nivel 1 • Tipo: Estandár</div>
      </div>

      {/* Selector de Tiempos */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground block">Tiempo de reserva</label>
        <div className="grid grid-cols-3 gap-3">
          {[15, 30, 60].map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`py-3 px-4 rounded-xl border text-sm font-semibold transition ${
                time === t 
                  ? 'bg-primary border-primary text-white shadow-md' 
                  : 'bg-white border-border text-foreground hover:bg-slate-50'
              }`}
            >
              {t} min
            </button>
          ))}
        </div>
      </div>

      {/* Confirmación */}
      <button 
        onClick={() => onConfirm(time)}
        className="w-full btn-primary py-4 rounded-xl font-bold text-white bg-primary hover:bg-primary-hover shadow-lg transition"
      >
        Confirmar Reserva Espacio
      </button>

      {/* Información Crítica */}
      <div className="bg-slate-50 p-4 rounded-xl border border-border space-y-2 text-xs text-muted">
        <div className="font-bold text-foreground">Información importante:</div>
        <ul className="list-disc pl-4 space-y-1">
          <li>Dirígete al parqueo antes de que termine tu tiempo límite de abordaje (5 minutos).</li>
          <li>Tendrás 2 minutos adicionales al llegar para validar tu acceso con la tarjeta RFID física.</li>
        </ul>
      </div>
    </div>
  );
}