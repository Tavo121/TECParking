// src/views/admin/DashboardDashboardView.jsx
import StatCard from '../../components/admin/StatCard';
// Importa el resto de tus widgets aquí a medida que los construyas

export default function DashboardDashboardView() {
  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto">
      
      {/* Fila 1: KPIs (Tarjetas superiores) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Libres" value="5" subtext="62% del total" icon="🚘" color="emerald" />
        <StatCard title="Reservados" value="1" subtext="25% del total" icon="⏱️" color="amber" />
        <StatCard title="Ocupados" value="3" subtext="12% del total" icon="🚗" color="red" />
        <StatCard title="Total accesos hoy" value="48" subtext="↑ 12% vs ayer" icon="🚪" color="indigo" />
      </div>

      {/* Fila 2: Mapa, Reservas y Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget del Mapa (Ocupa 1 columna) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Mapa del parqueo</h3>
          {/* Aquí inyectas tu componente MiniMapWidget */}
          <div className="flex-1 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">
            [Componente MiniMapWidget]
          </div>
        </div>

        {/* Widget Reservas Activas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-800">Reservas activas</h3>
            <button className="text-xs text-blue-600 font-semibold hover:underline">Ver todas</button>
          </div>
           {/* Aquí inyectas tu componente ActiveReservationsList */}
           <div className="flex-1 bg-slate-50 rounded-lg p-4 text-center text-slate-400 text-sm">
            [Lista de Reservas Activas]
          </div>
        </div>

        {/* Widget Alertas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-800">Alertas recientes</h3>
            <button className="text-xs text-blue-600 font-semibold hover:underline">Ver todas</button>
          </div>
           {/* Aquí inyectas tu componente AlertsList */}
           <div className="flex-1 bg-slate-50 rounded-lg p-4 text-center text-slate-400 text-sm">
            [Lista de Alertas de hardware]
          </div>
        </div>
      </div>

      {/* Fila 3: Gráficas y Tablas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-2">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Últimos accesos (RFID)</h3>
            {/* Aquí inyectas tu tabla RFIDTableWidget */}
            <div className="h-48 bg-slate-50 rounded-lg p-4 text-center text-slate-400 text-sm flex items-center justify-center">
              [Tabla de eventos RFID del ESP32]
            </div>
         </div>
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Distribución de espacios</h3>
            {/* Aquí inyectas tu DonutChartWidget */}
            <div className="h-48 bg-slate-50 rounded-lg p-4 text-center text-slate-400 text-sm flex items-center justify-center">
              [Gráfico de Dona]
            </div>
         </div>
      </div>
    </div>
  );
}