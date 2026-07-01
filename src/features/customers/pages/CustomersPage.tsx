import React from 'react';
import { Mail, Phone, MapPin, MoreVertical, Edit2, Trash2 } from 'lucide-react';

// Mock Data for MVP
const mockCustomers = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  name: `Firma XYZ ${i + 1}`,
  contactPerson: `Jan Kowalski ${i + 1}`,
  email: `kontakt${i + 1}@firma.pl`,
  phone: `+48 123 456 ${String(i).padStart(3, '0')}`,
  address: `ul. Prosta ${i + 1}, 00-001 Warszawa`,
  status: i % 3 === 0 ? 'Nowy' : 'Aktywny',
  avatarColor: ['bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700', 'bg-purple-100 text-purple-700'][i % 3]
}));

export const CustomersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Klienci</h1>
          <p className="text-gray-500 mt-1">Zarządzaj bazą swoich klientów (B2B / B2C).</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm shadow-blue-500/30 hover:shadow-md hover:shadow-blue-500/40">
          + Dodaj Klienta
        </button>
      </div>

      {/* Grid Layout 20-50 items as requested */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
               <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
               <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
            
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${customer.avatarColor}`}>
                {customer.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.contactPerson}</p>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                {customer.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                {customer.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                <span className="truncate">{customer.address}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
               <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                 customer.status === 'Nowy' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
               }`}>
                 {customer.status}
               </span>
               <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Szczegóły &rarr;</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Mock */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-2xl shadow-sm">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Pokazuję <span className="font-medium">1</span> do <span className="font-medium">24</span> z <span className="font-medium">97</span> wyników
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                &larr;
              </button>
              <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">1</button>
              <button className="relative inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">2</button>
              <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</button>
              <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                &rarr;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
