import React from 'react';
import { PaginationProps } from '../../types/types';
import styles from './pagination.module.css';
import { Link } from 'react-router-dom';

function Pagination(props: PaginationProps) {
  const {
    currentPage,
    onFirstPageClick,
    onNextPageClick,
    onPrevPageClick,
    onLastPageClick,
    disablePrev,
    disableNext,
    lastPageNum,
  } = props;

  return (
    <div className={styles.paginationContainer}>
      <Link to={`/page/1`}>
        <button
          className={styles.navBtn}
          type="button"
          onClick={onFirstPageClick}
          disabled={disablePrev}
        >
          {'<<'}
        </button>
      </Link>

      <Link to={`/page/${currentPage - 1}`}>
        <button
          className={styles.navBtn}
          type="button"
          onClick={onPrevPageClick}
          disabled={disablePrev}
        >
          {'<'}
        </button>
      </Link>

      <p className={styles.pageNum}>{currentPage}</p>

      <Link to={`/page/${currentPage + 1}`}>
        <button
          className={styles.navBtn}
          type="button"
          onClick={onNextPageClick}
          disabled={disableNext}
        >
          {'>'}
        </button>
      </Link>

      <Link to={`/page/${lastPageNum}`}>
        <button
          className={styles.navBtn}
          type="button"
          onClick={onLastPageClick}
          disabled={disableNext}
        >
          {'>>'}
        </button>
      </Link>
    </div>
  );
}

export default React.memo(Pagination);
