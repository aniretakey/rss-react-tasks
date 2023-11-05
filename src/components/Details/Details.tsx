import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPictureByKey } from '../../utils/requests';
import { ArtObject } from '../../types/types';
import { Loader } from '../Loader/Loader';
import styles from './details.module.css';

function Details() {
  const [cardData, setCardData] = useState<ArtObject>();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const cardKey = pathname.replace('/details/', '');
  const navigate = useNavigate();

  useEffect(() => {
    getPictureByKey(cardKey)
      .then((response) => response.json())
      .then(({ artObject }) => {
        setCardData(artObject);
        setLoading(false);
      });
  }, [cardKey, loading]);

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
            {loading ? (
              <Loader />
            ) : (
              <>
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
                  {cardData.principalOrFirstMaker && (
                    <p>
                      <b>Author:</b> {cardData.principalOrFirstMaker}
                    </p>
                  )}
                  <p>
                    <b>Year:</b> {cardData.dating?.yearEarly}
                  </p>
                  <p>
                    <b>Materials:</b> {cardData.materials?.join(', ')}
                  </p>
                  {cardData.techniques?.length !== 0 && (
                    <p>
                      <b>Techniques:</b> {cardData.techniques?.join(', ')}
                    </p>
                  )}
                  <p className={styles.detailsDescr}>{cardData?.description}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export { Details };
