export default function UsersAdminView() {
  const usersList = [
    { name: 'Angelo', id: '20261102', card: '04:AF:89:2C', plate: 'BCN-890', role: 'Estudiante', state: 'Permitido' },
    { name: 'Juan Pérez', id: '20240912', card: '8F:1E:3D:7A', plate: 'CR-4521', role: 'Docente', state: 'Permitido' },
    { name: 'María Gómez', id: '20258810', card: '2D:6F:9A:3B', plate: 'SJV-102', role: 'Administrativo', state: 'Permitido' },
    { name: 'Carlos Ruiz', id: '20231145', card: '9C:4B:6E:11', plate: 'PE-9981', role: 'Estudiante', state: 'Suspendido' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-5xl mx-auto animate-fade-in">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Usuarios Registrados en el Sistema</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Control de credenciales RFID y permisos de acceso para la barrera</p>
        </div>
        <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition shadow-sm">
          + Registrar Nuevo Conductor
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="text-[10px] text-slate-400 uppercase bg-slate-50/80 border-b border-slate-200 font-bold">
            <tr>
              <th className="py-3 px-4">Nombre Completo</th>
              <th className="py-3 px-4">Carné / Identificación</th>
              <th className="py-3 px-4">UID Tarjeta RFID</th>
              <th className="py-3 px-4">Placa de Vehículo</th>
              <th className="py-3 px-4">Tipo de Usuario</th>
              <th className="py-3 px-4">Permiso Barrera</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {usersList.map((usr, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition">
                <td className="py-3.5 px-4 text-slate-900 font-bold">{usr.name}</td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{usr.id}</td>
                <td className="py-3.5 px-4 font-mono text-blue-600 font-semibold">{usr.card}</td>
                <td className="py-3.5 px-4 text-slate-700">{usr.plate}</td>
                <td className="py-3.5 px-4"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-semibold text-[10px]">{usr.role}</span></td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    usr.state === 'Permitido' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {usr.state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}