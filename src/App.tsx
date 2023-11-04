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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const initialSearchValue = localStorage.getItem('searchValue') || '19';
  const [lastRequest, setLastRequest] = useState(initialSearchValue);

  const updateSearchValue = (value: string) => {
    setLoading(true);
    setPage(1);
    setLastRequest(value);
  };

  const itemsOnPage = 10;

  useEffect(() => {
    searchByCentury(lastRequest, page, itemsOnPage)
      .then((response) => response.json())
      .then(({ artObjects }) => {
        setCardsData(artObjects);
        setLoading(false);
      });
  }, [lastRequest, page]);

  const handleFirstPageClick = useCallback(() => {
    setPage(1);
    setFirstPage(true);
    setLastPage(false);
  }, []);

  const handleNextPageClick = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
    setFirstPage(false);
    //TODO: set last page by fetching data count
    if (newPage === 100) {
      setLastPage(true);
    }
  }, [page]);

  const handlePrevPageClick = useCallback(() => {
    const newPage = page - 1;
    setPage(newPage);
    setLastPage(false);
    if (newPage === 1) {
      setFirstPage(true);
    }
  }, [page]);

  //TODO: set last page by fetching data count
  const handleLastPageClick = useCallback(() => {
    setPage(100);
    setLastPage(true);
    setFirstPage(false);
  }, []);

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
            disableNext={lastPage}
            disablePrev={firstPage}
          />
        </>
      )}
    </>
  );
};

export { App };
