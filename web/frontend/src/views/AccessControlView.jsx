export default function AccessControlView({ activeReservation, countdown, formatTime, onCancel }) {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl2 shadow-soft border border-border text-center space-y-6">
      <h2 className="text-xl font-bold text-foreground border-b border-border pb-4">Acceso al parqueo</h2>

      {/* Interfaz de proximidad RFID */}
      <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl animate-pulse">
          📇
        </div>
        <div>
          <h3 className="font-bold text-foreground">Acerca tu tarjeta al RFID</h3>
          <p className="text-sm text-muted">para abrir la barrera servo del parqueo</p>
        </div>
        <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Tarjeta vinculada válida
        </span>
      </div>

      {/* Estado de Reserva Asociada */}
      {activeReservation ? (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center p-4 bg-slate-50 border border-border rounded-xl">
            <span className="text-sm font-semibold text-foreground">Espacio reservado</span>
            <span className="px-3 py-1 bg-accent text-white font-bold rounded-lg text-sm">{activeReservation.spaceId}</span>
          </div>

          <div className="p-6 border border-border rounded-xl space-y-2 bg-gradient-to-b from-white to-slate-50">
            <span className="text-xs font-bold text-muted uppercase tracking-wider block">Tiempo límite de llegada</span>
            <div className="text-4xl font-black text-primary font-mono">{formatTime(countdown)}</div>
            
            {/* Barra de Progreso */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-3">
              <div 
                className="bg-primary h-full transition-all duration-1000" 
                style={{ width: `${(countdown / 300) * 100}%` }}
              ></div>
            </div>
          </div>

          <button 
            onClick={onCancel}
            className="text-sm font-semibold text-red-500 hover:text-red-700 transition"
          >
            Cancelar mi reserva actual
          </button>
        </div>
      ) : (
        <div className="p-4 bg-slate-50 border border-border rounded-xl text-muted text-sm font-medium">
          No hay espacios reservados vinculados a tu cuenta
        </div>
      )}
    </div>
  );
}