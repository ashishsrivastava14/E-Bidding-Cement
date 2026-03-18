import { ShoppingCart, Users, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KpiCard from '../../components/KpiCard';
import { orderTrendData } from '../../data/mockData';

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading font-bold text-2xl text-yellow">Customer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Orders Placed" value="15" icon={ShoppingCart} color="yellow" />
        <KpiCard title="Bids Received" value="42" icon={Users} color="orange" />
        <KpiCard title="Orders Allocated" value="8" icon={CheckCircle} color="green" />
        <KpiCard title="Pending" value="3" icon={Clock} color="red" />
      </div>

      <div className="bg-dark-card border border-dark-border rounded-lg p-4">
        <h2 className="font-heading font-bold text-lg text-yellow mb-4">Order Trend (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={orderTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-chart-grid)" />
            <XAxis dataKey="day" stroke="var(--color-chart-axis)" fontSize={12} />
            <YAxis stroke="var(--color-chart-axis)" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
            <Line type="monotone" dataKey="orders" stroke="#F5C518" strokeWidth={2} dot={{ fill: '#F5C518' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
