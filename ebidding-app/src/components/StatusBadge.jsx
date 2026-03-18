export default function StatusBadge({ status }) {
  const config = {
    WON: 'bg-green-600 text-white',
    ACTIVE: 'bg-yellow text-black',
    LOST: 'bg-red-600 text-white',
    BIDDING: 'bg-yellow text-black',
    ALLOCATED: 'bg-green-600 text-white',
    PENDING: 'bg-gray-500 text-white',
    DRAFT: 'bg-gray-500 text-white',
    CLOSED: 'bg-red-600 text-white',
    Active: 'bg-green-600 text-white',
    Inactive: 'bg-gray-500 text-white',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${config[status] || 'bg-gray-500 text-white'}`}>
      {status}
    </span>
  );
}
