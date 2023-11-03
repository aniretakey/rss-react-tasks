import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import styles from './errorPage.module.css';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (!isRouteErrorResponse(error)) {
    return <p>{'Oops! Unknown Error'}</p>;
  }
  return (
    <div id="error-page" className={styles.errorPage}>
      <h1 className={styles.title}>Oops!</h1>
      <p>Sorry, an unexpected error has occurred...</p>
      {/*<p className={styles.description}>*/}
      {/*  <i>{error.statusText}</i>*/}
      {/*</p>*/}
      <p>
        ...but you can find something beautiful on{' '}
        <a className={styles.link} href="/">
          main page
        </a>
      </p>
    </div>
  );
}
