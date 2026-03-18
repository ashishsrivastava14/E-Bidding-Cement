export default function KpiCard({ title, value, icon: Icon, color = 'yellow' }) {
  const borderColor = color === 'green' ? 'border-green-500' : color === 'red' ? 'border-red-500' : color === 'orange' ? 'border-orange-500' : 'border-yellow';
  const textColor = color === 'green' ? 'text-green-400' : color === 'red' ? 'text-red-400' : color === 'orange' ? 'text-orange-400' : 'text-yellow';

  return (
    <div className={`bg-dark-card border-l-4 ${borderColor} rounded-lg p-4 flex items-center gap-4`}>
      {Icon && (
        <div className={`p-2 rounded-lg bg-dark ${textColor}`}>
          <Icon size={24} />
        </div>
      )}
      <div>
        <p className="text-xs text-theme-subtle uppercase tracking-wider">{title}</p>
        <p className={`text-2xl font-heading font-bold ${textColor}`}>{value}</p>
      </div>
    </div>
  );
}
