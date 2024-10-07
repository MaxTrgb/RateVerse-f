import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import styles from './Form.module.css';

const initialValues = {
    name: '',
    email: '',
    password: '',
    phones: [
        {
            number: "+38",
        },
    ],
};

const submitHandler = (values, formikBag) => {
    console.log(values);
    formikBag.resetForm();
}

const RegistrationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too short").max(5, "Too long").required("Name is required!"),
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(20).required(),
    phones: Yup.array().of(
        Yup.object().shape({
            number: Yup.string().matches(/^\+380\d{9}$/, "Invalid phone number").required()
        })
    )
})

const Registration = ({ toggleForm }) => {
    return (
        <div className={styles.registrationForm}>
            <h2>Registration</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={RegistrationSchema}
            >
                {({ values }) => (
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

                        <div className={styles.field}>
                            <FieldArray name="phones">
                                {({ push, remove }) =>
                                    values.phones.map((phone, index) => (
                                        <div key={index} className={styles.phoneField}>
                                            <Field
                                                name={`phones.${index}.number`}
                                                className={styles.input}
                                            />
                                            {index === 0 ? (
                                                <button
                                                    type="button"
                                                    onClick={() => push({ number: "+38" })}
                                                    className={styles.button}
                                                >
                                                    Add
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className={styles.button}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                            <ErrorMessage
                                                name={`phones.${index}.number`}
                                                component="div"
                                                className={styles.invalid}
                                            />
                                        </div>
                                    ))
                                }
                            </FieldArray>
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