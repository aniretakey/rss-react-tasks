import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

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
  const [totalCardsCount, setTotalCardsCount] = useState<number>();
  // const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(pageNumFromURL || 1);
  const [isFirstPage, setIsFirstPage] = useState(
    !(pageNumFromURL && pageNumFromURL !== 1)
  );
  const [lastPage, setLastPage] = useState<number>();
  const [lastRequest, setLastRequest] = useState(initialSearchValue);

  const navigate = useNavigate();
  const itemsOnPage = 10;

  useEffect(() => {
    if (props.lastReq !== lastRequest && props.lastReq) {
      setLastRequest(props.lastReq);
      setPage(1);
      setIsFirstPage(true);
      // setLastPage(null);
    }
    searchByCentury(lastRequest, page, itemsOnPage)
      .then((response) => response.json())
      .then(({ artObjects, count }) => {
        setCardsData(artObjects);
        count > 10000 ? setTotalCardsCount(10000) : setTotalCardsCount(count);
        //TODO set items per page instead of 10
        totalCardsCount && setLastPage(Math.ceil(totalCardsCount / 10));
        //TODO fix loader

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
    lastPage && setPage(lastPage);
    setIsFirstPage(false);
  }, [lastPage]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.preventDefault();
    const cardKey = (e?.target as HTMLElement).closest('div')?.id;
    navigate(`/details/${cardKey}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          {cardsData &&
            cardsData.map(
              ({
                id,
                title,
                webImage,
                principalOrFirstMaker,
                objectNumber,
              }) => (
                <Card
                  objectNum={objectNumber}
                  key={id}
                  imgURL={webImage.url}
                  title={title}
                  author={principalOrFirstMaker}
                  clickHandler={handleCardClick}
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
      </div>
      <Outlet />
    </div>
  );
};

export { CardsList };
