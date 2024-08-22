// components/GitHubSignInButton.tsx
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import styles from '../page.module.css';
import envConfig from '@/app/env.config';

const GitHubSignInButton = ({isSmall}: {isSmall: boolean}) => {
  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${envConfig.githubClientId}&scope=user`;
  };

  return (
    <button onClick={handleLogin} className={styles.tokenButton}>
      <FaGithub className={styles.tokenIcon} />
      {isSmall && (<p>Github</p>)}
    </button>
  );
};

export default GitHubSignInButton;
