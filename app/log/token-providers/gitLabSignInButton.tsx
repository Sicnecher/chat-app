// components/GitHubSignInButton.tsx
import React from 'react';
import { FaGithub, FaGitlab } from 'react-icons/fa';
import styles from '../page.module.css';
import { account } from '@/appwrite';
import { OAuthProvider } from 'appwrite';

export default function GitLabSignInButton({isSmall}: {isSmall: boolean}) {
  async function handleLogin(){
    account.createOAuth2Session(
        'gitlab' as OAuthProvider,
        'http://localhost:3000',
        'http://localhost:3000'
    )
  }

  return (
    <button onClick={handleLogin} className={styles.tokenButton}>
      <FaGitlab className={styles.tokenIcon} />
      {isSmall && (<p>GitLab</p>)}
    </button>
  );
};
