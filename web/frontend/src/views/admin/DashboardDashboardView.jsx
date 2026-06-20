import StatCard from '../../components/admin/StatCard';
import { MiniMapWidget, ActiveReservationsList, AlertsList, RFIDTableWidget } from '../../components/admin/AdminWidgets';

export default function DashboardDashboardView() {
  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Fila 1: KPIs Superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Libres" value="5" subtext="62% del total" icon="🟢" color="emerald" />
        <StatCard title="Reservados" value="1" subtext="25% del total" icon="🟡" color="amber" />
        <StatCard title="Ocupados" value="3" subtext="62% del total" icon="🔴" color="red" />
        <StatCard title="Total accesos hoy" value="48" subtext="↑ 12% vs ayer" icon="⚡" color="indigo" />
      </div>

      {/* Fila 2: El Core del Sistema (Mapa Real, Reservas y Alertas) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mapa Real del Parqueo */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-slate-800">Mapa del parqueo</h3>
            <p className="text-[11px] text-slate-400">Distribución física actual en tiempo real</p>
          </div>
          <MiniMapWidget />
        </div>

        {/* Lista de Reservas Consolidadas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-slate-800">Reservas activas</h3>
            <button className="text-xs text-blue-600 font-semibold hover:underline">Ver todas</button>
          </div>
          <ActiveReservationsList />
        </div>

        {/* Alertas del Sistema */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-slate-800">Alertas recientes</h3>
            <button className="text-xs text-blue-600 font-semibold hover:underline">Ver todas</button>
          </div>
          <AlertsList />
        </div>

      </div>

      {/* Fila 3: Registros RFID provenientes del ESP32 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-1 lg:col-span-2">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Últimos accesos (RFID)</h3>
            <RFIDTableWidget />
         </div>
         
         {/* Gráfico de Distribución (Simulado con CSS Puro) */}
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-bold text-slate-800 mb-2">Distribución de espacios</h3>
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-32 h-32 rounded-full border-[16px] border-emerald-500 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-[16px] border-red-500 border-t-transparent border-r-transparent"></div>
                <div className="text-center">
                  <span className="text-xl font-black text-slate-800 block">12</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Espacios</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="text-xs text-blue-600 font-semibold hover:underline">Ver mapa completo</button>
            </div>
         </div>
      </div>

    </div>
  );
}