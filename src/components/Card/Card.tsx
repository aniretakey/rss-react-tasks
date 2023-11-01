import React from 'react';
import styles from './card.module.css';
import { getPictures } from '../../utils/requests';
import { ArtObject, CardsProps } from '../../types/types';
import { Loader } from '../Loader/Loader';

export default class Card extends React.Component<
  CardsProps,
  { pictures: ArtObject[]; isLoaded: boolean }
> {
  constructor(props: CardsProps) {
    super(props);
    this.state = {
      pictures: [],
      isLoaded: false,
    };
  }

  static getDerivedStateFromProps() {
    return null;
  }

  componentDidMount() {
    this.setState({ isLoaded: false });
    getPictures(1)
      .then((response) => response.json())
      .then(({ artObjects }) => {
        this.setState({ pictures: artObjects });
        this.setState({ isLoaded: true });
      });
  }

  render() {
    return (
      <div className={styles.card}>
        {this.state.isLoaded ? (
          <img
            src={this.props.imgURL}
            alt={this.props.title}
            className={styles.cardImage}
            onLoad={() => {
              this.setState({ isLoaded: true });
            }}
          />
        ) : (
          <Loader />
        )}
        <h1 className={styles.cardTitle}>{this.props.title}</h1>
        <p className={styles.cardAuthor}>{this.props.author}</p>
      </div>
    );
  }
}
