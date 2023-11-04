import React from 'react';
import { PaginationProps } from '../../types/types';
import styles from './pagination.module.css';

function Pagination(props: PaginationProps) {
  const {
    currentPage,
    onFirstPageClick,
    onNextPageClick,
    onPrevPageClick,
    onLastPageClick,
    disablePrev,
    disableNext,
  } = props;

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.navBtn}
        type="button"
        onClick={onFirstPageClick}
        disabled={disablePrev}
      >
        {'<<'}
      </button>
      <button
        className={styles.navBtn}
        type="button"
        onClick={onPrevPageClick}
        disabled={disablePrev}
      >
        {'<'}
      </button>
      <p className={styles.pageNum}>{currentPage}</p>
      <button
        className={styles.navBtn}
        type="button"
        onClick={onNextPageClick}
        disabled={disableNext}
      >
        {'>'}
      </button>
      <button
        className={styles.navBtn}
        type="button"
        onClick={onLastPageClick}
        disabled={disableNext}
      >
        {'>>'}
      </button>
    </div>
  );
}

export default React.memo(Pagination);
