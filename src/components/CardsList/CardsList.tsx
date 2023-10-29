import React from 'react';
import { getPictures } from '../../utils/requests';
import Card from '../Card/Card';
import styles from './cardsList.module.css';

export default class CardsList extends React.Component<
  unknown,
  { pictures: [] }
> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      pictures: [],
    };
  }

  componentDidMount() {
    getPictures(5)
      .then((response) => response.json())
      .then(({ artObjects }) => {
        this.setState({ pictures: artObjects });
      });
  }

  render() {
    const { pictures: allPictures } = this.state;
    return (
      <div className={styles.cardsContainer}>
        {allPictures &&
          allPictures.map(
            ({
              id,
              title,
              webImage,
              principalOrFirstMaker,
            }: {
              id: string;
              title: string;
              webImage: { url: string };
              principalOrFirstMaker: string;
            }) => (
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
  }
}
