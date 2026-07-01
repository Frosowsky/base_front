import { useMutation } from '@tanstack/react-query';
import { api } from '../../../lib/axios';

export type CreateOrderDTO = {
  customerName: string;
  totalAmount: number;
};

export const createOrder = async (data: CreateOrderDTO) => {
  const response = await api.post('/api/orders', data);
  return response.data;
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
