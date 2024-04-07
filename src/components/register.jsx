import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './register.module.css';

const Register = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDate: '',
        email: '',
        idCard: '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('El nombre es requerido'),
        lastName: Yup.string().required('El apellido es requerido'),
        phoneNumber: Yup.string()
                        .required('El número de celular es requerido')
                        .test('startsWith549', 'El número de celular debe comenzar con +549', (value) => {
                            return value.startsWith('+549');
                        }),
        birthDate: Yup.date().required('La fecha de nacimiento es requerida'),
        email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
        idCard: Yup.number().required('El DNI es requerido'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
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
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? <p>{formik.errors.firstName}</p> : null}
                </div>
                <div className={styles['input-box']}>
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? <p>{formik.errors.lastName}</p> : null}
                </div>
                <div className={styles.column}>
                    <div className={styles['input-box']}>
                        <label>Numero de celular</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={handlePhoneNumberChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p>{formik.errors.phoneNumber}</p> : null}
                    </div>
                    <div className={styles['input-box']}>
                        <label>Fecha de nacimiento</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formik.values.birthDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.birthDate && formik.errors.birthDate ? <p>{formik.errors.birthDate}</p> : null}
                    </div>
                </div>
                <div className={styles['input-box'] + ' ' + styles.address}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
                    <label>DNI</label>
                    <div className={styles.column}>
                        <input
                            type="number"
                            name="idCard"
                            value={formik.values.idCard}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.idCard && formik.errors.idCard ? <p>{formik.errors.idCard}</p> : null}
                    </div>
                </div>
                <button type="submit">Registrar</button>
            </form>
        </section>
    );
};

export default Register;
