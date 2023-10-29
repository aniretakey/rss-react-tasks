import React from 'react';
import './App.css';
import Search from './components/Search/Search';
import CardsList from './components/CardsList/CardsList';

export class App extends React.Component<
  Record<string, unknown>,
  { lastRequestedValue: string }
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      lastRequestedValue: localStorage.getItem('inputValue') || '19',
    };
  }
  render() {
    return (
      <>
        <Search />
        <CardsList lastRequestedValue={this.state.lastRequestedValue} />
      </>
    );
  }
}

export default App;
