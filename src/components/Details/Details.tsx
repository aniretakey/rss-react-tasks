import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPictureByKey } from '../../utils/requests';
import { ArtObject } from '../../types/types';
import styles from './details.module.css';

function Details() {
  const [cardData, setCardData] = useState<ArtObject>();
  const { pathname } = useLocation();
  const cardKey = pathname.replace('/details/', '');
  // const navigate = useNavigate();

  useEffect(() => {
    getPictureByKey(cardKey)
      .then((response) => response.json())
      .then(({ artObject }) => setCardData(artObject));
  }, [cardKey]);

  // const handleDetailsClose = (e) => {
  //   // navigate(-1);
  //   console.log(e?.target?.closest('div').className)
  //   // if (!e?.target?.closest.className.includes('detailsContainer')) {
  //   //   navigate(-1);
  //   // }
  //   // document.body.style.overflow = ""
  // }

  return (
    cardData && (
      // <div className={styles.detailsBackground} onClick={handleDetailsClose}>
      <div className={styles.detailsContainer}>
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
    )
    // </div>
  );
}

export { Details };
