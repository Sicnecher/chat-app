import { FcGoogle } from 'react-icons/fc';
import styles from '../page.module.css'
import { account } from '@/appwrite';
import { OAuthProvider } from 'appwrite';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function GoogleSignInBtn({isSmall}: {isSmall: boolean}) {
async function handleLogin(){
    account.createOAuth2Session(
        'google' as OAuthProvider,
        'http://localhost:3000',
        'http://localhost:3000'
    )

    account.get().then(async (response) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/user`, response).then((res) => {
            Cookies.set('access_token', res.data.token)
            window.location.reload()
        }).catch((error) => {
            console.error('Error fetching user data:', error);
        })
    }, (error) => {
        console.error('Error fetching user data:', error);
    })
}

    return (
            <button
            onClick={() => handleLogin()}
            className={styles.tokenButton}>
                <FcGoogle className={styles.tokenIcon} />
                {isSmall && (<p>Google</p>)}
            </button>
    )
}