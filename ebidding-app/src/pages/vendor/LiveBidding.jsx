import { useState, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search, Save, Clock } from 'lucide-react';
import { mockOrders } from '../../data/mockData';
import { useCountdown } from '../../hooks/useCountdown';
import { useBidSimulation, recalcRanks } from '../../hooks/useBidSimulation';
import DataTable from '../../components/DataTable';
import FilterBar from '../../components/FilterBar';
import CountdownTimer from '../../components/CountdownTimer';

export default function LiveBidding() {
  const { searchVisible } = useOutletContext();
  const [orders, setOrders] = useState(() => recalcRanks(mockOrders));
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchText, setSearchText] = useState('');
  const timer = useCountdown(600);

  const setOrdersMemo = useCallback((fn) => {
    setOrders(typeof fn === 'function' ? fn : () => fn);
  }, []);

  useBidSimulation(orders, setOrdersMemo, timer.isExpired);

  const handleBidChange = (orderId, value) => {
    setOrders(prev =>
      recalcRanks(prev.map(o => (o.id === orderId ? { ...o, bidAmount: value } : o)))
    );
  };

  const handleSave = () => {
    toast.success('Bid saved successfully!', {
      icon: '✅',
      style: { background: '#2c2c2c', color: '#fff', border: '1px solid #F5C518' },
    });
    setOrders(prev => recalcRanks(prev));
  };

  const filteredOrders = orders.filter(o =>
    !searchText || o.clubId.includes(searchText) || o.destination.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <FilterBar visible={searchVisible} />

      {/* Order List Header */}
      <div className="bg-dark-card border border-dark-border rounded-t px-4 py-2 flex items-center justify-between">
        <h2 className="font-heading font-bold text-sm text-yellow tracking-wide">Order List</h2>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center bg-dark border border-dark-border rounded px-2">
            <input
              className="bg-transparent text-white text-xs py-1.5 w-40 outline-none"
              placeholder="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <Search size={14} className="text-gray-400" />
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={timer.isExpired}
            className="flex items-center gap-1 bg-yellow text-black px-3 py-1.5 rounded text-xs font-bold hover:bg-yellow-dark disabled:opacity-50"
          >
            <Save size={12} /> Save
          </button>

          {/* Timer */}
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-yellow" />
            <CountdownTimer timerHook={timer} />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredOrders}
        onBidChange={handleBidChange}
        editable={true}
        selectedRow={selectedRow}
        onSelectRow={setSelectedRow}
        biddingClosed={timer.isExpired}
      />
    </div>
  );
}
