import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import { HomeProps } from './HomeContainer';

export class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.init();
  }
  render() {
    return (
      <div className="home">
        <header className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <p>
            Edit <code>{this.props.x}</code> and save to reload.
          </p>
          <a
            className="home-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={() => this.props.setX('X!')}>set x!</button>
        </header>
      </div>
    );
  }
}
