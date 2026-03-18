import { useState } from 'react';
import toast from 'react-hot-toast';
import { Download, FileSpreadsheet, FileText, Search } from 'lucide-react';
import KpiCard from '../../components/KpiCard';
import { bidHistory, depotList } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';

export default function Reports() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [depot, setDepot] = useState('');
  const [tenderId, setTenderId] = useState('');

  const filtered = bidHistory.filter(b => {
    if (depot && b.depot !== depot) return false;
    if (tenderId && !b.id.includes(tenderId)) return false;
    return true;
  });

  const totalOrders = filtered.length;
  const avgBidCount = (filtered.length / 3).toFixed(1);
  const totalL1Savings = filtered.reduce((sum, b) => sum + Math.max(0, b.freight - b.bidAmount), 0);

  return (
    <div className="space-y-4">
      <h1 className="font-heading font-bold text-2xl text-yellow">Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Total Orders" value={totalOrders} icon={FileText} color="yellow" />
        <KpiCard title="L1 Savings vs Base Freight" value={`₹${totalL1Savings.toLocaleString()}`} icon={Download} color="green" />
        <KpiCard title="Average Bid Count" value={avgBidCount} icon={FileSpreadsheet} color="orange" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs text-theme-subtle mb-1">Date From</label>
          <input type="date" className="bg-dark border border-dark-border text-theme text-sm py-2 px-3 rounded outline-none" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-theme-subtle mb-1">Date To</label>
          <input type="date" className="bg-dark border border-dark-border text-theme text-sm py-2 px-3 rounded outline-none" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-theme-subtle mb-1">Depot</label>
          <select className="bg-dark border border-dark-border text-theme text-sm py-2 px-3 rounded outline-none" value={depot} onChange={e => setDepot(e.target.value)}>
            <option value="">All</option>
            {depotList.map(d => <option key={d.code} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-theme-subtle mb-1">Tender ID</label>
          <div className="flex items-center bg-dark border border-dark-border rounded px-2">
            <input className="bg-transparent text-theme text-sm py-2 w-32 outline-none" placeholder="Search..." value={tenderId} onChange={e => setTenderId(e.target.value)} />
            <Search size={14} className="text-theme-subtle" />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toast.success('Excel report downloaded!')} className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded text-xs font-bold hover:bg-green-700">
            <FileSpreadsheet size={14} /> Export Excel
          </button>
          <button onClick={() => toast.success('PDF report downloaded!')} className="flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded text-xs font-bold hover:bg-red-700">
            <FileText size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-theme">
          <thead>
            <tr className="bg-yellow text-black">
              {['ID', 'Order ID', 'Depot', 'Destination', 'Bid Amount', 'Freight', 'Status', 'Date', 'Rank'].map(h => (
                <th key={h} className="text-left py-2 px-3 text-xs font-heading font-semibold">{h}</th>
              ))}
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
