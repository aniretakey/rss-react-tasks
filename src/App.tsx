import React, { useCallback, useEffect, useState } from 'react';
import { Search } from './components/Search/Search';
import { CardsList } from './components/CardsList/CardsList';
import { Loader } from './components/Loader/Loader';
import Pagination from './components/Pagination/Pagination';

import { searchByCentury } from './utils/requests';
import { ArtObject } from './types/types';
import './App.css';

const App = () => {
  const [cardsData, setCardsData] = useState<ArtObject[]>([]);
  const [totalCardsCount, setTotalCardsCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(null);

  const initialSearchValue = localStorage.getItem('searchValue') || '19';
  const [lastRequest, setLastRequest] = useState(initialSearchValue);

  const updateSearchValue = (value: string) => {
    setLoading(true);
    setPage(1);
    setIsFirstPage(true);
    setLastPage(null);
    setLastRequest(value);
  };

  const itemsOnPage = 10;

  useEffect(() => {
    searchByCentury(lastRequest, page, itemsOnPage)
      .then((response) => response.json())
      .then(({ artObjects, count }) => {
        setCardsData(artObjects);
        count > 10000 ? setTotalCardsCount(10000) : setTotalCardsCount(count);
        //TODO set items per page instead of 10
        setLastPage(Math.ceil(totalCardsCount / 10));
        setLoading(false);
      });
  }, [lastPage, totalCardsCount, lastRequest, page]);

  const handleFirstPageClick = useCallback(() => {
    setPage(1);
    setIsFirstPage(true);
  }, []);

  const handleNextPageClick = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
    setIsFirstPage(false);
  }, [lastPage, page]);

  const handlePrevPageClick = useCallback(() => {
    const newPage = page - 1;
    setPage(newPage);
    if (newPage === 1) {
      setIsFirstPage(true);
    }
  }, [page]);

  const handleLastPageClick = useCallback(() => {
    setPage(lastPage);
    setIsFirstPage(false);
  }, [lastPage]);

  return (
    <>
      <Search lastSearch={lastRequest} updateData={updateSearchValue} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <CardsList cardsData={cardsData} />
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
      )}
    </>
  );
};

export { App };
