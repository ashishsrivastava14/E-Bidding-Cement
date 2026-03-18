import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Clock, StopCircle, TimerReset } from 'lucide-react';
import { mockOrders } from '../../data/mockData';
import { useCountdown } from '../../hooks/useCountdown';
import { useBidSimulation, recalcRanks } from '../../hooks/useBidSimulation';
import DataTable from '../../components/DataTable';
import CountdownTimer from '../../components/CountdownTimer';

export default function LiveBidMonitor() {
  const [orders, setOrders] = useState(() => {
    const withBids = mockOrders.map(o => ({
      ...o,
      bidAmount: o.freight - Math.floor(Math.random() * 30 + 5),
    }));
    return recalcRanks(withBids);
  });
  const timer = useCountdown(30);

  const setOrdersMemo = useCallback((fn) => {
    setOrders(typeof fn === 'function' ? fn : () => fn);
  }, []);

  useBidSimulation(orders, setOrdersMemo, timer.isExpired);

  const handleStop = () => {
    timer.reset(0);
    toast('Bidding stopped by admin', { icon: '🛑' });
  };

  const handleExtend = () => {
    timer.addTime(300);
    toast.success('Added 5 minutes to bidding timer');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-yellow">Live Bid Monitor</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-yellow" />
            <CountdownTimer timerHook={timer} />
          </div>
          <button
            onClick={handleExtend}
            className="flex items-center gap-1 bg-dark-card border border-yellow text-yellow px-3 py-1.5 rounded text-xs font-bold hover:bg-yellow hover:text-black"
          >
            <TimerReset size={14} /> Extend +5 min
          </button>
          <button
            onClick={handleStop}
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-red-700"
          >
            <StopCircle size={14} /> Stop Bidding
          </button>
        </div>
      </div>

      <DataTable
        data={orders}
        editable={false}
        biddingClosed={timer.isExpired}
      />
    </div>
  );
}
