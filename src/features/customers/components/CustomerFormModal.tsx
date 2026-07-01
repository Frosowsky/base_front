import React, { useState } from 'react';
import { X, Building2, User, Mail, Phone, MapPin, Tag } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';

interface CustomerFormModalProps {
  customer?: any;
  onClose: () => void;
}

export const CustomerFormModal = ({ customer, onClose }: CustomerFormModalProps) => {
  const isEditing = !!customer;
  const queryClient = useQueryClient();

  // 0 = Individual, 1 = Company
  const [type, setType] = useState<0 | 1>(customer?.type ?? 0);
  const [firstName, setFirstName] = useState(customer?.firstName || '');
  const [lastName, setLastName] = useState(customer?.lastName || '');
  const [companyName, setCompanyName] = useState(customer?.companyName || '');
  const [taxId, setTaxId] = useState(customer?.taxId || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [country, setCountry] = useState(customer?.country || 'Polska');
  
  // 0 = Manual
  const [source, setSource] = useState<number>(customer?.source ?? 0);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (isEditing) {
        return api.put(`/api/customers/${customer.id}`, data);
      }
      return api.post('/api/customers', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      onClose();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      type,
      source,
      firstName,
      lastName,
      companyName,
      taxId,
      email,
      phone,
      country
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? 'Edytuj Klienta' : 'Nowy Klient'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Wypełnij dane kontaktowe i rozliczeniowe klienta.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          <form id="customerForm" onSubmit={handleSubmit} className="space-y-8">
            
            {/* Przełącznik Typu Klienta */}
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-3 block">Typ Klienta</label>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setType(0)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    type === 0 ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Osoba Prywatna
                </button>
                <button
                  type="button"
                  onClick={() => setType(1)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    type === 1 ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Firma (B2B)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {type === 1 && (
                <>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nazwa Firmy *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="block w-full px-4 py-3 bg-gray-50 border-0 text-gray-900 rounded-xl ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                      placeholder="Moja Firma Sp. z o.o."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">NIP *</label>
                    <input
                      type="text"
                      required
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="block w-full px-4 py-3 bg-gray-50 border-0 text-gray-900 rounded-xl ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-emerald-500 font-mono"
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kraj *</label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="block w-full px-4 py-3 bg-gray-50 border-0 text-gray-900 rounded-xl ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                      placeholder="Polska"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Imię</label>
                <input
                  type="text"
                  required={type === 0}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border-0 text-gray-900 rounded-xl ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nazwisko</label>
                <input
                  type="text"
                  required={type === 0}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border-0 text-gray-900 rounded-xl ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-0 text-gray-900 rounded-xl ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-0 text-gray-900 rounded-xl ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Anuluj
          </button>
          <button
            type="submit"
            form="customerForm"
            disabled={mutation.isPending}
            className={`px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-sm transition-all ${
               type === 1 
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'
            } disabled:opacity-70`}
          >
            {mutation.isPending ? 'Zapisywanie...' : 'Zapisz Klienta'}
          </button>
        </div>

      </div>
    </div>
  );
};
