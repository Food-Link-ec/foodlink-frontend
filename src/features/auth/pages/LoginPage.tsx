import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginComercio } from '../services/LoginService';
import Alert from '../../../components/ui/Alert';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      await loginComercio({ email, password });
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMsg(error.message || 'Correo o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <Link to="/" className={styles.backLink}>⬅ Volver al inicio</Link>

        <div className={styles.logoBadge}>
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="20" rx="4" fill="#1F4D3C"/>
            <path d="M12 10c0 3 4 5 8 5s8-2 8-5-4-5-8-5-8 2-8 5z" stroke="#FAF7F0" strokeWidth="2"/>
            <path d="M20 5v10" stroke="#FAF7F0" strokeWidth="2"/>
          </svg>
        </div>

        <h1 className={styles.title}>
          Rescatando el <span className={styles.textTerracotta}>Sabor</span>,<br />
          Nutriendo el <span className={styles.textGold}>Futuro</span>.
        </h1>
        
        <p className={styles.subtitle}>
          Únete a la red de abundancia digna de Quito.<br />
          Conectamos excedentes gastronómicos con<br />
          quienes más los necesitan.
        </p>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#873e23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
            <h3>500kg+</h3>
            <p>Rescatados Semanalmente</p>
          </div>
          <div className={styles.statCard}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#873e23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <h3>120+</h3>
            <p>Alianzas Activas</p>
          </div>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <h2>Ingresar</h2>
            <p>Bienvenido de vuelta a FoodLink Quito.</p>
          </div>

          {errorMsg && (
            <Alert variant="error" title="Acceso denegado">{errorMsg}</Alert>
          )}

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Correo Electrónico</label>
              <div className={styles.inputWrapper}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667A70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input 
                  type="email" 
                  placeholder="ejemplo@foodlink.ec" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordHeader}>
                <label>Contraseña</label>
                <Link to="#" className={styles.forgotLink}>¿Olvidaste tu contraseña?</Link>
              </div>
              <div className={styles.inputWrapper}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667A70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className={styles.registerSection}>
            <p className={styles.registerTitle}>¿NUEVO EN FOODLINK?</p>
            
            <Link to="/registro/comercio" className={styles.registerBtn}>
              <div className={styles.btnLeft}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F4D3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>
                <div className={styles.btnText}>
                  <h4>Negocio</h4>
                  <span>Restaurantes, Mercados</span>
                </div>
              </div>
              <span className={styles.chevron}>›</span>
            </Link>

            <Link to="/registro/beneficiario" className={styles.registerBtn}>
              <div className={styles.btnLeft}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F4D3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <div className={styles.btnText}>
                  <h4>Organización</h4>
                  <span>Fundaciones, Comedores</span>
                </div>
              </div>
              <span className={styles.chevron}>›</span>
            </Link>

            <Link to="/registro/comprador" className={styles.registerBtn}>
              <div className={styles.btnLeft}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F4D3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 11 4-7"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m9 11 1 9"/><path d="M15 11l-1 9"/></svg>
                <div className={styles.btnText}>
                  <h4>Comprador</h4>
                  <span>Impacto Individual</span>
                </div>
              </div>
              <span className={styles.chevron}>›</span>
            </Link>
          </div>

          <div className={styles.footer}>
            <Link to="#">Privacidad</Link>
            <span className={styles.dot}>•</span>
            <Link to="#">Términos</Link>
            <span className={styles.dot}>•</span>
            <Link to="#">Ayuda</Link>
          </div>
        </div>
      </div>
    </div>
  );
};