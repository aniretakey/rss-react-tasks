import React from 'react';
import { InputState } from '../../types/types';

export default class Search extends React.Component<
  Record<string, unknown>,
  InputState
> {
  private inputValueFromLS = localStorage.getItem('inputValue');
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      inputValue: this.inputValueFromLS ? this.inputValueFromLS : '',
    };
  }

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
    localStorage.setItem('inputValue', e.target.value);
  };

  public handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleClick}>
          Search
        </button>
      </form>
    );
  }
}
