import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import styles from '../page.module.css'
import { useEffect, useState } from 'react';

export default function GoogleSignInBtn({isSmall}: {isSmall: boolean}) {
    const login = useGoogleLogin({
        onSuccess(response:any){
            console.log('login success: ', response)
        },
        onError(){
            console.log('Login Failed')
        }
    })

    return (
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
            <button
            onClick={() => login()}
            className={styles.tokenButton}>
                <FcGoogle className={styles.tokenIcon} />
                {isSmall && (<p>Google</p>)}
            </button>
        </GoogleOAuthProvider>
    )
}