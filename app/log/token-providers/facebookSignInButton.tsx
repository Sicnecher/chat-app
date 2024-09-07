import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import styles from '../page.module.css';

const FacebookSignInButton = ({isSmall}: {isSmall: boolean}) => {
  const handleLogin = () => {
    window.location.href = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.API_BASE}/auth/facebook/callback&scope=email,public_profile`;
  };

  return (
    <button onClick={handleLogin} className={styles.tokenButton}>
      <FaFacebook className={styles.tokenIcon} />
      {isSmall && (<p>Facebook</p>)}
    </button>
  );
};

export default FacebookSignInButton;
