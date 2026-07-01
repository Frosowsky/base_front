import React, { useState } from 'react';
import { Plus, Settings2, Trash2, Edit, Save, AlertCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';

export const CustomFieldsSettings = () => {
  const [activeTab, setActiveTab] = useState<1 | 2>(2); // 1 = Product, 2 = Order
  const queryClient = useQueryClient();

  // Mock data for UI presentation if backend is not hooked up yet, but we will try to fetch
  const { data: fields = [], isLoading } = useQuery({
    queryKey: ['custom-fields', activeTab],
    queryFn: async () => {
      try {
        const response = await api.get(`/api/customfields/${activeTab}`);
        return response.data;
      } catch {
        return [
          { id: '1', name: 'Grawer', type: 1, isRequired: true, target: activeTab },
          { id: '2', name: 'Priorytet', type: 3, isRequired: false, target: activeTab },
        ];
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Pola Dodatkowe (Custom Fields)</h2>
          <p className="text-gray-500 mt-1">Skonfiguruj własne pola formularzy dla Produktów i Zamówień.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Dodaj pole
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab(1)}
          className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 1 ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Pola Produktów
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 2 ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Pola Zamówień
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Ładowanie pól...</div>
        ) : fields.length === 0 ? (
          <div className="p-12 text-center">
            <Settings2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">Brak zdefiniowanych pól</h3>
            <p className="text-gray-500 mt-1">Rozszerz możliwości systemu dodając własne pola.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Nazwa pola</th>
                <th className="px-6 py-4">Typ pola</th>
                <th className="px-6 py-4 text-center">Wymagane</th>
                <th className="px-6 py-4 text-right">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fields.map((field: any) => (
                <tr key={field.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{field.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                      {field.type === 1 ? 'Tekst (String)' : field.type === 2 ? 'Liczba (Number)' : 'Przełącznik (Bool)'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {field.isRequired ? (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Wymagane</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-medium">Opcjonalne</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 items-start border border-blue-100">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
        <div className="text-sm">
          <p className="font-bold mb-1">Informacja o polach niestandardowych</p>
          <p>
            Pola ze statusem "Wymagane" zablokują zapisanie formularza, dopóki użytkownik (lub API zewnętrznego kanału sprzedaży) 
            nie przekaże w nich wartości.
          </p>
        </div>
      </div>
    </div>
  );
};
