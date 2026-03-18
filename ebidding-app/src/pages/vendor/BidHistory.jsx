import { useState } from 'react';
import toast from 'react-hot-toast';
import { Download, Search } from 'lucide-react';
import { bidHistory } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';

export default function BidHistory() {
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [search, setSearch] = useState('');

  const filtered = bidHistory.filter(b => {
    if (statusFilter && b.status !== statusFilter) return false;
    if (search && !b.orderId.includes(search) && !b.depot.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const exportCsv = () => {
    const header = 'ID,Order ID,Depot,Destination,Bid Amount,Freight,Status,Date,Rank\n';
    const rows = filtered.map(b => `${b.id},${b.orderId},${b.depot},${b.destination},${b.bidAmount},${b.freight},${b.status},${b.date},${b.rank}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bid_history.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully!');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-yellow">Bid History</h1>
        <button
          onClick={exportCsv}
          className="flex items-center gap-1 bg-yellow text-black px-4 py-2 rounded text-sm font-bold hover:bg-yellow-dark"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs text-theme-subtle mb-1">Status</label>
          <select
            className="bg-dark border border-dark-border text-theme text-sm py-2 px-3 rounded outline-none"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="WON">WON</option>
            <option value="LOST">LOST</option>
            <option value="ACTIVE">ACTIVE</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-theme-subtle mb-1">Date From</label>
          <input type="date" className="bg-dark border border-dark-border text-theme text-sm py-2 px-3 rounded outline-none" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-theme-subtle mb-1">Date To</label>
          <input type="date" className="bg-dark border border-dark-border text-theme text-sm py-2 px-3 rounded outline-none" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
        <div className="flex items-center bg-dark border border-dark-border rounded px-2">
          <input className="bg-transparent text-theme text-sm py-2 w-40 outline-none" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} />
          <Search size={14} className="text-theme-subtle" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-theme">
          <thead>
            <tr className="bg-yellow text-black">
              <th className="text-left py-2 px-3 text-xs font-heading font-semibold">ID</th>
              <th className="text-left py-2 px-3 text-xs font-heading font-semibold">Order ID</th>
              <th className="text-left py-2 px-3 text-xs font-heading font-semibold">Depot</th>
              <th className="text-left py-2 px-3 text-xs font-heading font-semibold">Destination</th>
              <th className="text-left py-2 px-3 text-xs font-heading font-semibold">Bid Amount</th>
              <th className="text-left py-2 px-3 text-xs font-heading font-semibold">Freight</th>
              <th className="text-left py-2 px-3 text-xs font-heading font-semibold">Status</th>
              <th className="text-left py-2 px-3 text-xs font-heading font-semibold">Date</th>
              <th className="text-left py-2 px-3 text-xs font-heading font-semibold">Rank</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((bid, idx) => (
              <tr key={bid.id} className={idx % 2 === 0 ? 'bg-dark-card' : 'bg-dark-row'}>
                <td className="py-2 px-3 text-xs">{bid.id}</td>
                <td className="py-2 px-3 text-xs">{bid.orderId}</td>
                <td className="py-2 px-3 text-xs">{bid.depot}</td>
                <td className="py-2 px-3 text-xs">{bid.destination}</td>
                <td className="py-2 px-3 text-xs">₹{bid.bidAmount}</td>
                <td className="py-2 px-3 text-xs">₹{bid.freight}</td>
                <td className="py-2 px-3"><StatusBadge status={bid.status} /></td>
                <td className="py-2 px-3 text-xs">{bid.date}</td>
                <td className="py-2 px-3 text-xs">{bid.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
