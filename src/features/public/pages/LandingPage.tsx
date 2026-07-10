import { Link, useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

import heroImg from '../../../assets/images/LandingPage.png';
import registroLoteImg from '../../../assets/images/LandingPage1Registro.png';
import empresasImg from '../../../assets/images/LandingPageEmpresas.png';
import organizacionesImg from '../../../assets/images/LandingPageOrganizaciones.png';
import compradoresImg from '../../../assets/images/LandingPageCompradores.png';

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleSmartRedirect = (targetPath: string) => {
    navigate('/login', { state: { redirectTo: targetPath } });
  };

  return (
    <div className={styles.landingContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAF7F0" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <span className={styles.logoText}>FoodLink</span>
        </div>
        <div className={styles.navActions}>
          <Link to="/login" className={styles.loginLink}>Ingresar</Link>
          <button onClick={() => handleSmartRedirect('/registro/comercio')} className={styles.navPrimaryBtn}>
            Donar Alimento
          </button>
        </div>
      </nav>

      <header className={styles.heroSection} style={{ backgroundImage: `url(${heroImg})` }}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Rescate de alimentos en Quito</span>
          <h1 className={styles.heroTitle}>Dignidad y abundancia para todos.</h1>
          <p className={styles.heroSubtitle}>
            Conectamos el excedente de los mejores restaurantes y productores con organizaciones sociales para erradicar el desperdicio y nutrir a nuestra comunidad.
          </p>
          <div className={styles.heroButtons}>
            <button onClick={() => handleSmartRedirect('/registro/comercio')} className={styles.heroPrimaryBtn}>
              Publicar excedentes
            </button>
            <button onClick={() => handleSmartRedirect('/registro/beneficiario')} className={styles.heroSecondaryBtn}>
              Registrar organización
            </button>
          </div>
        </div>
      </header>

      <section className={styles.statsSection}>
        <div className={styles.statBox}>
          <div className={styles.statIconWrapper}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FAF7F0" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          </div>
          <h2>500kg+</h2>
          <p className={styles.statLabel}>ALIMENTOS RESCATADOS</p>
          <p className={styles.statDesc}>Impacto directo en la seguridad alimentaria de Quito este mes.</p>
        </div>
        
        <div className={styles.statBox}>
          <div className={styles.statIconWrapper}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FAF7F0" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
          </div>
          <h2>45+</h2>
          <p className={styles.statLabel}>RESTAURANTES ALIADOS</p>
          <p className={styles.statDesc}>Establecimientos comprometidos con la reducción del desperdicio.</p>
        </div>

        <div className={styles.statBox}>
          <div className={styles.statIconWrapper}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FAF7F0" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <h2>12k</h2>
          <p className={styles.statLabel}>VIDAS IMPACTADAS</p>
          <p className={styles.statDesc}>Familias que acceden a productos de alta calidad nutricional.</p>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.processHeader}>
          <div>
            <h2>Cómo transformamos el excedente</h2>
            <p className={styles.processSectionSub}>Un proceso eficiente, transparente y digno para fortalecer el tejido social de nuestra ciudad.</p>
          </div>
          <a href="#metodologia" className={styles.linkVerMas}>Ver metodología completa →</a>
        </div>
        
        <div className={styles.processGrid}>
          <div className={styles.processMainCard} style={{ backgroundImage: `url(${registroLoteImg})` }}>
            <div className={styles.processMainContent}>
              <h3>1. Registro de Lote</h3>
              <p>Los establecimientos publican sus excedentes diarios a través de nuestra plataforma en segundos.</p>
            </div>
          </div>
          
          <div className={styles.processSideColumn}>
            <div className={styles.processSideCardGreen}>
              <div className={styles.sideCardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FAF7F0" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 12l2 2 4-4"/></svg>
              </div>
              <h3>2. Verificación</h3>
              <p>Garantizamos los estándares de calidad y seguridad alimentaria de cada donación.</p>
            </div>
            
            <div className={styles.processSideCardTerracotta}>
              <div className={styles.sideCardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FAF7F0" strokeWidth="2"><rect width="16" height="12" x="2" y="6" rx="2"/><path d="M16 8h4l3 3v5h-7V8zM6 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM18 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
              </div>
              <h3>3. Distribución</h3>
              <p>Logística inteligente que conecta el punto de origen con la organización más cercana.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.rolesSection}>
        <h2 className={styles.rolesTitle}>Únete a la red FoodLink</h2>
        <div className={styles.rolesGrid}>
          <div className={styles.roleCard}>
            <div className={styles.roleImgPlaceholderOne} style={{ backgroundImage: `url(${empresasImg})` }}></div>
            <h3>Empresas</h3>
            <p>Convierte tu desperdicio en impacto social y obtén beneficios tributarios mientras cuidas el planeta.</p>
            <button onClick={() => handleSmartRedirect('/registro/comercio')} className={styles.roleCardBtn}>Publicar excedentes</button>
          </div>
          
          <div className={styles.roleCard}>
            <div className={styles.roleImgPlaceholderTwo} style={{ backgroundImage: `url(${organizacionesImg})` }}></div>
            <h3>Organizaciones</h3>
            <p>Accede a suministros constantes de alimentos frescos y de calidad para potenciar tu labor social.</p>
            <button onClick={() => handleSmartRedirect('/registro/beneficiario')} className={styles.roleCardBtn}>Registrar organización</button>
          </div>
          
          <div className={styles.roleCard}>
            <div className={styles.roleImgPlaceholderThree} style={{ backgroundImage: `url(${compradoresImg})` }}></div>
            <h3>Compradores</h3>
            <p>Adquiere canastas de productos rescatados a precios preferenciales y apoya el ecosistema.</p>
            <button onClick={() => handleSmartRedirect('/registro/comprador')} className={styles.roleCardBtn}>Quiero comprar</button>
          </div>
        </div>
      </section>

      <footer className={styles.footerSection}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>
            <div className={styles.logoIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FAF7F0" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <span>FoodLink</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#privacidad">Privacidad</a>
            <a href="#terminos">Términos</a>
            <a href="#contacto">Contacto</a>
            <a href="#alianzas">Alianzas</a>
          </div>
          <div className={styles.footerSocials}>
            <div className={styles.socialIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17241D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
            </div>
            <div className={styles.socialIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17241D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 FoodLink Quito. Dignidad y Abundancia para todos.</p>
        </div>
      </footer>
    </div>
  );
};