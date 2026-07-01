import React, { useState } from 'react';
import { Settings, Sliders, Palette, ShieldCheck, Mail, Database } from 'lucide-react';
import { OrderStatusesSettings } from '../components/OrderStatusesSettings';
import { IntegrationsSettings } from '../components/IntegrationsSettings';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('statuses');

  const tabs = [
    { id: 'general', name: 'Ogólne', icon: Settings },
    { id: 'statuses', name: 'Statusy Zamówień', icon: Sliders },
    { id: 'appearance', name: 'Wygląd', icon: Palette },
    { id: 'security', name: 'Bezpieczeństwo', icon: ShieldCheck },
    { id: 'notifications', name: 'Powiadomienia', icon: Mail },
    { id: 'integrations', name: 'Połączenia API', icon: Database },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Ustawienia</h1>
        <p className="text-gray-500 mt-1">Konfiguruj parametry swojego konta i aplikacji.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-2xl p-2 border border-gray-100 shadow-sm sticky top-24">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 shadow-sm shadow-blue-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className={`w-5 h-5 mr-3 transition-colors ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                }`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
           {activeTab === 'general' && (
             <div>
               <h2 className="text-xl font-bold text-gray-900 mb-4">Ogólne ustawienia</h2>
               <p className="text-gray-500">Miejsce na formularz z nazwą firmy, NIP, itp.</p>
             </div>
           )}
           
           {activeTab === 'statuses' && <OrderStatusesSettings />}
           
           {activeTab === 'integrations' && <IntegrationsSettings />}
           
           {['appearance', 'security', 'notifications'].includes(activeTab) && (
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
