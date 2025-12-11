import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import Movements from './pages/Movements.jsx';
import Categories from './pages/Categories.jsx';
import Providers from './pages/Providers.jsx';
import Clients from './pages/Clients.jsx';
import Reports from './pages/Reports.jsx';
import Profile from './pages/Profile.jsx';
import Plans from './pages/Plans.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

const PrivateRoute = ({ children, subscriptionRequired = true }) => {
  const { isAuthenticated, hasActiveSubscription } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (subscriptionRequired && !hasActiveSubscription) return <Navigate to="/plans" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plans" element={<Plans />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Reports />} />
          <Route path="products" element={<Products />} />
          <Route path="movements" element={<Movements />} />
          <Route path="categories" element={<Categories />} />
          <Route path="providers" element={<Providers />} />
          <Route path="clients" element={<Clients />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
