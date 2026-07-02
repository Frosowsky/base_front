import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Save, AlertCircle } from 'lucide-react';

interface InPostSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  integrationId: string;
}

export const InPostSettingsModal: React.FC<InPostSettingsModalProps> = ({
  isOpen,
  onClose,
  integrationId
}) => {
  const queryClient = useQueryClient();
  const [organizationId, setOrganizationId] = useState('');
  const [apiKey, setApiKey] = useState('');

  const { data: settings, isLoading } = useQuery({
    queryKey: ['integrationSettings', integrationId, 'inpost'],
    queryFn: async () => {
      const response = await fetch(`/api/Integrations/${integrationId}/settings/inpost`);
      if (!response.ok) throw new Error('Failed to fetch settings');
      return response.json();
    },
    enabled: isOpen && !!integrationId,
  });

  useEffect(() => {
    if (settings) {
      setOrganizationId(settings.organizationId || '');
      setApiKey(settings.apiKey || '');
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (newSettings: { organizationId: string; apiKey: string }) => {
      const response = await fetch(`/api/Integrations/${integrationId}/settings/inpost`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (!response.ok) throw new Error('Failed to save settings');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrationSettings', integrationId] });
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
      onClose();
    }
  });

  const handleSave = () => {
    updateMutation.mutate({ organizationId, apiKey });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900">Konfiguracja InPost</h3>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {isLoading ? (
            <div className="py-8 text-center text-gray-500">Ładowanie ustawień...</div>
          ) : (
            <>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Wprowadź dane dostępowe do API ShipX (InPost). Zapisanie poprawnych danych automatycznie aktywuje integrację.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-900">ID Organizacji</label>
                  <input
                    type="text"
                    value={organizationId}
                    onChange={(e) => setOrganizationId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Np. 12345"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-900">Klucz API (Token)</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Wprowadź token API"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 bg-gray-100 rounded-xl transition-colors"
          >
            Anuluj
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || updateMutation.isPending}
            className="px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-600/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {updateMutation.isPending ? (
              'Zapisywanie...'
            ) : (
              <>
                <Save className="w-4 h-4" />
                Zapisz ustawienia
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
