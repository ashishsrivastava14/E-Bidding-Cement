import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, ToggleLeft, ToggleRight } from 'lucide-react';
import { mockVendors, depotList } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';

export default function VendorManagement() {
  const [vendors, setVendors] = useState(mockVendors);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', depots: [] });

  const handleAdd = () => {
    const newVendor = {
      id: `V${String(vendors.length + 1).padStart(3, '0')}`,
      name: form.name,
      contact: form.contact,
      depots: form.depots,
      status: 'Active',
      lastBid: '-',
    };
    setVendors(prev => [newVendor, ...prev]);
    setShowAdd(false);
    setForm({ name: '', contact: '', depots: [] });
    toast.success('Vendor added successfully!');
  };

  const toggleStatus = (id) => {
    setVendors(prev => prev.map(v => {
      if (v.id !== id) return v;
      const newStatus = v.status === 'Active' ? 'Inactive' : 'Active';
      toast.success(`${v.name} ${newStatus === 'Active' ? 'activated' : 'deactivated'}`);
      return { ...v, status: newStatus };
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-yellow">Vendor Management</h1>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1 bg-yellow text-black px-4 py-2 rounded text-sm font-bold hover:bg-yellow-dark">
          <Plus size={14} /> Add Vendor
        </button>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-yellow text-black">
              {['Vendor ID', 'Name', 'Contact', 'Depots Assigned', 'Status', 'Last Bid', 'Actions'].map(h => (
                <th key={h} className="text-left py-2 px-3 text-xs font-heading font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vendors.map((v, idx) => (
              <tr key={v.id} className={idx % 2 === 0 ? 'bg-dark-card' : 'bg-dark-row'}>
                <td className="py-2 px-3 text-xs font-mono">{v.id}</td>
                <td className="py-2 px-3 text-xs font-medium">{v.name}</td>
                <td className="py-2 px-3 text-xs">{v.contact}</td>
                <td className="py-2 px-3 text-xs">{v.depots.join(', ')}</td>
                <td className="py-2 px-3"><StatusBadge status={v.status} /></td>
                <td className="py-2 px-3 text-xs">{v.lastBid}</td>
                <td className="py-2 px-3">
                  <button onClick={() => toggleStatus(v.id)} className="text-gray-400 hover:text-yellow" title="Toggle Status">
                    {v.status === 'Active' ? <ToggleRight size={20} className="text-green-400" /> : <ToggleLeft size={20} className="text-gray-500" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Vendor Modal */}
      <Modal title="Add New Vendor" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Vendor Name</label>
            <input className="w-full bg-dark border border-dark-border text-white text-sm py-2 px-3 rounded outline-none" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Contact Number</label>
            <input className="w-full bg-dark border border-dark-border text-white text-sm py-2 px-3 rounded outline-none" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Assign Depots</label>
            <div className="bg-dark border border-dark-border rounded p-2 max-h-40 overflow-y-auto space-y-1">
              {depotList.map(d => (
                <label key={d.code} className="flex items-center gap-2 text-xs cursor-pointer hover:text-yellow">
                  <input
                    type="checkbox"
                    className="accent-yellow"
                    checked={form.depots.includes(d.name)}
                    onChange={e => {
                      setForm(prev => ({
                        ...prev,
                        depots: e.target.checked ? [...prev.depots, d.name] : prev.depots.filter(n => n !== d.name),
                      }));
                    }}
                  />
                  {d.name} ({d.code})
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Cancel</button>
          <button onClick={handleAdd} className="px-4 py-2 bg-yellow text-black font-bold rounded text-sm hover:bg-yellow-dark">Add Vendor</button>
        </div>
      </Modal>
    </div>
  );
}
