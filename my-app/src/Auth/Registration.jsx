import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import styles from './Form.module.css';

const initialValues = {
    name: '',
    password: '',
    image: '',
    description: '',
};


const submitHandler = async (values, formikBag) => {
    try {
        const response = await fetch('/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Registration successful:", data);
            formikBag.resetForm();
        } else {
            console.error("Registration failed:", data.message);
            alert(`Registration failed: ${data.message}`);
        }
    } catch (error) {
        console.error("An error occurred during registration:", error);
        alert("An error occurred. Please try again.");
    }
};


const RegistrationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too short").max(50, "Too long").required("Name is required!"),
    password: Yup.string().min(4).max(20).required("Password is required!"),
    image: Yup.string().url("Must be a valid URL").required("Image URL is required!"),
    description: Yup.string().min(5, "Description too short").max(100, "Description too long").required("Description is required!"),
});

const Registration = ({ toggleForm }) => {
    return (
        <div className={styles.registrationForm}>
            <h2>Registration</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={RegistrationSchema}
            >
                {() => (
                    <Form>
                        <div className={styles.field}>
                            <Field
                                name="name"
                                type="text"
                                placeholder="Name"
                                className={styles.input}
                            />
                            <ErrorMessage
                                name="name"
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

                        <div className={styles.field}>
                            <Field
                                name="image"
                                type="text"
                                placeholder="Image URL"
                                className={styles.input}
                            />
                            <ErrorMessage
                                name="image"
                                component="div"
                                className={styles.invalid}
                            />
                        </div>

                        <div className={styles.field}>
                            <Field
                                name="description"
                                type="text"
                                placeholder="Description"
                                className={styles.input}
                            />
                            <ErrorMessage
                                name="description"
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
                            <p>Already have an account?</p>
                            <button type="button" onClick={toggleForm} className={styles.linkButton}>
                                Login
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Registration;
