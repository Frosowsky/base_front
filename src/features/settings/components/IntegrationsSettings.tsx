import React from 'react';
import { Package, Truck, FileText, ShoppingBag, Database, Power, CheckCircle2, ChevronRight } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const CATEGORIES = [
  { id: 'faktury', name: 'Faktury i Księgowość' },
  { id: 'wysylka', name: 'Kurierzy i Wysyłka' },
  { id: 'marketplace', name: 'Marketplace' },
  { id: 'erp', name: 'ERP i Magazyn' },
  { id: 'hurtownie', name: 'Hurtownie' },
];

const ICONS_MAP: Record<string, React.ElementType> = {
  FileText: FileText,
  Truck: Truck,
  ShoppingBag: ShoppingBag,
  Database: Database,
  Package: Package
};

export const IntegrationsSettings = () => {
  const queryClient = useQueryClient();

  const { data: integrations = [], isLoading } = useQuery({
    queryKey: ['integrations'],
    queryFn: async () => {
      const response = await fetch('/api/Integrations');
      if (!response.ok) throw new Error('Failed to fetch integrations');
      return response.json();
    }
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/Integrations/${id}/toggle`, { method: 'PUT' });
      if (!response.ok) throw new Error('Failed to toggle integration');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    }
  });

  if (isLoading) return <div>Ładowanie...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Integracje</h2>
        <p className="text-sm text-gray-500 mt-1">Połącz swój sklep z zewnętrznymi platformami aby zautomatyzować pracę.</p>
      </div>

      <div className="space-y-10">
        {CATEGORIES.map(category => {
          const categoryIntegrations = integrations.filter((i: any) => i.category === category.id);
          
          if (categoryIntegrations.length === 0) return null;

          return (
            <div key={category.id} className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">
                {category.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryIntegrations.map((integration: any) => {
                  const IconComponent = ICONS_MAP[integration.iconName] || Package;

                  return (
                    <div 
                      key={integration.id} 
                      className={`relative p-5 rounded-2xl border-2 transition-all duration-200 group flex flex-col justify-between h-40 ${
                        integration.isActive 
                          ? 'border-blue-500 shadow-md shadow-blue-100 bg-white' 
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-white'
                      }`}
                    >
                      {integration.isActive && (
                        <div className="absolute top-4 right-4 text-blue-500 bg-blue-50 rounded-full p-1 shadow-sm">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${integration.colorClass}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1 pr-6">
                          <h4 className="font-bold text-gray-900">{integration.name}</h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {integration.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => toggleMutation.mutate(integration.id)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                            integration.isActive 
                              ? 'text-red-600 hover:bg-red-50' 
                              : 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm'
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
                          {integration.isActive ? 'Wyłącz integrację' : 'Włącz integrację'}
                        </button>
                        
                        {integration.isActive && (
                           <button className="text-gray-400 hover:text-blue-600 text-xs font-medium flex items-center gap-1 transition-colors">
                             Konfiguruj <ChevronRight className="w-3.5 h-3.5" />
                           </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
