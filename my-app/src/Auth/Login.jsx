import { Formik, Field, Form, ErrorMessage} from 'formik';
import React from 'react';
import * as Yup from 'yup';
import styles from './Form.module.css';

const initialValues = {
    
    email: '',
    password: ''
    
};
const LoginSchema = Yup.object().shape({
    
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(20).required(),
    
})
const submitHandler = (values, formikBag) => {
    console.log(values);
    formikBag.resetForm();
}
const Login = ({ toggleForm }) => {
    return (
        <div className={styles.loginForm}>
            <h2>Login</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={LoginSchema}
            >
                {({ values }) => (
                    <Form>
                        

                        <div className={styles.field}>
                            <Field
                                name="email"
                                type="email"
                                placeholder="Email"
                                className={styles.input}
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className={styles.invalid}
                            />
                        </div>

                        <div className={styles.field}>
                            <Field
                                name="password"
                                type="password"
                                placeholder="Password"
                                className={styles.input}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className={styles.invalid}
                            />
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.button}>
                                Submit
                            </button>
                        </div>

                        <div className={styles.footer}>
                            <p>Don't have an account?</p>
                            <button type="button" onClick={toggleForm} className={styles.linkButton}>
                                Register
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;