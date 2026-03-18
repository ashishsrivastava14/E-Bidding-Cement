import { FileText, BarChart2, Users, Clock } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import KpiCard from '../../components/KpiCard';
import { bidsPerDepot, orderTypeDistribution, recentAdminActivity, mockAdminStats } from '../../data/mockData';

const PIE_COLORS = ['#F5C518', '#666'];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading font-bold text-2xl text-yellow">Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Active Tenders" value={mockAdminStats.totalActiveTenders} icon={FileText} color="yellow" />
        <KpiCard title="Total Bids Today" value={mockAdminStats.totalBidsToday} icon={BarChart2} color="orange" />
        <KpiCard title="Vendors Online" value={mockAdminStats.vendorsOnline} icon={Users} color="green" />
        <KpiCard title="Tenders Closing Soon" value={mockAdminStats.tendersClosingSoon} icon={Clock} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-1 bg-dark-card border border-dark-border rounded-lg p-4">
          <h2 className="font-heading font-bold text-lg text-yellow mb-4">Bids per Depot</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bidsPerDepot} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-chart-grid)" />
              <XAxis type="number" stroke="var(--color-chart-axis)" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="var(--color-chart-axis)" fontSize={10} width={100} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
              <Bar dataKey="bids" fill="#F5C518" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <h2 className="font-heading font-bold text-lg text-yellow mb-4">Order Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={orderTypeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {orderTypeDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <h2 className="font-heading font-bold text-lg text-yellow mb-4">Recent Activity</h2>
          <div className="space-y-3 max-h-[320px] overflow-y-auto">
            {recentAdminActivity.map((a, i) => (
              <div key={i} className="flex gap-3 items-start text-xs border-b border-dark-border pb-2">
                <span className="text-theme-faint shrink-0 w-16">{a.time}</span>
                <span className="text-theme-muted">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
