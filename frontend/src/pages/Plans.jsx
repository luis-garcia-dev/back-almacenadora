import { useEffect, useState } from 'react';
import { fetchPlans } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import './plans.css';

const Plans = ({ embedded }) => {
  const [plans, setPlans] = useState([]);
  const { subscribe, isAuthenticated, hasActiveSubscription } = useAuth();

  useEffect(() => {
    fetchPlans().then(setPlans);
  }, []);

  const choose = async (planId) => {
    await subscribe(planId);
  };

  return (
    <div className={embedded ? 'embedded-plans' : 'plans-page'}>
      {!embedded && <h2 style={{ color: '#e7edf7' }}>Elige el plan que se ajuste a tu operación</h2>}
      <div className="plan-grid">
        {plans.map((plan) => (
          <div key={plan._id} className="plan-card">
            <p className="muted">{plan.durationInDays} días</p>
            <h3>{plan.name}</h3>
            <h1>${plan.price}</h1>
            <ul>
              {(plan.features || []).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {isAuthenticated ? (
              <button onClick={() => choose(plan._id)} disabled={hasActiveSubscription}>
                {hasActiveSubscription ? 'Suscripción activa' : 'Elegir plan'}
              </button>
            ) : (
              <a className="btn primary" href="/register">
                Crear cuenta
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
