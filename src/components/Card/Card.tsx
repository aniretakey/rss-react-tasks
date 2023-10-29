import React from 'react';
import styles from './card.module.css';
import { getPictures } from '../../utils/requests';
import { CardsProps } from '../../types/types';

export default class Card extends React.Component<CardsProps> {
  constructor(props: CardsProps) {
    super(props);
    this.state = {
      pictures: [],
    };
  }

  static getDerivedStateFromProps() {
    return null;
  }

  componentDidMount() {
    getPictures(1)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pictures: data.artObjects });
      });
  }

  render() {
    return (
      <div className={styles.card}>
        <img
          src={this.props.imgURL}
          alt={this.props.title}
          className={styles.cardImage}
        />
        <h1 className={styles.cardTitle}>{this.props.title}</h1>
        <p className={styles.cardAuthor}>{this.props.author}</p>
      </div>
    );
  }
}
