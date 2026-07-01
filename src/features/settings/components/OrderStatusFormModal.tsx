import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface OrderStatusFormModalProps {
  status?: any;
  onClose: () => void;
  onSave: (status: any) => void;
}

const colors = [
  { name: 'Niebieski', value: 'bg-blue-100 text-blue-700', hex: '#dbeafe' },
  { name: 'Żółty', value: 'bg-amber-100 text-amber-700', hex: '#fef3c7' },
  { name: 'Fioletowy', value: 'bg-purple-100 text-purple-700', hex: '#f3e8ff' },
  { name: 'Zielony', value: 'bg-green-100 text-green-700', hex: '#dcfce3' },
  { name: 'Czerwony', value: 'bg-red-100 text-red-700', hex: '#fee2e2' },
  { name: 'Szary', value: 'bg-gray-100 text-gray-700', hex: '#f3f4f6' },
];

export const OrderStatusFormModal: React.FC<OrderStatusFormModalProps> = ({ status, onClose, onSave }) => {
  const [name, setName] = useState(status?.name || '');
  const [color, setColor] = useState(status?.color || colors[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, color });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {status ? 'Edytuj Status' : 'Nowy Status'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nazwa statusu</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" 
              required 
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Kolor (etykieta)</label>
            <div className="flex flex-wrap gap-3">
               {colors.map(c => (
                 <button
                   key={c.value}
                   type="button"
                   onClick={() => setColor(c.value)}
                   className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${color === c.value ? 'ring-2 ring-offset-2 ring-gray-900' : ''}`}
                   style={{ backgroundColor: c.hex }}
                   title={c.name}
                 >
                   {color === c.value && <Check className="w-5 h-5 text-gray-900 opacity-60" />}
                 </button>
               ))}
            </div>
            
            {name && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-xs text-gray-500 block mb-2 font-medium">Podgląd etykiety:</span>
                <span className={`inline-block px-3 py-1.5 text-sm font-semibold rounded-md ${color}`}>
                  {name}
                </span>
              </div>
            )}
          </div>
        </form>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
           <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 bg-gray-100 rounded-xl transition-colors">Anuluj</button>
           <button onClick={handleSubmit} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-500/30">Zapisz</button>
        </div>
      </div>
    </div>
  );
};
