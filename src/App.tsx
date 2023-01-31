import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State {
  csavarok: Csavarbolt[];
  tipus: string;
  hossz: number;
  keszlet: number;
  ar: number;
}

interface Csavarbolt {
  id: number;
  nev: string;
}

interface CsavarboltListResponse {
  csavarok: Csavarbolt[];
}

class App extends Component <{}, State>{

  constructor(props: {}) {
    super(props);

    this.state = {
      tipus: '',
      hossz: 0,
      keszlet: 0,
      ar: 0,
      csavarok: [],
    }
  }

  async loadCsavarok() {
    let response = await fetch('http://localhost:3000/csavar');
    let data = await response.json() as CsavarboltListResponse;
    this.setState({
      csavarok: data.csavarok,
    })
  }

  componentDidMount() {
    this.loadCsavarok();
  }

  
}

export default App;
