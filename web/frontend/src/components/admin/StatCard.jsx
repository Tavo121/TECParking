export default function StatCard({ title, value, subtext, icon, color }) {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    indigo: 'bg-indigo-50 text-indigo-600'
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <div className="flex items-baseline space-x-2">
          <h4 className="text-2xl font-black text-slate-800">{value}</h4>
          <span className="text-sm font-semibold text-slate-500">{title}</span>
        </div>
        <p className="text-xs font-medium text-slate-400 mt-0.5">{subtext}</p>
      </div>
    </div>
  );
}