import { useState } from 'react';
import { depotList, orderTypes, plants, destinations } from '../data/mockData';
import { ChevronDown } from 'lucide-react';

function SelectDropdown({ label, value, onChange, options, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs text-theme-subtle mb-1">{label}</label>
      <div className="relative">
        <select
          className="w-full bg-dark border border-dark-border text-theme text-sm py-2 px-3 pr-8 rounded appearance-none outline-none focus:border-yellow cursor-pointer"
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          <option value="">All</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-theme-subtle pointer-events-none" />
      </div>
    </div>
  );
}

export default function FilterBar({ visible = true }) {
  const [plant, setPlant] = useState('TANDA CEMENT WORKS');
  const [orderType, setOrderType] = useState('');
  const [depot, setDepot] = useState('');
  const [dateFrom, setDateFrom] = useState('2026-03-18');
  const [dateTo, setDateTo] = useState('2026-03-18');
  const [packType, setPackType] = useState('');
  const [destState, setDestState] = useState('');

  if (!visible) return null;

  return (
    <div className="bg-dark-card border border-dark-border rounded p-4 mb-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <SelectDropdown
          label="Ship From Plant :"
          value={plant}
          onChange={setPlant}
          options={plants.map(p => ({ value: p, label: p }))}
        />
        <SelectDropdown
          label="Order Type :"
          value={orderType}
          onChange={setOrderType}
          options={orderTypes.map(o => ({ value: String(o.code), label: `${o.name}` }))}
        />
        <SelectDropdown
          label="Depot :"
          value={depot}
          onChange={setDepot}
          options={depotList.map(d => ({ value: String(d.code), label: `${d.name}` }))}
        />
        <div>
          <label className="block text-xs text-theme-subtle mb-1">Assigned Date :</label>
          <div className="flex gap-1">
            <input
              type="date"
              className="flex-1 bg-dark border border-dark-border text-theme text-sm py-2 px-2 rounded outline-none focus:border-yellow"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
            />
            <input
              type="date"
              className="flex-1 bg-dark border border-dark-border text-theme text-sm py-2 px-2 rounded outline-none focus:border-yellow"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
            />
          </div>
        </div>
        <SelectDropdown
          label="Pack Type :"
          value={packType}
          onChange={setPackType}
          options={[
            { value: '1127', label: '1127-BAG-AL/REGULAR' },
            { value: '1126', label: '1126-BAG-AL/REGULAR' },
            { value: '1130', label: '1130-BAG-AL/PREMIUM' },
          ]}
        />
        <SelectDropdown
          label="Destination State :"
          value={destState}
          onChange={setDestState}
          options={['UTTAR PRADESH', 'MADHYA PRADESH', 'BIHAR'].map(s => ({ value: s, label: s }))}
        />
      </div>
    </div>
  );
}
