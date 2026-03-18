import { Building, CreditCard, DollarSign, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KpiCard from '../../components/KpiCard';
import { platformActivityData } from '../../data/mockData';

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading font-bold text-2xl text-yellow">Super Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Companies" value="5" icon={Building} color="yellow" />
        <KpiCard title="Active Subscriptions" value="4" icon={CreditCard} color="green" />
        <KpiCard title="Revenue This Month" value="₹1,84,996" icon={DollarSign} color="orange" />
        <KpiCard title="Total Bids Platform-wide" value="2,400" icon={BarChart3} color="yellow" />
      </div>

      <div className="bg-dark-card border border-dark-border rounded-lg p-4">
        <h2 className="font-heading font-bold text-lg text-yellow mb-4">Platform Activity Over Time</h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={platformActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff' }} />
            <Area type="monotone" dataKey="bids" stroke="#F5C518" fill="#F5C518" fillOpacity={0.15} strokeWidth={2} name="Total Bids" />
            <Area type="monotone" dataKey="companies" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} name="Active Companies" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
