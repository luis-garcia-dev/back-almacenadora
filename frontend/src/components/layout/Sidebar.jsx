import { NavLink } from 'react-router-dom';
import './layout.css';

const Sidebar = () => {
  const links = [
    { to: '/dashboard', label: 'Resumen' },
    { to: '/dashboard/products', label: 'Productos' },
    { to: '/dashboard/movements', label: 'Movimientos' },
    { to: '/dashboard/categories', label: 'Categorías' },
    { to: '/dashboard/providers', label: 'Proveedores' },
    { to: '/dashboard/clients', label: 'Clientes' },
    { to: '/dashboard/reports', label: 'Reportes' },
    { to: '/dashboard/profile', label: 'Perfil' }
  ];

  return (
    <aside className="sidebar">
      <div className="logo">NovaStorage</div>
      <nav>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
