import { Link } from 'react-router-dom';
import './landing.css';
import Plans from './Plans.jsx';

const Landing = () => {
  return (
    <div className="landing">
      <header className="hero">
        <div>
          <p className="accent">Tecnología industrial · Futurista</p>
          <h1>NovaStorage</h1>
          <h2>Control total de inventario por suscripción</h2>
          <p>
            Digitaliza tus bodegas, automatiza entradas y salidas y obtén reportes en segundos. Diseñado para equipos
            que necesitan visibilidad en tiempo real.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn primary">
              Comenzar
            </Link>
            <Link to="/plans" className="btn ghost">
              Ver planes
            </Link>
            <Link to="/login" className="btn subtle">
              Iniciar sesión
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <div className="orb" />
          <div className="grid" />
        </div>
      </header>

      <section className="section">
        <h3>Sobre NovaStorage</h3>
        <p>
          Nacimos en 2024 para ayudar a empresas a dejar atrás las hojas de cálculo. Nuestra misión es democratizar la
          tecnología de inventario con suscripciones flexibles, visión 360° de tus productos y alertas inteligentes.
        </p>
        <div className="columns">
          <div className="card">
            <h4>Misión</h4>
            <p>Hacer accesible la trazabilidad y automatización de inventario en cualquier tamaño de operación.</p>
          </div>
          <div className="card">
            <h4>Visión</h4>
            <p>Ser la plataforma de almacenaje favorita en LATAM por su simpleza, seguridad y velocidad.</p>
          </div>
          <div className="card">
            <h4>Valores</h4>
            <p>Seguridad, innovación, datos accionables y acompañamiento cercano a nuestros clientes.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>Cómo funciona</h3>
        <div className="steps">
          {["Regístrate", "Elige un plan", "Configura tu inventario", "Analiza tus reportes"].map((step, idx) => (
            <div key={step} className="step">
              <span>{idx + 1}</span>
              <h4>{step}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h3>Planes de suscripción</h3>
        <Plans embedded />
      </section>

      <footer className="footer">
        <p>© 2024 NovaStorage · Contacto: soporte@novastorage.app</p>
        <div className="footer-links">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Redes</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
