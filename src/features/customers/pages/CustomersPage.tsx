import { useState } from 'react';
import { Mail, Phone, MapPin, Edit2, Trash2, Building2, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { CustomerFormModal } from '../components/CustomerFormModal';

export const CustomersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await api.get('/api/customers');
      return response.data;
    }
  });

  const getSourceLabel = (source: number) => {
    switch(source) {
      case 0: return 'Manualnie';
      case 1: return 'Formularz';
      case 2: return 'Allegro';
      case 3: return 'OLX';
      case 4: return 'Shopify';
      case 5: return 'WooCommerce';
      default: return 'Inne';
    }
  };

  const getAvatarColor = (id: string, type: number) => {
    if (type === 1) return 'bg-emerald-100 text-emerald-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Klienci</h1>
          <p className="text-gray-500 mt-1">Zarządzaj bazą swoich klientów (B2B / B2C).</p>
        </div>
        <button 
          onClick={() => { setEditingCustomer(null); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm shadow-blue-500/30 hover:shadow-md hover:shadow-blue-500/40"
        >
          + Dodaj Klienta
        </button>
      </div>

      {isLoading ? (
        <div className="py-12 flex justify-center"><p className="text-gray-500">Ładowanie klientów...</p></div>
      ) : customers.length === 0 ? (
        <div className="py-20 text-center bg-white border border-gray-100 rounded-3xl shadow-sm">
           <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
           <h3 className="text-xl font-bold text-gray-900 mb-2">Brak klientów</h3>
           <p className="text-gray-500 mb-6">Rozpocznij budowanie bazy kontaktów dodając pierwszego klienta.</p>
           <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-all"
           >
             Dodaj pierwszego klienta
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {customers.map((customer: any) => (
            <div key={customer.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                 <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                 <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
              
              <div className="flex items-start gap-4 mb-4 pr-16">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${getAvatarColor(customer.id, customer.type)}`}>
                  {customer.type === 1 ? <Building2 className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">
                    {customer.type === 1 ? customer.companyName : `${customer.firstName} ${customer.lastName}`}
                  </h3>
                  {customer.type === 1 && (
                    <p className="text-sm text-gray-500 font-mono mt-0.5">NIP: {customer.taxId}</p>
                  )}
                  {customer.type === 0 && customer.companyName && (
                    <p className="text-sm text-gray-500 mt-0.5">{customer.companyName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  <span className="truncate">{customer.email || 'Brak email'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  {customer.phone || 'Brak telefonu'}
                </div>
                {customer.country && (
                   <div className="flex items-center text-sm text-gray-600">
                     <MapPin className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                     <span className="truncate">{customer.country}</span>
                   </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                 <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                   customer.source > 0 ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                 }`}>
                   Źródło: {getSourceLabel(customer.source)}
                 </span>
                 <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                   customer.type === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                 }`}>
                   {customer.type === 1 ? 'B2B' : 'B2C'}
                 </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <CustomerFormModal 
          customer={editingCustomer}
          onClose={() => { setIsModalOpen(false); setEditingCustomer(null); }} 
        />
      )}
    </div>
  );
};
