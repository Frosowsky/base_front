import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Mail, Printer, Link, FileText, Settings, Copy, Box, ChevronDown } from 'lucide-react';

export const OrderDetailsPage = () => {
  const [status, setStatus] = useState('Nowe');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-600 bg-white shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-600 bg-white shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
               <Box className="w-5 h-5" />
             </div>
             <div>
               <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                 Zamówienie 20
               </h1>
               <p className="text-sm text-gray-500 font-medium">01.07.2026, 18:10</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 bg-white shadow-sm transition-colors"><Mail className="w-5 h-5" /></button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 bg-white shadow-sm transition-colors"><FileText className="w-5 h-5" /></button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 bg-white shadow-sm transition-colors"><Copy className="w-5 h-5" /></button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 bg-white shadow-sm transition-colors"><Link className="w-5 h-5" /></button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 bg-white shadow-sm transition-colors"><Printer className="w-5 h-5" /></button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 bg-white shadow-sm transition-colors"><Settings className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Big Status Dropdown */}
      <div className="flex items-start">
        <div className="relative">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white pl-6 pr-4 py-3 rounded-full font-bold flex items-center justify-between gap-8 min-w-[280px] shadow-sm shadow-emerald-500/20 transition-all">
            <div className="text-left leading-tight">
              <span className="block text-xs text-emerald-100 uppercase tracking-wider font-semibold">Status</span>
              <span className="block text-lg">{status}</span>
            </div>
            <ChevronDown className="w-5 h-5 text-emerald-100" />
          </button>
          <p className="text-xs text-gray-400 mt-2 ml-4">ostatnia zmiana: 2026-07-01 18:10:23</p>
        </div>
      </div>

      {/* 4 Columns Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          
          {/* Kupujący */}
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Kupujący</h2>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm font-semibold text-gray-500">Klient:</span>
                 <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-500"><Settings className="w-3.5 h-3.5" /></button>
               </div>
               
               <div className="space-y-3">
                 <div className="flex items-center gap-2 text-sm">
                   <span className="text-gray-500 w-16">Telefon:</span>
                   <span className="text-amber-600 font-medium flex items-center gap-1">Brak danych ⚠</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm">
                   <span className="text-gray-500 w-16">E-mail:</span>
                   <span className="text-amber-600 font-medium flex items-center gap-1">Brak danych ⚠</span>
                   <div className="flex gap-1 ml-auto">
                     <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-500"><Mail className="w-3.5 h-3.5" /></button>
                     <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-500"><Settings className="w-3.5 h-3.5" /></button>
                   </div>
                 </div>
               </div>

               <button className="text-sm font-semibold text-gray-700 bg-white border border-gray-300 px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-50">
                 Dodaj klienta
               </button>
            </div>
          </div>

          {/* Dostawa i płatność */}
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Dostawa i płatność</h2>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between text-sm">
                 <span className="text-gray-500">Realizacja do:</span>
                 <span className="text-amber-600 font-medium flex items-center gap-1">Brak danych ⚠</span>
                 <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-500"><Settings className="w-3.5 h-3.5" /></button>
               </div>
               
               <div className="flex items-center justify-between text-sm">
                 <span className="text-gray-500">Dostawa:</span>
                 <span className="font-medium text-gray-900">Odbiór osobisty</span>
                 <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-500"><Box className="w-3.5 h-3.5" /></button>
               </div>

               <div className="flex items-center justify-between text-sm">
                 <span className="text-gray-500">Płatność:</span>
                 <span className="font-medium text-gray-900">Przelew</span>
                 <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded border border-red-100">Nie zapłacono</span>
               </div>

               <p className="text-sm font-medium text-gray-500 pt-2">Nie dopasowano szablonu nadania</p>
            </div>
          </div>

          {/* Adres dostawy */}
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-800">Adres dostawy</h2>
              <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-500"><Settings className="w-3.5 h-3.5" /></button>
            </div>
            
            <div className="space-y-3 text-sm">
               <div className="flex justify-between">
                 <span className="text-gray-500 w-24">Imię, nazwisko:</span>
                 <span className="text-amber-600 font-medium">Brak danych ⚠</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500 w-24">Ulica, nr domu:</span>
                 <span className="text-amber-600 font-medium">Brak danych ⚠</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500 w-24">Kod, miasto:</span>
                 <span className="text-amber-600 font-medium">Brak danych ⚠</span>
               </div>
               <div className="text-gray-900 font-medium pt-1">
                 Polska
               </div>
               <div className="flex justify-between pt-1">
                 <span className="text-gray-500 w-12">Tel.:</span>
                 <span className="text-amber-600 font-medium">Brak danych ⚠</span>
               </div>
            </div>
          </div>

          {/* Paragon */}
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-800">Paragon</h2>
                <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-500"><Settings className="w-3.5 h-3.5" /></button>
              </div>
              <button className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-2 py-1 rounded shadow-sm hover:bg-gray-100 flex items-center gap-1">
                <ChevronDown className="w-3 h-3 rotate-180" /> Zwiń
              </button>
            </div>
            
            <div className="space-y-3 text-sm">
               <div className="flex justify-between">
                 <span className="text-gray-500 w-24">Imię, nazwisko:</span>
                 <span className="text-amber-600 font-medium">Brak danych ⚠</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500 w-24">Ulica, nr domu:</span>
                 <span className="text-amber-600 font-medium">Brak danych ⚠</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500 w-24">Kod, miasto:</span>
                 <span className="text-amber-600 font-medium">Brak danych ⚠</span>
               </div>
               <div className="text-gray-900 font-medium pt-1">
                 Polska
               </div>
               <div className="flex justify-between pt-1">
                 <span className="text-gray-500 w-12">Tel.:</span>
                 <span className="text-amber-600 font-medium">Brak danych ⚠</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
           <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
             Pozycje zamówienia <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">2</span>
           </h2>
           <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
             + Dodaj pozycję
           </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold">Produkt</th>
                <th className="px-6 py-3 font-semibold text-right">Cena brutto</th>
                <th className="px-6 py-3 font-semibold text-center">Ilość</th>
                <th className="px-6 py-3 font-semibold text-right">Rabat</th>
                <th className="px-6 py-3 font-semibold text-right">Wartość brutto</th>
                <th className="px-6 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Mock Item 1 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <Box className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">Fotel Biurowy Ergotech 3000</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-0.5">SKU: PROD-1029</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-gray-600 font-medium">899,00 PLN</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <input type="number" defaultValue="1" className="w-16 text-center border border-gray-300 rounded-md py-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-gray-600">0%</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900 text-base">899,00 PLN</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg">
                    Usuń
                  </button>
                </td>
              </tr>
              {/* Mock Item 2 */}
              <tr className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <Box className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">Podkładka pod mysz XL</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-0.5">SKU: PROD-8821</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-gray-600 font-medium">49,00 PLN</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <input type="number" defaultValue="2" className="w-16 text-center border border-gray-300 rounded-md py-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-green-600 font-medium">-10%</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900 text-base">88,20 PLN</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg">
                    Usuń
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Order Totals Summary */}
        <div className="bg-gray-50 px-6 py-6 border-t border-gray-200">
          <div className="flex flex-col items-end gap-2 text-sm text-gray-600">
             <div className="flex justify-between w-64">
               <span>Wartość produktów:</span>
               <span className="font-medium text-gray-900">987,20 PLN</span>
             </div>
             <div className="flex justify-between w-64">
               <span>Koszty dostawy:</span>
               <span className="font-medium text-gray-900">0,00 PLN</span>
             </div>
             <div className="flex justify-between w-64 text-base mt-2 pt-2 border-t border-gray-200">
               <span className="font-bold text-gray-900">Do zapłaty:</span>
               <span className="font-bold text-emerald-600 text-xl">987,20 PLN</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* Custom Fields Section Mock */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
           <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
             Pola Dodatkowe (Własne)
           </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
             <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Grawer (Wymagane)</span>
             <span className="font-medium text-gray-900">"Dla kochanej Żony - Janek"</span>
           </div>
           <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
             <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Uwagi dla kuriera</span>
             <span className="font-medium text-gray-900">Brak</span>
           </div>
        </div>
      </div>

    </div>
  );
};
