import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { cardsListPropsType } from '../../types/types';
import { searchByCentury } from '../../utils/requests';
import styles from './cardsList.module.css';

const CardsList = (props: { lastReq?: string }) => {
  const initialSearchValue = localStorage.getItem('searchValue') || '19';
  const initialItemsPerPage = Number(localStorage.getItem('itemsPerPage'));
  const { pathname } = useLocation();
  const pageNumFromURL = +pathname.replace('/page/', '').trim();
  const navigate = useNavigate();

  const initialState: cardsListPropsType = {
    cardsData: [],
    totalCardsCount: 10000,
    loading: true,
    currentPage: pageNumFromURL || 1,
    lastPage: 10,
    lastRequest: initialSearchValue,
    itemsOnPage: initialItemsPerPage || 10,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (props.lastReq !== state.lastRequest && props.lastReq) {
      const lastReqFromProps = props.lastReq;
      setState((prevState) => ({
        ...prevState,
        lastRequest: lastReqFromProps,
        currentPage: 1,
      }));
    }

    searchByCentury(state.lastRequest, state.currentPage, state.itemsOnPage)
      .then((response) => response.json())
      .then(({ artObjects, count }) => {
        count < 10000 &&
          setState((prevState) => ({ ...prevState, totalCardsCount: count }));
        setState((prevState) => ({
          ...prevState,
          cardsData: artObjects,
          loading: false,
          lastPage: Math.ceil(state.totalCardsCount / state.itemsOnPage),
        }));
      });
  }, [
    props.lastReq,
    state.currentPage,
    state.itemsOnPage,
    state.lastRequest,
    state.totalCardsCount,
  ]);

  const handleFirstPageClick = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
      currentPage: 1,
    }));
  }, []);

  const handlePrevPageClick = useCallback(() => {
    const newPage = state.currentPage - 1;
    setState((prevState) => ({
      ...prevState,
      currentPage: newPage,
      loading: true,
    }));
  }, [state.currentPage]);

  const handleNextPageClick = useCallback(() => {
    const newPage = state.currentPage + 1;
    setState((prevState) => ({
      ...prevState,
      loading: true,
      currentPage: newPage,
    }));
  }, [state.currentPage]);

  const handleLastPageClick = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
      currentPage: state.lastPage,
    }));
  }, [state.lastPage]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.preventDefault();
    const cardKey = (e?.target as HTMLElement).closest('div')?.id;
    navigate(`/details/${cardKey}`);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newItemsCount = +e.target.value;
    if (newItemsCount !== state.itemsOnPage) {
      localStorage.setItem('itemsPerPage', `${newItemsCount}`);
      setState((prevState) => ({
        ...prevState,
        loading: true,
        itemsOnPage: newItemsCount,
        currentPage: 1,
      }));
      navigate('/page/1');
    }
  };

  return (
    <div className={styles.wrapper}>
      {state.loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.container}>
            <select
              className={styles.pagesSelect}
              onChange={handleSelectChange}
              defaultValue={state.itemsOnPage}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>

            <div className={styles.cardsContainer}>
              {state.cardsData &&
                state.cardsData.map(
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
              currentPage={state.currentPage}
              onFirstPageClick={handleFirstPageClick}
              onNextPageClick={handleNextPageClick}
              onPrevPageClick={handlePrevPageClick}
              onLastPageClick={handleLastPageClick}
              disableNext={state.currentPage === state.lastPage}
              disablePrev={state.currentPage === 1}
              lastPageNum={state.lastPage}
            />
          </div>

          <Outlet />
        </>
      )}
    </div>
  );
};

export { CardsList };
