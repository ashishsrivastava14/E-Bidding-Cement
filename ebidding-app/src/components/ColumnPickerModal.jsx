import { useState } from 'react';
import { Search, X, Check, ChevronUp, ChevronDown } from 'lucide-react';

export default function ColumnPickerModal({ columns, visibleColumns, setVisibleColumns, onClose }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([...visibleColumns]);
  const [orderedCols, setOrderedCols] = useState([...columns]);

  const filtered = orderedCols.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  const allVisible = columns.every(c => selected.includes(c.key));

  const toggleAll = () => {
    if (allVisible) {
      setSelected([]);
    } else {
      setSelected(columns.map(c => c.key));
    }
  };

  const toggle = (key) => {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const moveUp = (key) => {
    setOrderedCols(prev => {
      const idx = prev.findIndex(c => c.key === key);
      if (idx <= 0) return prev;
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  };

  const moveDown = (key) => {
    setOrderedCols(prev => {
      const idx = prev.findIndex(c => c.key === key);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const arr = [...prev];
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      return arr;
    });
  };

  const handleOk = () => {
    setVisibleColumns(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-dark-card border border-dark-border rounded-lg w-[400px] max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-yellow text-black font-heading font-bold text-lg">
          <span>Columns</span>
          <button onClick={onClose}><X size={18} /></button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-dark-border">
          <div className="flex items-center bg-dark border border-dark-border rounded px-2">
            <input
              className="bg-transparent text-white text-sm py-2 flex-1 outline-none"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Search size={16} className="text-gray-400" />
          </div>
        </div>

        {/* Move buttons */}
        <div className="flex justify-end gap-1 px-3 pt-2">
          <button className="p-1 bg-yellow text-black rounded" title="Move up">
            <ChevronUp size={14} />
          </button>
          <button className="p-1 bg-yellow text-black rounded" title="Move down">
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Select All */}
        <div
          className="flex items-center gap-3 px-4 py-2 border-b border-dark-border cursor-pointer hover:bg-dark-row"
          onClick={toggleAll}
        >
          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${allVisible ? 'bg-yellow border-yellow' : 'border-gray-500'}`}>
            {allVisible && <Check size={14} className="text-black" />}
          </div>
          <span className="text-sm font-medium">Select All</span>
        </div>

        {/* Column list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map(col => {
            const checked = selected.includes(col.key);
            return (
              <div
                key={col.key}
                className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-dark-row group"
              >
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center shrink-0 ${checked ? 'bg-yellow border-yellow' : 'border-gray-500'}`}
                  onClick={() => toggle(col.key)}
                >
                  {checked && <Check size={14} className="text-black" />}
                </div>
                <span className="text-sm flex-1" onClick={() => toggle(col.key)}>{col.label}</span>
                <div className="hidden group-hover:flex gap-1">
                  <button onClick={() => moveUp(col.key)} className="p-0.5 hover:text-yellow"><ChevronUp size={14} /></button>
                  <button onClick={() => moveDown(col.key)} className="p-0.5 hover:text-yellow"><ChevronDown size={14} /></button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-3 border-t border-dark-border">
          <button onClick={handleOk} className="px-4 py-1.5 bg-yellow text-black font-bold rounded text-sm hover:bg-yellow-dark">
            OK
          </button>
          <button onClick={onClose} className="px-4 py-1.5 bg-gray-600 text-white font-bold rounded text-sm hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
