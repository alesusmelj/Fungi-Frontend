import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './register.module.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = () => {
 const navigate = useNavigate(); // Utiliza useNavigate para manejar las redirecciones

 const initialValues = {
    email: '',
    password: '',
 };

 const validationSchema = Yup.object({
    email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
 });

 const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8080/landing-page/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Error al iniciar sesión');
        }

        const loginData = await response.json();
        sessionStorage.setItem('loginData', JSON.stringify(loginData));
        navigate('/home');
      } catch (error) {
        console.error(error);
        // Aquí puedes manejar los errores, por ejemplo, mostrando un mensaje al usuario
      }
    },
 });

 return (
    <section className={styles.container}>
      <header>Login</header>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles['input-box']}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
        </div>
        <div className={styles['input-box']}>
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            required
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
 );
};

export default Login;