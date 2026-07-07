import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegistroCompradorPage.module.css';

import loginCompradorImg from '../../../assets/images/LoginComprador.png';

export default function RegistroCompradorPage() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!termsAccepted) return;
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <span className={styles.brandTitle}>FoodLink</span>
        <Link to="/login" className={styles.topLoginLink}>¿Ya tienes cuenta? Ingresar</Link>
      </div>

      <div className={styles.mainWrapper}>
        <div className={styles.leftBanner} style={{ backgroundImage: `url(${loginCompradorImg})` }}>
          <div className={styles.bannerOverlay}>
            <h2>Únete al rescate con dignidad.</h2>
            <p>Como comprador personal, accedes a alimentos de alta calidad mientras reduces el desperdicio en nuestra ciudad.</p>
          </div>
        </div>

        <div className={styles.rightFormColumn}>
          <div className={styles.formHeader}>
            <h2>Crear Cuenta Persona Natural</h2>
            <p>Completa tus datos para empezar a comprar lotes rescatados.</p>
          </div>

          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.rowTwo}>
              <div className={styles.inputGroup}>
                <label>Nombre</label>
                <input 
                  type="text" 
                  placeholder="Ej. Juan" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Apellido</label>
                <input 
                  type="text" 
                  placeholder="Ej. Pérez" 
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Número de Cédula</label>
              <input 
                type="text" 
                placeholder="000000000-0" 
                maxLength={10}
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required 
              />
            </div>

            <div className={styles.rowTwo}>
              <div className={styles.inputGroup}>
                <label>Correo Electrónico</label>
                <input 
                  type="email" 
                  placeholder="tu@correo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Teléfono</label>
                <input 
                  type="text" 
                  placeholder="099 999 9999" 
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: '40px' }}
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#667A70',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0
                  }}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required 
                />
                <span>Acepto los Términos de Servicio y la Política de Privacidad de FoodLink Quito.</span>
              </label>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Completar Registro
            </button>
          </form>

          <div className={styles.switchBusiness}>
            <p>¿Representas a una empresa o restaurante? <Link to="/registro/comercio">Registrarse como Comercio</Link></p>
          </div>

          <div className={styles.footerNav}>
            <Link to="#">Privacidad</Link>
            <span>•</span>
            <Link to="#">Ayuda</Link>
          </div>
        </div>
      </div>
    </div>
  );
}