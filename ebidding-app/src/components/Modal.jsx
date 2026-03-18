import { X } from 'lucide-react';

export default function Modal({ title, isOpen, onClose, children, width = 'max-w-lg' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className={`bg-dark-card border border-dark-border rounded-lg ${width} w-full max-h-[85vh] flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-dark-border">
          <h2 className="font-heading font-bold text-lg text-yellow">{title}</h2>
          <button onClick={onClose} className="text-theme-subtle hover:text-theme"><X size={20} /></button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
