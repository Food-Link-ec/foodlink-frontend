import React, { useState } from 'react';
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
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

            <div className={styles.rowTwo}>
              <div className={styles.inputGroup}>
                <label>Contraseña</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Confirmar Contraseña</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
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