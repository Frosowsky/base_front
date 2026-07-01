import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { Building2, CreditCard, Plug, Workflow, Palette, Settings2 } from 'lucide-react';
import { CompanySettings } from './components/CompanySettings';
import { OrderStatusesSettings } from './components/OrderStatusesSettings';
import { IntegrationsSettings } from './components/IntegrationsSettings';
import { CustomFieldsSettings } from './components/CustomFieldsSettings';

export const SettingsPage = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  const navigation = [
    { name: 'Firma i faktury', path: 'company', icon: Building2 },
    { name: 'Statusy zamówień', path: 'order-statuses', icon: Workflow },
    { name: 'Pola Niestandardowe', path: 'custom-fields', icon: Settings2 },
    { name: 'Integracje API', path: 'integrations', icon: Plug },
    { name: 'Wygląd (White Label)', path: 'appearance', icon: Palette },
    { name: 'Abonament i Płatności', path: 'billing', icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Ustawienia</h1>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive || (currentPath === 'settings' && item.path === 'company')
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
             <div>
               <h2 className="text-xl font-bold text-gray-900 mb-4">{tabs.find(t => t.id === activeTab)?.name}</h2>
               <p className="text-gray-500">Konfiguracja w przygotowaniu (Wkrótce).</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
