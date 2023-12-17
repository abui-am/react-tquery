import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProductsKeys } from '../../utils/keys';
import dayjs from 'dayjs';

const useProductsQuery = ({ page, date }) => {
  return useQuery({
    queryKey: ProductsKeys.list({
      page,
      date: dayjs(date).format('YYYY-MM-DD-HH:mm'),
    }),
    queryFn: async () => {
      const res = await axios.get('https://dummyjson.com/products', {
        params: {
          limit: 5,
          skip: (page - 1) * 5,
          date: date,
        },
      });
      return res.data;
    },
    staleTime: 1000 * 30,
  });
};

export default useProductsQuery;
