import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Card } from '../Card/Card';
import styles from './cardsList.module.css';
import { ArtObject } from '../../types/types';
import { searchByCentury } from '../../utils/requests';
import Pagination from '../Pagination/Pagination';

const CardsList = (props: { lastReq?: string }) => {
  const initialSearchValue = localStorage.getItem('searchValue') || '19';
  const { search } = useLocation();
  const pageNumFromURL = +search.replace('?page=', '').trim();

  //TODO refactor state (make 1 state object instead of lot of different states)
  const [cardsData, setCardsData] = useState<ArtObject[]>([]);
  const [totalCardsCount, setTotalCardsCount] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(pageNumFromURL || 1);
  const [isFirstPage, setIsFirstPage] = useState(
    !(pageNumFromURL && pageNumFromURL !== 1)
  );
  const [lastPage, setLastPage] = useState(null);
  const [lastRequest, setLastRequest] = useState(initialSearchValue);

  const itemsOnPage = 10;

  useEffect(() => {
    if (props.lastReq !== lastRequest) {
      setLastRequest(props.lastReq);
      setPage(1);
      setIsFirstPage(true);
      setLastPage(null);
    }
    searchByCentury(lastRequest, page, itemsOnPage)
      .then((response) => response.json())
      .then(({ artObjects, count }) => {
        setCardsData(artObjects);
        count > 10000 ? setTotalCardsCount(10000) : setTotalCardsCount(count);
        //TODO set items per page instead of 10
        setLastPage(Math.ceil(totalCardsCount / 10));
        // setLoading(false);
      });
  }, [props.lastReq, lastRequest, lastPage, totalCardsCount, page]);

  const handleFirstPageClick = useCallback(() => {
    setPage(1);
    setIsFirstPage(true);
  }, []);

  const handlePrevPageClick = useCallback(() => {
    const newPage = page - 1;
    setPage(newPage);
    if (newPage === 1) {
      setIsFirstPage(true);
    }
  }, [page]);

  const handleNextPageClick = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
    setIsFirstPage(false);
  }, [page]);

  const handleLastPageClick = useCallback(() => {
    setPage(lastPage);
    setIsFirstPage(false);
  }, [lastPage]);

  return (
    <>
      <div className={styles.cardsContainer}>
        {cardsData &&
          cardsData.map(
            ({ id, title, webImage, principalOrFirstMaker, objectNumber }) => (
              <Card
                objectNum={objectNumber}
                key={id}
                imgURL={webImage.url}
                title={title}
                author={principalOrFirstMaker}
              />
            )
          )}
      </div>
      <Pagination
        currentPage={page}
        onFirstPageClick={handleFirstPageClick}
        onNextPageClick={handleNextPageClick}
        onPrevPageClick={handlePrevPageClick}
        onLastPageClick={handleLastPageClick}
        disableNext={page === lastPage}
        disablePrev={isFirstPage}
        lastPageNum={lastPage}
      />
    </>
  );
};

export { CardsList };
