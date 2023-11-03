import React, { useEffect, useState } from 'react';
import Search from './components/Search/Search';
import { CardsList } from './components/CardsList/CardsList';
import { searchByCentury } from './utils/requests';
import { ArtObject } from './types/types';
import { Loader } from './components/Loader/Loader';
import './App.css';

const App = () => {
  const [cardsData, setCardsData] = useState<ArtObject[]>([]);
  const [loading, setLoading] = useState(true);

  const initialSearchValue = localStorage.getItem('searchValue') || '19';
  // const [lastRequest, setLastRequest] = useState(initialSearchValue);

  useEffect(() => {
    searchByCentury(initialSearchValue)
      .then((response) => response.json())
      .then(({ artObjects }) => {
        setCardsData(artObjects);
        setLoading(false);
      });
  }, [initialSearchValue]);

  // TODO: add initialSearchValue to props in search component
  return (
    <>
      <Search />
      {loading ? <Loader /> : <CardsList cardsData={cardsData} />}
    </>
  );
};

export { App };
