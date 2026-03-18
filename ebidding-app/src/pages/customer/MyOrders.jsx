import { useState } from 'react';
import { customerOrders, bidHistory } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';

export default function MyOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderBids = selectedOrder
    ? bidHistory.filter((_, i) => i < 5).map((b, i) => ({
        ...b,
        vendor: ['GANGOTRI STEEL', 'SHARMA TRANSPORT', 'RAJ LOGISTICS', 'SINGH CARRIERS', 'GUPTA FREIGHT'][i],
        bidAmount: selectedOrder.l1Bid + i * 8,
      }))
    : [];

  return (
    <div className="space-y-4">
      <h1 className="font-heading font-bold text-2xl text-yellow">My Orders</h1>

      <div className="bg-dark-card border border-dark-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-theme">
          <thead>
            <tr className="bg-yellow text-black">
              {['Order ID', 'Depot', 'Destination', 'Quantity', 'Status', 'L1 Bid', 'Assigned Vendor'].map(h => (
                <th key={h} className="text-left py-2 px-3 text-xs font-heading font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customerOrders.map((o, idx) => (
              <tr
                key={o.id}
                className={`cursor-pointer ${idx % 2 === 0 ? 'bg-dark-card' : 'bg-dark-row'} hover:bg-dark-border`}
                onClick={() => setSelectedOrder(o)}
              >
                <td className="py-2 px-3 text-xs font-mono">{o.id}</td>
                <td className="py-2 px-3 text-xs">{o.depot}</td>
                <td className="py-2 px-3 text-xs">{o.destination}</td>
                <td className="py-2 px-3 text-xs">{o.quantity}</td>
                <td className="py-2 px-3"><StatusBadge status={o.status} /></td>
                <td className="py-2 px-3 text-xs">₹{o.l1Bid}</td>
                <td className="py-2 px-3 text-xs">{o.assignedVendor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      <Modal title={`Order Details: ${selectedOrder?.id || ''}`} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} width="max-w-2xl">
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p><span className="text-theme-subtle">Order ID:</span> {selectedOrder.id}</p>
              <p><span className="text-theme-subtle">Depot:</span> {selectedOrder.depot}</p>
              <p><span className="text-theme-subtle">Destination:</span> {selectedOrder.destination}</p>
              <p><span className="text-theme-subtle">Quantity:</span> {selectedOrder.quantity}</p>
              <p><span className="text-theme-subtle">Status:</span> <StatusBadge status={selectedOrder.status} /></p>
              <p><span className="text-theme-subtle">L1 Bid:</span> ₹{selectedOrder.l1Bid}</p>
            </div>

            <div>
              <h3 className="font-heading font-bold text-yellow mb-2">Bid History</h3>
              <table className="w-full text-sm text-theme">
                <thead>
                  <tr className="border-b border-dark-border text-theme-subtle text-xs">
                    <th className="text-left py-2">Vendor</th>
                    <th className="text-left py-2">Bid Amount</th>
                    <th className="text-left py-2">Rank</th>
                    <th className="text-left py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orderBids.map((b, i) => (
                    <tr key={i} className={`border-b border-dark-border ${i === 0 ? 'text-yellow font-bold' : ''}`}>
                      <td className="py-2 text-xs">{b.vendor}</td>
                      <td className="py-2 text-xs">₹{b.bidAmount}</td>
                      <td className="py-2 text-xs">{i + 1}</td>
                      <td className="py-2 text-xs">{b.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
