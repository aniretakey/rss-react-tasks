import React from 'react';
import { Card } from '../Card/Card';
import styles from './cardsList.module.css';
import { ArtObject } from '../../types/types';

interface CardsListProps {
  cardsData: ArtObject[];
}

const CardsList = (props: CardsListProps) => {
  return (
    <div className={styles.cardsContainer}>
      {props.cardsData &&
        props.cardsData.map(
          ({ id, title, webImage, principalOrFirstMaker }) => (
            <Card
              key={id}
              imgURL={webImage.url}
              title={title}
              author={principalOrFirstMaker}
            />
          )
        )}
    </div>
  );
};

export { CardsList };
