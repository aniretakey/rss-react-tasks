import React from 'react';
import styles from './card.module.css';
import { CardsProps } from '../../types/types';

const Card = (pictures: CardsProps) => {
  return (
    <div className={styles.card} id={pictures.objectNum}>
      <img
        src={pictures.imgURL}
        alt={pictures.title}
        className={styles.cardImage}
      />
      <h1 className={styles.cardTitle}>{pictures.title}</h1>
      <p className={styles.cardAuthor}>{pictures.author}</p>
    </div>
  );
};

export { Card };
