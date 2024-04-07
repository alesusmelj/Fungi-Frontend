import React from 'react';
import { useFormik } from 'formik';
import styles from './register.module.css';

const Register = () => {
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        idCard: '',
        phoneNumber: '',
        birthDate: '',
        doctorId: 1 // Hardcodeado como 1
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:8080/landing-page/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Error al registrar');
                }

                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        },
    });

    const handlePhoneNumberChange = (event) => {
      let value = event.target.value;
      
      if (value.startsWith('+549')) {
          value = value.substring(4); 
      }
     
      formik.setFieldValue('phoneNumber', '+549' + value);
    };

    return (
        <section className={styles.container}>
            <header>Registro de paciente</header>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles['input-box']}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={styles['input-box']}>
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={styles.column}>
                    <div className={styles['input-box']}>
                        <label>Numero de celular</label>
                        <input
                            type="text" // Cambiado a text para manejar el prefijo
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={handlePhoneNumberChange} // Usando el manejo personalizado
                        />
                    </div>
                    <div className={styles['input-box']}>
                        <label>Fecha de nacimiento</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formik.values.birthDate}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className={styles['input-box'] + ' ' + styles.address}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <label>DNI</label>
                    <div className={styles.column}>
                        <input
                            type="number"
                            name="idCard"
                            value={formik.values.idCard}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <button type="submit">Registrar</button>
            </form>
        </section>
    );
};

export default Register;
