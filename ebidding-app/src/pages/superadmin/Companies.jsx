import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { mockCompanies } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';

export default function Companies() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', plan: 'Basic', users: '' });

  const handleAdd = () => {
    const newCompany = {
      id: `C${String(companies.length + 1).padStart(3, '0')}`,
      name: form.name,
      plan: form.plan,
      users: Number(form.users) || 1,
      status: 'Active',
      joined: '18/03/2026',
    };
    setCompanies(prev => [newCompany, ...prev]);
    setShowAdd(false);
    setForm({ name: '', plan: 'Basic', users: '' });
    toast.success('Company added successfully!');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-yellow">Companies</h1>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1 bg-yellow text-black px-4 py-2 rounded text-sm font-bold hover:bg-yellow-dark">
          <Plus size={14} /> Add Company
        </button>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-theme">
          <thead>
            <tr className="bg-yellow text-black">
              {['Company ID', 'Name', 'Plan', 'Users', 'Status', 'Joined'].map(h => (
                <th key={h} className="text-left py-2 px-3 text-xs font-heading font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {companies.map((c, idx) => (
              <tr key={c.id} className={idx % 2 === 0 ? 'bg-dark-card' : 'bg-dark-row'}>
                <td className="py-2 px-3 text-xs font-mono">{c.id}</td>
                <td className="py-2 px-3 text-xs font-medium">{c.name}</td>
                <td className="py-2 px-3 text-xs">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${c.plan === 'Enterprise' ? 'bg-yellow text-black' : c.plan === 'Professional' ? 'bg-blue-600 text-white' : 'bg-gray-500 text-white'}`}>
                    {c.plan}
                  </span>
                </td>
                <td className="py-2 px-3 text-xs">{c.users}</td>
                <td className="py-2 px-3"><StatusBadge status={c.status} /></td>
                <td className="py-2 px-3 text-xs">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal title="Add New Company" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-theme-subtle mb-1">Company Name</label>
            <input className="w-full bg-dark border border-dark-border text-theme text-sm py-2 px-3 rounded outline-none" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-theme-subtle mb-1">Plan</label>
            <select className="w-full bg-dark border border-dark-border text-theme text-sm py-2 px-3 rounded outline-none" value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })}>
              <option value="Basic">Basic</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-theme-subtle mb-1">Number of Users</label>
            <input type="number" className="w-full bg-dark border border-dark-border text-theme text-sm py-2 px-3 rounded outline-none" value={form.users} onChange={e => setForm({ ...form, users: e.target.value })} />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Cancel</button>
          <button onClick={handleAdd} className="px-4 py-2 bg-yellow text-black font-bold rounded text-sm hover:bg-yellow-dark">Add Company</button>
        </div>
      </Modal>
    </div>
  );
}
