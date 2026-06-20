import { useEffect, useState } from 'react';

// 1. WIDGET: Mini Mapa del Parqueo Administrativo
export function MiniMapWidget() {
  const matrix = [
    { id: 'A1', status: 'ocupado' },
    { id: 'A2', status: 'libre' },
    { id: 'A3', status: 'libre' },
    { id: 'A4', status: 'ocupado' },
    { id: 'A5', status: 'ocupado' },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
      {matrix.map((slot) => (
        <div 
          key={slot.id} 
          className={`h-24 rounded-lg flex flex-col items-center justify-center text-xs font-bold border transition-all ${
            slot.status === 'ocupado' ? 'bg-red-500 border-red-600 text-white' : 'bg-white text-slate-700 border-slate-300'
          }`}
        >
          <span>{slot.id}</span>
          {slot.status === 'ocupado' && <span className="text-base mt-1">🚗</span>}
        </div>
      ))}
    </div>
  );
}

// 2. WIDGET: Lista de Reservas Activas del Sistema
export function ActiveReservationsList() {
  const sampleReservations = [
    { id: '05', user: 'Juan Pérez', time: '10:30 AM', remaining: '02:18', color: 'border-amber-500 bg-amber-50' },
    { id: '02', user: 'María Gómez', time: '10:32 AM', remaining: '03:45', color: 'border-emerald-500 bg-emerald-50' },
    { id: '11', user: 'Carlos Ruiz', time: '10:33 AM', remaining: '04:50', color: 'border-emerald-500 bg-emerald-50' },
  ];

  return (
    <div className="space-y-3">
      {sampleReservations.map((res, i) => (
        <div key={i} className={`flex items-center justify-between p-3 border-l-4 rounded-r-xl border border-slate-200 shadow-sm bg-white`}>
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">{res.id}</span>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Reservado por: {res.user}</h4>
              <p className="text-[10px] text-slate-400 font-medium">Hasta {res.time}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-bold text-slate-400 block uppercase">Expira en</span>
            <span className="text-xs font-mono font-bold text-amber-600">{res.remaining}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// 3. WIDGET: Alertas de Sensores e Infraestructura
export function AlertsList() {
  const alerts = [
    { type: 'critical', text: 'Parqueo casi lleno (Ocupación: 90%)', time: 'Hace 5 min', icon: '⚠️', bg: 'bg-red-50 text-red-700 border-red-100' },
    { type: 'warning', text: 'Reserva por expirar (Espacio 05)', time: 'Hace 7 min', icon: '⏱️', bg: 'bg-amber-50 text-amber-700 border-amber-100' },
    { type: 'info', text: 'Nuevo acceso verificado (Tarjeta ID: 4A 7B)', time: 'Hace 10 min', icon: '🔵', bg: 'bg-blue-50 text-blue-700 border-blue-100' },
  ];

  return (
    <div className="space-y-2.5">
      {alerts.map((al, i) => (
        <div key={i} className={`flex items-start space-x-3 p-2.5 border rounded-xl ${al.bg} text-xs`}>
          <span className="text-sm">{al.icon}</span>
          <div className="flex-1">
            <p className="font-semibold">{al.text}</p>
            <span className="text-[10px] opacity-60 block mt-0.5">{al.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// 4. WIDGET: Tabla de Lecturas de Tarjetas RFID (ESP32 Log)
export function RFIDTableWidget() {
  const logs = [
    { time: '10:25 AM', id: '4A 7B 2C 9D', res: 'Permitido', text: 'bg-emerald-100 text-emerald-800', dir: '→ Entrada' },
    { time: '10:22 AM', id: '8F 1E 3D 7A', res: 'Permitido', text: 'bg-emerald-100 text-emerald-800', dir: '→ Entrada' },
    { time: '10:20 AM', id: '9C 4B 6E 11', res: 'Denegado', text: 'bg-red-100 text-red-800', dir: '❌ Bloqueado' },
    { time: '10:18 AM', id: '2D 6F 9A 3B', res: 'Permitido', text: 'bg-emerald-100 text-emerald-800', dir: '← Satida' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600">
        <thead className="text-[10px] text-slate-400 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="py-2 px-3">Hora</th>
            <th className="py-2 px-3">Tarjeta ID</th>
            <th className="py-2 px-3">Resultado</th>
            <th className="py-2 px-3">Acceso</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium">
          {logs.map((log, i) => (
            <tr key={i} className="hover:bg-slate-50/80">
              <td className="py-2.5 px-3 text-slate-900 font-bold">{log.time}</td>
              <td className="py-2.5 px-3 font-mono text-slate-500">{log.id}</td>
              <td className="py-2.5 px-3">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${log.text}`}>{log.res}</span>
              </td>
              <td className="py-2.5 px-3 font-semibold text-slate-700">{log.dir}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}