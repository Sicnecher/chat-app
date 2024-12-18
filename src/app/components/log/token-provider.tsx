import styles from '../../global.module.css'
import { account } from '@/app/appwrite.service';
import { OAuthProvider } from 'appwrite';
import { IconType } from 'react-icons/lib';

export default function TokenProviderBtn({size, provider, Icon}: {size: boolean, provider: string, Icon: IconType}) {
async function handleLogin(){
    account.createOAuth2Session(
        provider as OAuthProvider,
        'http://localhost:3000',
        'http://localhost:3000'
    )
}

    return (
            <button
            onClick={() => handleLogin()}
            className={styles.tokenButton}>
                <Icon className={styles.tokenIcon} />
                {size && (<p>{provider}</p>)}
            </button>
    )
}