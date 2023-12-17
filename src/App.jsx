import './App.css';
import { useState } from 'react';
import useProductsQuery from './hooks/queries/useProductsQuery';
import useProductMutation from './hooks/mutations/useProductMutation';

function App() {
  const [page, setPage] = useState(1);

  const { isLoading: isLoadingProduct, data } = useProductsQuery({
    page: page,
    date: new Date().toISOString(),
  });
  if (isLoadingProduct) {
    return <>Loading...</>;
  }
  return (
    <div>
      {data.products.map((product) => {
        return (
          <div key={product.id}>
            {product.brand}-{product.title}
          </div>
        );
      })}
      <button
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
      <ProductForm />
    </div>
  );
}

const ProductForm = () => {
  const [title, setTitle] = useState('');

  const { mutate: postAddProduct } = useProductMutation();
  return (
    <div>
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button
        onClick={() => {
          postAddProduct({ title });
        }}
      >
        Add
      </button>
    </div>
  );
};

export default App;
