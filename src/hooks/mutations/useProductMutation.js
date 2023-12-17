import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ProductsKeys } from '../../utils/keys';

const useProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title }) => {
      const response = await axios.post('https://dummyjson.com/products/add', {
        title,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(ProductsKeys.all);
    },
  });
};

export default useProductMutation;
