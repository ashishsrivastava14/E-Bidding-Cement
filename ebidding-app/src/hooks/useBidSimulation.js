import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export function useBidSimulation(orders, setOrders, isExpired) {
  const ordersRef = useRef(orders);
  ordersRef.current = orders;

  useEffect(() => {
    if (isExpired) return;

    const interval = setInterval(() => {
      const current = ordersRef.current;
      const count = Math.floor(Math.random() * 3) + 1;
      const indices = new Set();
      while (indices.size < count && indices.size < current.length) {
        indices.add(Math.floor(Math.random() * current.length));
      }

      const updated = current.map((order, idx) => {
        if (!indices.has(idx)) return order;

        const currentL1 = Math.min(
          order.freight,
          ...order.competitorBids.map(b => b.amount),
          order.bidAmount > 0 ? order.bidAmount : Infinity
        );
        const newBid = currentL1 - Math.floor(Math.random() * 16 + 5);
        const competitorIdx = Math.floor(Math.random() * order.competitorBids.length);
        const newCompetitorBids = order.competitorBids.map((b, ci) =>
          ci === competitorIdx ? { ...b, amount: newBid } : b
        );

        if (order.bidAmount > 0 && newBid < order.bidAmount) {
          toast(`You've been outbid on Order #${order.clubId}`, {
            icon: '⚠️',
            style: { background: '#2c2c2c', color: '#F5C518', border: '1px solid #F5C518' },
          });
        }

        return { ...order, competitorBids: newCompetitorBids };
      });

      setOrders(recalcRanks(updated));
    }, 15000);

    return () => clearInterval(interval);
  }, [isExpired, setOrders]);
}

export function recalcRanks(orders) {
  return orders.map(order => {
    const allBids = [
      ...order.competitorBids.map(b => b.amount),
      ...(order.bidAmount > 0 ? [order.bidAmount] : []),
    ].filter(b => b > 0);

    if (allBids.length === 0) {
      return { ...order, bidRank: 0, l1BidAmount: 0, avgWtBidAmount: 0 };
    }

    const sorted = [...allBids].sort((a, b) => a - b);
    const l1 = sorted[0];
    const avg = Math.round(allBids.reduce((s, v) => s + v, 0) / allBids.length);
    let rank = 0;
    if (order.bidAmount > 0) {
      rank = sorted.indexOf(order.bidAmount) + 1;
      if (rank === 0) rank = sorted.findIndex(v => v >= order.bidAmount) + 1;
    }

    return {
      ...order,
      bidRank: rank,
      l1BidAmount: l1,
      avgWtBidAmount: avg,
      freightWeighted: order.freight,
    };
  });
}
