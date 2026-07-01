import React, { useState } from 'react';
import { Plus, GripVertical, Edit2, Trash2, ShieldAlert } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderStatusFormModal } from './OrderStatusFormModal';

export const OrderStatusesSettings = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<any>(null);

  const { data: statuses = [], isLoading } = useQuery({
    queryKey: ['orderStatuses'],
    queryFn: async () => {
      const response = await fetch('/api/OrderStatuses');
      if (!response.ok) throw new Error('Failed to fetch statuses');
      return response.json();
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (status: any) => {
      const method = status.id ? 'PUT' : 'POST';
      const url = status.id ? `/api/OrderStatuses/${status.id}` : '/api/OrderStatuses';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(status)
      });
      if (!response.ok) throw new Error('Failed to save status');
      return response.json().catch(() => ({}));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderStatuses'] });
      setIsModalOpen(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/OrderStatuses/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete status');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderStatuses'] });
    }
  });

  const handleEdit = (status: any) => {
    setEditingStatus(status);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingStatus(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Czy na pewno chcesz usunąć ten status?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSave = (savedStatus: any) => {
    if (editingStatus) {
      saveMutation.mutate({ ...savedStatus, id: editingStatus.id, orderIndex: editingStatus.orderIndex });
    } else {
      saveMutation.mutate({ ...savedStatus, orderIndex: statuses.length });
    }
  };

  if (isLoading) return <div>Ładowanie...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Statusy Zamówień</h2>
          <p className="text-sm text-gray-500 mt-1">Zarządzaj przepływem zamówień i dostosuj kolory.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Dodaj Status
        </button>
      </div>

      <div className="space-y-3">
        {statuses.sort((a: any, b: any) => a.orderIndex - b.orderIndex).map((status: any) => (
          <div key={status.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-shadow group">
            <div className="flex items-center gap-4">
               <button className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing">
                 <GripVertical className="w-5 h-5" />
               </button>
               <div className="flex flex-col">
                 <div className="flex items-center gap-3">
                   <span className="font-semibold text-gray-900">{status.name}</span>
                   {status.isSystemDefault && (
                     <span className="flex items-center text-[10px] uppercase font-bold tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                       <ShieldAlert className="w-3 h-3 mr-1" />
                       Systemowy
                     </span>
                   )}
                 </div>
                 <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md mt-2 w-max ${status.color}`}>
                   {status.name} (Podgląd)
                 </span>
               </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                 onClick={() => handleEdit(status)}
                 className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
               >
                 <Edit2 className="w-4 h-4" />
               </button>
               {!status.isSystemDefault && (
                 <button 
                   onClick={() => handleDelete(status.id)}
                   className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <OrderStatusFormModal 
          status={editingStatus}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
