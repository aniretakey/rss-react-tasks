import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import styles from './errorPage.module.css';
import React from 'react';

export function ErrorPage() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return (
      <div className={styles.errorPage}>
        <h1>Something went wrong.</h1>
        <p>
          Please, go on a{' '}
          <Link to="/" className={styles.link}>
            main page
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div id="error-page" className={styles.errorPage}>
      <h1 className={styles.title}>Oops!</h1>
      <p>Sorry, an unexpected error has occurred...</p>
      <p className={styles.description}>
        <i>---- {error.statusText} ----</i>
      </p>
      <p>
        ...but you can find something beautiful on{' '}
        {
          <Link className={styles.link} to="/">
            main page
          </Link>
        }
      </p>
    </div>
  );
}
