import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RegistroCompradorPage.module.css';
import Alert from '../../../components/ui/Alert';
import PasswordInput from '../../../components/ui/PasswordInput';
import { useForm } from '../../../hooks/useForm';
import { registrarComprador } from '../services/compradorService';
import { validarComprador } from '../validation/compradorValidation';
import type { DatosRegistroComprador } from '../types/comprador.types';

import loginCompradorImg from '../../../assets/images/LoginComprador.png';

const VALORES_INICIALES: DatosRegistroComprador = {
  cedula: '',
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  password: '',
};

export default function RegistroCompradorPage() {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const form = useForm<DatosRegistroComprador>({
    initialValues: VALORES_INICIALES,
    validate: validarComprador,
    onSubmit: async (values) => {
      await registrarComprador(values);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.brandTitle}>FoodLink</Link>
        <div className={styles.topBarLinks}>
          <Link to="/" className={styles.topBackLink}>⬅ Volver al inicio</Link>
          <Link to="/login" className={styles.topLoginLink}>¿Ya tienes cuenta? Ingresar</Link>
        </div>
      </div>

      <div className={styles.mainWrapper}>
        <div className={styles.leftBanner} style={{ backgroundImage: `url(${loginCompradorImg})` }}>
          <div className={styles.bannerOverlay}>
            <h2>Únete al rescate con dignidad.</h2>
            <p>Como comprador personal, accedes a alimentos de alta calidad mientras reduces el desperdicio en nuestra ciudad.</p>
          </div>
        </div>

        <div className={styles.rightFormColumn}>
          {form.submitSuccess ? (
            <Alert variant="success" title="¡Cuenta creada!">
              Bienvenido/a <strong>{form.values.nombre}</strong>, tu cuenta fue registrada correctamente.{' '}
              <Link to="/login">Ir a iniciar sesión</Link>
            </Alert>
          ) : (
            <>
              <div className={styles.formHeader}>
                <h2>Crear Cuenta Persona Natural</h2>
                <p>Completa tus datos para empezar a comprar lotes rescatados.</p>
              </div>

              {form.submitError && (
                <Alert variant="error" title="No pudimos completar el registro">{form.submitError}</Alert>
              )}

              <form onSubmit={form.handleSubmit} className={styles.form} noValidate>
                <div className={styles.rowTwo}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Ej. Juan"
                      value={form.values.nombre}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errorFor('nombre') && <span className={styles.fieldError}>{form.errorFor('nombre')}</span>}
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="apellido">Apellido</label>
                    <input
                      id="apellido"
                      name="apellido"
                      type="text"
                      placeholder="Ej. Pérez"
                      value={form.values.apellido}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errorFor('apellido') && <span className={styles.fieldError}>{form.errorFor('apellido')}</span>}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="cedula">Número de Cédula</label>
                  <input
                    id="cedula"
                    name="cedula"
                    type="text"
                    inputMode="numeric"
                    placeholder="0000000000"
                    maxLength={10}
                    value={form.values.cedula}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  {form.errorFor('cedula') && <span className={styles.fieldError}>{form.errorFor('cedula')}</span>}
                </div>

                <div className={styles.rowTwo}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@correo.com"
                      value={form.values.email}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errorFor('email') && <span className={styles.fieldError}>{form.errorFor('email')}</span>}
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="text"
                      inputMode="tel"
                      placeholder="099 999 9999"
                      value={form.values.telefono}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.errorFor('telefono') && <span className={styles.fieldError}>{form.errorFor('telefono')}</span>}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="password">Contraseña</label>
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.values.password}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  {form.errorFor('password') && <span className={styles.fieldError}>{form.errorFor('password')}</span>}
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

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={form.isSubmitting || !termsAccepted}
                  aria-busy={form.isSubmitting}
                >
                  {form.isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
                  {form.isSubmitting ? 'Procesando…' : 'Completar Registro'}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
