import { useEffect, useState } from 'react';
import StatCard from '../components/ui/StatCard.jsx';
import Table from '../components/ui/Table.jsx';
import { fetchDashboard } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Reports = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      const data = await fetchDashboard(token);
      setStats(data);
    };
    load();
  }, [token]);

  return (
    <div>
      <h2 style={{ color: '#e7edf7' }}>Resumen de inventario</h2>
      <div className="grid" style={{ gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <StatCard title="Productos" value={stats?.totalProducts ?? '...'} />
        <StatCard title="Bajo stock" value={stats?.lowStock ?? '...'} hint="stock <= minStock" />
        <StatCard title="Movimientos 7 días" value={stats?.movementsLastDays ?? '...'} />
        <StatCard title="Valor inventario" value={`$${stats?.inventoryValue?.toLocaleString() ?? '...'}`} />
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ color: '#e7edf7' }}>Top salidas</h3>
        <Table
          headers={['Producto', 'Cantidad']}
          data={(stats?.topExits || []).map((item) => [item._id, item.total])}
        />
      </div>
    </div>
  );
};

export default Reports;
