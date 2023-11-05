import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Card } from '../Card/Card';
import styles from './cardsList.module.css';
import { ArtObject } from '../../types/types';
import { searchByCentury } from '../../utils/requests';
import Pagination from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';

const CardsList = (props: { lastReq?: string }) => {
  const initialSearchValue = localStorage.getItem('searchValue') || '19';
  const { pathname } = useLocation();
  const pageNumFromURL = +pathname.replace('/page/', '').trim();

  //TODO refactor state (make 1 state object instead of lot of different states)
  const [cardsData, setCardsData] = useState<ArtObject[]>([]);
  const [totalCardsCount, setTotalCardsCount] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(pageNumFromURL || 1);
  const [isFirstPage, setIsFirstPage] = useState(
    !(pageNumFromURL && pageNumFromURL !== 1)
  );
  const [lastPage, setLastPage] = useState<number>();
  const [lastRequest, setLastRequest] = useState(initialSearchValue);
  const [itemsOnPage, setItemsOnPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.lastReq !== lastRequest && props.lastReq) {
      setLastRequest(props.lastReq);
      setPage(1);
      setIsFirstPage(true);
    }
    searchByCentury(lastRequest, page, itemsOnPage)
      .then((response) => response.json())
      .then(({ artObjects, count }) => {
        setCardsData(artObjects);
        count > 10000 ? setTotalCardsCount(10000) : setTotalCardsCount(count);
        totalCardsCount &&
          setLastPage(Math.ceil(totalCardsCount / itemsOnPage));
        //TODO fix loader

        setLoading(false);
      });
  }, [
    props.lastReq,
    lastRequest,
    itemsOnPage,
    lastPage,
    totalCardsCount,
    page,
    loading,
  ]);

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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newItemsCount = +e.target.value;
    if (newItemsCount !== itemsOnPage) {
      setItemsOnPage(newItemsCount);
      setPage(1);
      setIsFirstPage(true);
      navigate('/page/1');
    }
  };

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.container}>
            <select
              className={styles.pagesSelect}
              onChange={handleSelectChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>

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
        </>
      )}
    </div>
  );
};

export { CardsList };
