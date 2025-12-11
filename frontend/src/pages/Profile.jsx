import { useAuth } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 style={{ color: '#e7edf7' }}>Mi perfil</h2>
      <div style={{ marginTop: '1rem', color: '#cbd5e1' }}>
        <p>Nombre: {user?.name}</p>
        <p>Correo: {user?.email}</p>
        <p>Rol: {user?.role}</p>
        <p>Suscripción: {user?.subscriptionStatus === 'ACTIVE' ? 'Activa' : 'Inactiva'}</p>
        {user?.subscriptionExpiresAt && <p>Expira: {new Date(user.subscriptionExpiresAt).toLocaleDateString()}</p>}
      </div>
    </div>
  );
};

export default Profile;
