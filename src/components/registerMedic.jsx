import React from 'react';
import { useFormik } from 'formik';
import styles from './register.module.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const RegisterMedic = () => {
 const navigate = useNavigate(); // Utiliza useNavigate para manejar las redirecciones

 const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    idCard: '',
    specialty: '',
 };

 const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        // Primer fetch para registrar al doctor
        const response = await fetch('http://localhost:8080/landing-page/register-doctor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Error al registrar al doctor');
        }

        // Segundo fetch para hacer login
        const loginResponse = await fetch('http://localhost:8080/landing-page/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: values.email, password: values.password }),
        });

        if (!loginResponse.ok) {
          throw new Error('Error al iniciar sesión');
        }

        // Si todo es exitoso, guarda la información en sessionStorage y redirige a /home
        const loginData = await loginResponse.json();
        sessionStorage.setItem('loginData', JSON.stringify(loginData));
        navigate('/');
      } catch (error) {
        console.error(error);
        // Aquí puedes manejar los errores, por ejemplo, mostrando un mensaje al usuario
      }
    },
 });
 return (
    <section className={styles.container}>
      <header>Registro Medico</header>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles['input-box']}>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Ingrese su nombre completo"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
          />
        </div>
        <div className={styles['input-box']}>
          <label>Apellido</label>
          <input
            type="text"
            placeholder="Ingrese su apellido"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
          />
        </div>
        <div className={styles.column}>
          <div className={styles['input-box']}>
            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="Ingrese su dirección de correo electrónico"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className={styles['input-box'] + ' ' + styles.address}>
          <label>Número de Licencia</label>
          <input
            type="text"
            placeholder="Ingrese su número de licencia"
            name="idCard"
            value={formik.values.idCard}
            onChange={formik.handleChange}
          />
          <label>Especialidad</label>
          <div className={styles.column}>
            <input
              type="text"
              placeholder="Ingrese su especialidad"
              name="specialty"
              value={formik.values.specialty}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
 );
};

export default RegisterMedic;
