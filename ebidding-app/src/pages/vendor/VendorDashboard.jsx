import { Gavel, TrendingUp, Trophy, Wallet } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import KpiCard from '../../components/KpiCard';
import StatusBadge from '../../components/StatusBadge';
import { biddingActivityData, bidHistory } from '../../data/mockData';

export default function VendorDashboard() {
  const recentBids = bidHistory.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-bold text-2xl text-yellow">Vendor Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Active Tenders" value="5" icon={Gavel} color="yellow" />
        <KpiCard title="My Active Bids" value="12" icon={TrendingUp} color="orange" />
        <KpiCard title="Won Bids (This Month)" value="23" icon={Trophy} color="green" />
        <KpiCard title="Total Savings" value="₹1,24,500" icon={Wallet} color="green" />
      </div>

      {/* Bidding Activity Chart */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-4">
        <h2 className="font-heading font-bold text-lg text-yellow mb-4">My Bidding Activity (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={biddingActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="day" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff' }} />
            <Legend />
            <Line type="monotone" dataKey="bids" stroke="#F5C518" strokeWidth={2} name="Total Bids" dot={{ fill: '#F5C518' }} />
            <Line type="monotone" dataKey="won" stroke="#22c55e" strokeWidth={2} name="Won" dot={{ fill: '#22c55e' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Bid Activity */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-4">
        <h2 className="font-heading font-bold text-lg text-yellow mb-4">Recent Bid Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border text-gray-400 text-xs">
                <th className="text-left py-2 px-3">Order ID</th>
                <th className="text-left py-2 px-3">Depot</th>
                <th className="text-left py-2 px-3">Bid Amount</th>
                <th className="text-left py-2 px-3">Rank</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-left py-2 px-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentBids.map(bid => (
                <tr key={bid.id} className="border-b border-dark-border hover:bg-dark-row">
                  <td className="py-2 px-3 text-xs">{bid.orderId}</td>
                  <td className="py-2 px-3 text-xs">{bid.depot}</td>
                  <td className="py-2 px-3 text-xs">₹{bid.bidAmount}</td>
                  <td className="py-2 px-3 text-xs">{bid.rank}</td>
                  <td className="py-2 px-3"><StatusBadge status={bid.status} /></td>
                  <td className="py-2 px-3 text-xs">{bid.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
