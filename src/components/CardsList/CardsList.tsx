import React from 'react';
import { getPictures } from '../../utils/requests';
import Card from '../Card/Card';
import { Loader } from '../Loader/Loader';
import styles from './cardsList.module.css';
import { ArtObject } from '../../types/types';

export default class CardsList extends React.Component<
  unknown,
  { pictures: ArtObject[]; isLoaded: boolean }
> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      pictures: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoaded: false });
    getPictures(5)
      .then((response) => response.json())
      .then(({ artObjects }) => {
        this.setState({ pictures: artObjects });
        this.setState({ isLoaded: true });
      });
  }

  render() {
    const { pictures: allPictures } = this.state;
    return (
      <div className={styles.cardsContainer}>
        {allPictures &&
          (this.state.isLoaded ? (
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
            )
          ) : (
            <Loader />
          ))}
      </div>
    );
  }
}
