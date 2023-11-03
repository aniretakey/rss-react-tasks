import React, { useEffect, useState } from 'react';
import styles from './card.module.css';
import { CardsProps } from '../../types/types';
import { Loader } from '../Loader/Loader';

const Card = (pictures: CardsProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className={styles.card}>
      {loading ? (
        <img
          src={pictures.imgURL}
          alt={pictures.title}
          className={styles.cardImage}
        />
      ) : (
        <Loader />
      )}
      <h1 className={styles.cardTitle}>{pictures.title}</h1>
      <p className={styles.cardAuthor}>{pictures.author}</p>
    </div>
  );
};

export { Card };
