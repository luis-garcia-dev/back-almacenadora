import { useEffect, useState } from 'react';
import Table from '../components/ui/Table.jsx';
import { fetchMovements } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Movements = () => {
  const { token } = useAuth();
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      const data = await fetchMovements(token);
      setMovements(data);
    };
    load();
  }, [token]);

  return (
    <div>
      <h2 style={{ color: '#e7edf7' }}>Movimientos</h2>
      <Table
        headers={['Producto', 'Tipo', 'Cantidad', 'Fecha', 'Usuario']}
        data={movements.map((m) => [m.product?.name, m.type, m.quantity, new Date(m.date).toLocaleDateString(), m.user?.name])}
      />
    </div>
  );
};

export default Movements;
