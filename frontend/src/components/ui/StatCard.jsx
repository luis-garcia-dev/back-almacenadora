import './ui.css';

const StatCard = ({ title, value, hint }) => {
  return (
    <div className="stat-card">
      <p className="muted">{title}</p>
      <h3>{value}</h3>
      {hint && <small>{hint}</small>}
    </div>
  );
};

export default StatCard;
