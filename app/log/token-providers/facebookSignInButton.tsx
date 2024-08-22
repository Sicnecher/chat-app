import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import styles from '../page.module.css';
import envConfig from '@/app/env.config';

const FacebookSignInButton = ({isSmall}: {isSmall: boolean}) => {
  const handleLogin = () => {
    window.location.href = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${envConfig.facebookClientId}&redirect_uri=${envConfig.baseUrl}/auth/facebook/callback&scope=email,public_profile`;
  };

  return (
    <button onClick={handleLogin} className={styles.tokenButton}>
      <FaFacebook className={styles.tokenIcon} />
      {isSmall && (<p>Facebook</p>)}
    </button>
  );
};

export default FacebookSignInButton;
