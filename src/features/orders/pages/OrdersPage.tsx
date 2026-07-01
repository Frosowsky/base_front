import { CreateOrderForm } from '../components/CreateOrderForm';

export const OrdersPage = () => (
  <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
    <h1 className="text-3xl font-bold mb-4 text-gray-900">Zamówienia</h1>
    <CreateOrderForm />
  </div>
);
