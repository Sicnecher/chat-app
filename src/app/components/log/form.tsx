'use client';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LogInSchema, SignUpSchema } from '../../models/schemas/logform.validation';
import styles from '../../global.module.css'
import { FaGithub, FaGitlab, FaUser } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie'
import { FcGoogle } from 'react-icons/fc';
import TokenProviderBtn from './token-provider';
import { streamClient } from '../.././stream.init';


export default function form() {
  const [isLogForm, setIsLogForm] = useState(false);
  const [windowWidth, setWindowWidth] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth > 1200);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  async function submitHandler(values: any) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_PORT as string}/api/user/${isLogForm ? 'in' : 'up'}`, 
            values
        );

        const data = response.data;

        // Proceed if the request is successful
        await streamClient.connectUser(data.userData, data.streamToken);
        Cookies.set('access_token', data.accessToken);
        window.location.href = '/';

    } catch (error: any) {
        // Check for an Axios error response (e.g., 409 or 500)
        if (error.response) {
            const serverErrorMessage = error.response.data?.error || 'An unexpected error occurred.';
            // Log or display the server error message as needed
            console.log('Server error:', serverErrorMessage);
            // Optionally, handle specific errors here, e.g., if the email or username is occupied
            !errorMessages.includes(serverErrorMessage) && setErrorMessages([...errorMessages, serverErrorMessage])
        } else {
            console.log('Unexpected error:', error.message);
        }
    }
}


  return (
    <div className={styles.pageContainer}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <label>Register with:</label>
        <section className={styles.cloudBtnContainer}>
          <TokenProviderBtn size={windowWidth} provider="google" Icon={FcGoogle} />
          <TokenProviderBtn size={windowWidth} provider="gitlab" Icon={FaGitlab} />
          <TokenProviderBtn size={windowWidth} provider="github" Icon={FaGithub} />
        </section>
      </div>
      <hr style={{ width: '80%' }} />
      {isLogForm ? (
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LogInSchema}
          onSubmit={submitHandler}>
          {({ isSubmitting, values }) => (
            <Form className={styles.form}>
              <section className={styles.detailContainer}>
                <div className={styles.fieldContainer}>
                  <label htmlFor="username" className={styles.fieldLabel}>Username or Email</label>
                  <FaUser className="icon" />
                  <Field
                    className={styles.field}
                    type="text"
                    name="username"
                    placeholder=" username or email"
                    value={values.username}
                  />
                  <ErrorMessage className={styles.fieldError} name="username" component="div" />
                </div>
                <div className={styles.fieldContainer}>
                  <label htmlFor="password" className={styles.fieldLabel}>Password</label>
                  <Field
                    className={styles.field}
                    type="password"
                    name="password"
                    placeholder=" password"
                    value={values.password}
                  />
                  <ErrorMessage className={styles.fieldError} name="password" component="div" />
                </div>
              </section>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>Sign In</button>
              <label className={styles.question}>Dont have an account?
                <a className={styles.questionBtn} onClick={() => setIsLogForm(!isLogForm)}> Sign Up</a>
              </label>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ username: '', age: '', email: '', password: '', confirm_password: '' }}
          validationSchema={SignUpSchema}
          onSubmit={submitHandler}>
          {({ isSubmitting, values }) => (
            <Form className={styles.form}>
              <section className={styles.detailContainer}>
                <div className={styles.fieldContainer}>
                  <label htmlFor="username" className={styles.fieldLabel}>Username</label>
                  <Field
                    className={styles.field}
                    type="text"
                    name="username"
                    placeholder=" username"
                    value={values.username}
                  />
                  <ErrorMessage className={styles.fieldError} name="username" component="div" />
                </div>
                <div className={styles.fieldContainer}>
                  <label htmlFor="email" className={styles.fieldLabel}>Email</label>
                  <Field
                    className={styles.field}
                    type="email"
                    name="email"
                    placeholder=" email"
                    value={values.email}
                  />
                  <ErrorMessage className={styles.fieldError} name="email" component="div" />
                </div>
                <div className={styles.fieldContainer}>
                  <label htmlFor="password" className={styles.fieldLabel}>Password</label>
                  <Field
                    className={styles.field}
                    type="password"
                    name="password"
                    placeholder=" password"
                    value={values.password}
                  />
                  <ErrorMessage className={styles.fieldError} name="password" component="div" />
                </div>
                <div className={styles.fieldContainer}>
                  <label htmlFor="confirm_password" className={styles.fieldLabel}>Confirm Password</label>
                  <Field
                    className={styles.field}
                    type="password"
                    name="confirm_password"
                    placeholder=" confirm password"
                    value={values.confirm_password}
                  />
                  <ErrorMessage className={styles.fieldError} name="confirm_password" component="div" />
                </div>
              </section>
              {errorMessages[0] && <div style={{width: "100%"}}>{errorMessages.map((message) => (<div style={{color: 'red'}}>{message}</div>))}</div>}
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>Sign Up</button>
              <label className={styles.question}>Already have an account?
                <a className={styles.questionBtn} onClick={() => setIsLogForm(!isLogForm)}> Log In</a>
              </label>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}