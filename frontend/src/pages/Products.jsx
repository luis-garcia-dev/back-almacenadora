import { useEffect, useState } from 'react';
import Table from '../components/ui/Table.jsx';
import { fetchProducts } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Products = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      const data = await fetchProducts(token, search ? { search } : {});
      setProducts(data);
    };
    load();
  }, [token, search]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#e7edf7' }}>Productos</h2>
        <input
          style={{ padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid #1f2f40', background: '#0c1826', color: '#e7edf7' }}
          placeholder="Buscar nombre o SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table
        headers={['Nombre', 'SKU', 'Stock', 'Mínimo', 'Categoría']}
        data={products.map((p) => [p.name, p.sku, p.stock, p.minStock, p.category?.name])}
      />
    </div>
  );
};

export default Products;
