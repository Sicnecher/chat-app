'use client';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { LoginFormValues, LogInSchema, SignUpFormValues, SignUpSchema } from '../models/schemas/logForm.validation';
import GoogleSignInBtn from './token-providers/googlePlus';
import GitHubSignInButton from './token-providers/githubSignInButton';
import FacebookSignInButton from './token-providers/facebookSignInButton';
import styles from './page.module.css';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import cookies from 'js-cookie'


export default function form() {
  const [isLogForm, setIsLogForm] = useState(false);
  const [windowWidth, setWindowWidth] = useState(false);

  async function logFetcher(route: string, values: LoginFormValues | SignUpFormValues): Promise<any>{
   const {data} = await axios.post(route, values)
   return data
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth > 1200);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  async function submitHandler(values: any) {
    try{
      const logResponse = isLogForm ? 
      await logFetcher(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/in`, values) 
      : 
      await logFetcher(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/up`, values)
      if(logResponse.access_token){
        cookies.set('access_token', logResponse.access_token)
      }else{
        throw new Error()
      }
    }catch(error){
        console.log(error)
      return error
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <label>Register with:</label>
        <section className={styles.cloudBtnContainer}>
          <GoogleSignInBtn isSmall={windowWidth} />
          <FacebookSignInButton isSmall={windowWidth} />
          <GitHubSignInButton isSmall={windowWidth} />
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
