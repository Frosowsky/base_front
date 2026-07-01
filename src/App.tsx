import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProductsPage } from './features/products/pages/ProductsPage';
import { CustomersPage } from './features/customers/pages/CustomersPage';
import { CreateOrderForm } from './features/orders/components/CreateOrderForm';
import { SettingsPage } from './features/settings/pages/SettingsPage';

const queryClient = new QueryClient();

// Placeholders for other pages
const OrdersPage = () => <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100"><h1 className="text-3xl font-bold mb-4 text-gray-900">Zamówienia</h1><CreateOrderForm /></div>;
const IntegrationsPage = () => <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100"><h1 className="text-3xl font-bold mb-4 text-gray-900">Integracje</h1><p className="text-gray-600 text-lg">Podłącz Allegro, InPost, Baselinker, itp.</p></div>;
const DocumentsPage = () => <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100"><h1 className="text-3xl font-bold mb-4 text-gray-900">Dokumenty</h1><p className="text-gray-600 text-lg">Faktury, paragony, listy przewozowe.</p></div>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/customers" replace />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="integrations" element={<IntegrationsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
