import React from 'react';
import { InputState } from '../../types/types';
import styles from './search.module.css';

export default class Search extends React.Component<
  Record<string, unknown>,
  InputState
> {
  private inputValueFromLS = localStorage.getItem('inputValue');
  btnRef: React.RefObject<HTMLButtonElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      inputValue: this.inputValueFromLS ? this.inputValueFromLS : '',
    };
    this.btnRef = React.createRef();
    this.inputRef = React.createRef();
  }

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  public handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.setItem(
      'inputValue',
      this.inputRef.current?.value.trim() || ''
    );
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <>
        <h1 className={styles.title}>
          Type the century in which the art object is made (0 - 21)
        </h1>
        <form className={styles.form}>
          <input
            ref={this.inputRef}
            type="text"
            value={this.state.inputValue}
            placeholder="Search something beautiful..."
            onChange={this.handleChange}
            className={styles.input}
          />
          <button
            ref={this.btnRef}
            type="submit"
            onClick={this.handleClick}
            className={styles.searchBtn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
            >
              <path
                d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                fill="#efeff1"
              ></path>
            </svg>
          </button>
        </form>
      </>
    );
  }
}
