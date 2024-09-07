// components/GitHubSignInButton.tsx
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import styles from '../page.module.css';

const GitHubSignInButton = ({isSmall}: {isSmall: boolean}) => {
  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`;
  };

  return (
    <button onClick={handleLogin} className={styles.tokenButton}>
      <FaGithub className={styles.tokenIcon} />
      {isSmall && (<p>Github</p>)}
    </button>
  );
};

export default GitHubSignInButton;
