import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateOrder } from '../api/createOrder';

const orderSchema = z.object({
  customerName: z.string().min(2, 'Imię/Nazwa musi mieć min. 2 znaki'),
  totalAmount: z.number().min(0.01, 'Kwota musi być większa od zera'),
});

type OrderFormValues = z.infer<typeof orderSchema>;

export const CreateOrderForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
  });
  
  const createOrderMutation = useCreateOrder();

  const onSubmit = (data: OrderFormValues) => {
    createOrderMutation.mutate(data, {
      onSuccess: () => {
        alert('Zamówienie utworzone pomyślnie!');
      },
      onError: (error) => {
        console.error('Wystąpił błąd:', error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Nowe Zamówienie</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa Klienta</label>
        <input 
          {...register('customerName')} 
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Jan Kowalski"
        />
        {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Całkowita Kwota</label>
        <input 
          type="number"
          step="0.01"
          {...register('totalAmount', { valueAsNumber: true })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="99.99"
        />
        {errors.totalAmount && <p className="text-red-500 text-xs mt-1">{errors.totalAmount.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={createOrderMutation.isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-50"
      >
        {createOrderMutation.isPending ? 'Wysyłanie...' : 'Utwórz Zamówienie'}
      </button>
    </form>
  );
};
