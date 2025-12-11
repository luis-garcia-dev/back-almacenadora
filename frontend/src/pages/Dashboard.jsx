import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';
import Topbar from '../components/layout/Topbar.jsx';
import '../components/layout/layout.css';

const Dashboard = () => {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
