import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPictureByKey } from '../../utils/requests';
import { ArtObject } from '../../types/types';
import styles from './details.module.css';

function Details() {
  const [cardData, setCardData] = useState<ArtObject>();
  const { pathname } = useLocation();
  const cardKey = pathname.replace('/details/', '');
  const navigate = useNavigate();

  useEffect(() => {
    getPictureByKey(cardKey)
      .then((response) => response.json())
      .then(({ artObject }) => setCardData(artObject));
  }, [cardKey]);

  const handleDetailsClose = (
    e: React.MouseEvent<HTMLDivElement> | undefined
  ) => {
    const clickedEl = e?.target as HTMLElement;
    const clickedDiv = clickedEl
      ?.closest('div')
      ?.className.includes('detailsBackground');
    const clickedIcon = clickedEl
      ?.closest('img')
      ?.className.includes('closeIcon');
    if (clickedDiv || clickedIcon) {
      navigate(-1);
    }
  };

  return (
    cardData && (
      <div className={styles.detailsContainer} onClick={handleDetailsClose}>
        <div className={styles.detailsBackground}>
          <div className={styles.innerContainer}>
            <img
              onClick={handleDetailsClose}
              className={styles.closeIcon}
              src="https://img.icons8.com/fluency-systems-regular/48/cancel.png"
              alt=""
            />
            <img
              src={cardData?.webImage?.url}
              alt={cardData?.title}
              className={styles.detailsImage}
            />
            <div className={styles.detailsText}>
              <h1 className={styles.detailsTitle}>{cardData?.title}</h1>
              <p>{cardData?.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export { Details };
