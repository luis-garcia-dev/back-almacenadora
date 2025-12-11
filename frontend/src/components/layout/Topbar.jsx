import { useAuth } from '../../context/AuthContext.jsx';
import './layout.css';

const Topbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="topbar">
      <div>
        <p className="muted">Panel</p>
        <h3>Bienvenido, {user?.name}</h3>
      </div>
      <div className="topbar-actions">
        <span className="badge">{user?.role}</span>
        <button className="ghost" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Topbar;
