import React, { useEffect, useState } from 'react';
import { Search } from './components/Search/Search';
import { CardsList } from './components/CardsList/CardsList';
import { Loader } from './components/Loader/Loader';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const initialSearchValue = localStorage.getItem('searchValue') || '19';
  const [lastRequest, setLastRequest] = useState(initialSearchValue);

  const updateSearchValue = (value: string) => {
    setLoading(true);
    setLastRequest(value);
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
  }, [lastRequest]);

  return (
    <>
      <Search lastSearch={lastRequest} updateData={updateSearchValue} />
      {loading ? <Loader /> : <CardsList lastReq={lastRequest} />}
    </>
  );
};

export { App };
