import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Play, Square, Eye } from 'lucide-react';
import { mockTenders, depotList, plants, mockVendors } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';

export default function TenderManagement() {
  const [tenders, setTenders] = useState(mockTenders);
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(null);
  const [editTender, setEditTender] = useState(null);
  const [form, setForm] = useState({
    plant: 'TANDA CEMENT WORKS', depot: '', route: '', orderType: '1',
    quantity: '', baseFreight: '', startTime: '', endTime: '', vendors: [],
  });

  const resetForm = () => setForm({
    plant: 'TANDA CEMENT WORKS', depot: '', route: '', orderType: '1',
    quantity: '', baseFreight: '', startTime: '', endTime: '', vendors: [],
  });

  const handleCreate = () => {
    const newTender = {
      id: `T-2026-${String(tenders.length + 1).padStart(3, '0')}`,
      route: form.route || `${form.plant} → ${form.depot}`,
      depot: form.depot,
      quantity: Number(form.quantity),
      baseFreight: Number(form.baseFreight),
      status: 'DRAFT',
      created: '18/03/2026',
      vendors: form.vendors,
    };
    setTenders(prev => [newTender, ...prev]);
    setShowCreate(false);
    resetForm();
    toast.success('Tender created successfully!');
  };

  const handleDelete = (id) => {
    setTenders(prev => prev.filter(t => t.id !== id));
    toast.success('Tender deleted');
  };

  const toggleBidding = (id) => {
    setTenders(prev => prev.map(t => {
      if (t.id !== id) return t;
      const newStatus = t.status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
      toast.success(`Bidding ${newStatus === 'ACTIVE' ? 'started' : 'stopped'} for ${t.id}`);
      return { ...t, status: newStatus };
    }));
  };

  const FormFields = () => (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-gray-400 mb-1">Plant</label>
        <select className="w-full bg-dark border border-dark-border text-white text-sm py-2 px-3 rounded outline-none" value={form.plant} onChange={e => setForm({ ...form, plant: e.target.value })}>
          {plants.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Depot</label>
        <select className="w-full bg-dark border border-dark-border text-white text-sm py-2 px-3 rounded outline-none" value={form.depot} onChange={e => setForm({ ...form, depot: e.target.value })}>
          <option value="">Select Depot</option>
          {depotList.map(d => <option key={d.code} value={d.name}>{d.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Route</label>
        <input className="w-full bg-dark border border-dark-border text-white text-sm py-2 px-3 rounded outline-none" placeholder="e.g., TANDA → SITAPUR" value={form.route} onChange={e => setForm({ ...form, route: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Order Type</label>
          <select className="w-full bg-dark border border-dark-border text-white text-sm py-2 px-3 rounded outline-none" value={form.orderType} onChange={e => setForm({ ...form, orderType: e.target.value })}>
            <option value="1">Customer Order</option>
            <option value="2">Transfer Order</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Quantity</label>
          <input type="number" className="w-full bg-dark border border-dark-border text-white text-sm py-2 px-3 rounded outline-none" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Base Freight (₹)</label>
        <input type="number" className="w-full bg-dark border border-dark-border text-white text-sm py-2 px-3 rounded outline-none" value={form.baseFreight} onChange={e => setForm({ ...form, baseFreight: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Start Time</label>
          <input type="datetime-local" className="w-full bg-dark border border-dark-border text-white text-sm py-2 px-3 rounded outline-none" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">End Time</label>
          <input type="datetime-local" className="w-full bg-dark border border-dark-border text-white text-sm py-2 px-3 rounded outline-none" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Assign Vendors</label>
        <div className="bg-dark border border-dark-border rounded p-2 max-h-32 overflow-y-auto space-y-1">
          {mockVendors.filter(v => v.status === 'Active').map(v => (
            <label key={v.id} className="flex items-center gap-2 text-xs cursor-pointer hover:text-yellow">
              <input
                type="checkbox"
                className="accent-yellow"
                checked={form.vendors.includes(v.id)}
                onChange={e => {
                  setForm(prev => ({
                    ...prev,
                    vendors: e.target.checked ? [...prev.vendors, v.id] : prev.vendors.filter(id => id !== v.id),
                  }));
                }}
              />
              {v.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-yellow">Tender Management</h1>
        <button onClick={() => { resetForm(); setShowCreate(true); }} className="flex items-center gap-1 bg-yellow text-black px-4 py-2 rounded text-sm font-bold hover:bg-yellow-dark">
          <Plus size={14} /> Create Tender
        </button>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-yellow text-black">
              {['Tender ID', 'Route', 'Depot', 'Quantity', 'Base Freight', 'Status', 'Created', 'Actions'].map(h => (
                <th key={h} className="text-left py-2 px-3 text-xs font-heading font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tenders.map((t, idx) => (
              <tr key={t.id} className={idx % 2 === 0 ? 'bg-dark-card' : 'bg-dark-row'}>
                <td className="py-2 px-3 text-xs font-mono">{t.id}</td>
                <td className="py-2 px-3 text-xs">{t.route}</td>
                <td className="py-2 px-3 text-xs">{t.depot}</td>
                <td className="py-2 px-3 text-xs">{t.quantity}</td>
                <td className="py-2 px-3 text-xs">₹{t.baseFreight}</td>
                <td className="py-2 px-3"><StatusBadge status={t.status} /></td>
                <td className="py-2 px-3 text-xs">{t.created}</td>
                <td className="py-2 px-3">
                  <div className="flex gap-1">
                    <button onClick={() => setShowView(t)} className="p-1 text-gray-400 hover:text-yellow" title="View"><Eye size={14} /></button>
                    <button onClick={() => { setEditTender(t); setForm({ ...form, depot: t.depot, route: t.route, quantity: t.quantity, baseFreight: t.baseFreight }); }} className="p-1 text-gray-400 hover:text-yellow" title="Edit"><Edit size={14} /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-1 text-gray-400 hover:text-red-400" title="Delete"><Trash2 size={14} /></button>
                    <button onClick={() => toggleBidding(t.id)} className={`p-1 ${t.status === 'ACTIVE' ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}`} title={t.status === 'ACTIVE' ? 'Stop Bidding' : 'Start Bidding'}>
                      {t.status === 'ACTIVE' ? <Square size={14} /> : <Play size={14} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <Modal title="Create New Tender" isOpen={showCreate} onClose={() => setShowCreate(false)} width="max-w-xl">
        <FormFields />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => setShowCreate(false)} className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Cancel</button>
          <button onClick={handleCreate} className="px-4 py-2 bg-yellow text-black font-bold rounded text-sm hover:bg-yellow-dark">Create Tender</button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal title={`Edit Tender ${editTender?.id || ''}`} isOpen={!!editTender} onClose={() => setEditTender(null)} width="max-w-xl">
        <FormFields />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => setEditTender(null)} className="px-4 py-2 bg-gray-600 text-white rounded text-sm">Cancel</button>
          <button onClick={() => { setEditTender(null); toast.success('Tender updated!'); }} className="px-4 py-2 bg-yellow text-black font-bold rounded text-sm hover:bg-yellow-dark">Save Changes</button>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal title={`Tender Details: ${showView?.id || ''}`} isOpen={!!showView} onClose={() => setShowView(null)}>
        {showView && (
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-400">Route:</span> {showView.route}</p>
            <p><span className="text-gray-400">Depot:</span> {showView.depot}</p>
            <p><span className="text-gray-400">Quantity:</span> {showView.quantity}</p>
            <p><span className="text-gray-400">Base Freight:</span> ₹{showView.baseFreight}</p>
            <p><span className="text-gray-400">Status:</span> <StatusBadge status={showView.status} /></p>
            <p><span className="text-gray-400">Created:</span> {showView.created}</p>
            <p><span className="text-gray-400">Assigned Vendors:</span> {showView.vendors?.length || 0}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
