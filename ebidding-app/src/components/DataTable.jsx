import { useState } from 'react';
import ColumnPickerModal from './ColumnPickerModal';
import { Settings } from 'lucide-react';

export const allColumns = [
  { key: 'clubId', label: 'Club Id' },
  { key: 'cofOrderId', label: 'COF Order Id' },
  { key: 'segment', label: 'Segment' },
  { key: 'destination', label: 'Destination' },
  { key: 'taluka', label: 'Taluka' },
  { key: 'depot', label: 'Depot' },
  { key: 'bgp', label: 'BGP' },
  { key: 'processingDate', label: 'Processing Date & Time' },
  { key: 'truckReportingDate', label: 'Truck Reporting Date & Time' },
  { key: 'orderQuantity', label: 'Order Quantity' },
  { key: 'spi', label: 'SPI' },
  { key: 'freight', label: 'Freight' },
  { key: 'bidAmount', label: 'Bid Amount' },
  { key: 'bidRank', label: 'Bid Rank' },
  { key: 'avgWtBidAmount', label: 'Avg Wt Bid Amount' },
  { key: 'freightWeighted', label: 'Freight (Weighted)' },
  { key: 'l1BidAmount', label: 'L1 Bid Amount' },
  { key: 'cofLineId', label: 'COF Line/Schedule ID' },
  { key: 'customerOrg', label: 'Customer Org' },
  { key: 'creationDate', label: 'Creation Date' },
  { key: 'shipFromPlant', label: 'Ship From Plant' },
  { key: 'deliveryWindow', label: 'Delivery Window' },
  { key: 'biddingRemark', label: 'Bidding Remark' },
];

export default function DataTable({ data, onBidChange, editable = true, selectedRow, onSelectRow, biddingClosed = false }) {
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map(c => c.key));
  const [showColumnPicker, setShowColumnPicker] = useState(false);

  const cols = allColumns.filter(c => visibleColumns.includes(c.key));

  const renderCell = (row, col) => {
    if (col.key === 'bidAmount') {
      if (!editable) return <span>{row.bidAmount}</span>;
      return (
        <input
          type="number"
          min={0}
          className={`w-20 bg-dark border ${biddingClosed ? 'border-dark-border' : 'border-dark-border focus:border-yellow'} text-theme text-sm py-1 px-2 rounded outline-none text-center`}
          value={row.bidAmount || ''}
          onChange={e => onBidChange?.(row.id, Number(e.target.value) || 0)}
          placeholder="0"
          disabled={biddingClosed}
        />
      );
    }

    if (col.key === 'bidRank') {
      if (!row.bidRank || row.bidRank === 0) return <span>-</span>;
      const color = row.bidRank === 1 ? 'bg-green-600' : row.bidRank === 2 ? 'bg-orange-500' : 'bg-gray-500';
      return (
        <span className={`${color} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
          {row.bidRank}
        </span>
      );
    }

    return <span className="whitespace-nowrap">{row[col.key] ?? ''}</span>;
  };

  const isL1 = (row) => row.bidRank === 1 && row.bidAmount > 0;

  return (
    <>
      <div className="flex justify-end mb-1">
        <button
          onClick={() => setShowColumnPicker(true)}
          className="p-1.5 hover:bg-dark-row rounded text-theme-subtle hover:text-yellow"
          title="Column Settings"
        >
          <Settings size={18} />
        </button>
      </div>

      <div className="overflow-x-auto border border-dark-border rounded relative">
        {biddingClosed && (
          <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
            <span className="text-red-500 font-heading text-3xl font-bold tracking-widest">BIDDING CLOSED</span>
          </div>
        )}
        <table className="w-full text-sm text-theme">
          <thead className="sticky top-0 z-[5]">
            <tr className="bg-yellow text-black">
              <th className="px-2 py-2 text-left font-heading font-semibold text-xs whitespace-nowrap"></th>
              {cols.map(col => (
                <th key={col.key} className="px-2 py-2 text-left font-heading font-semibold text-xs whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={row.id}
                className={
                  isL1(row)
                    ? 'bg-yellow text-black'
                    : idx % 2 === 0
                    ? 'bg-dark-card'
                    : 'bg-dark-row'
                }
              >
                <td className="px-2 py-2">
                  <input
                    type="radio"
                    name="orderSelect"
                    checked={selectedRow === row.id}
                    onChange={() => onSelectRow?.(row.id)}
                    className="accent-yellow"
                  />
                </td>
                {cols.map(col => (
                  <td key={col.key} className="px-2 py-2 text-xs">
                    {renderCell(row, col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showColumnPicker && (
        <ColumnPickerModal
          columns={allColumns}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          onClose={() => setShowColumnPicker(false)}
        />
      )}
    </>
  );
}
