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
  tipus: string;
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

  handleRegister = async () => {
    const { tipus, hossz, keszlet, ar } = this.state;
    if (tipus.trim() == '' || hossz < 0 || keszlet < 0 || ar < 0) {
      return;
    }

    const adat = {
      csavarTipus: tipus,
      csavarHossz: hossz,
      csavarKeszlet: keszlet,
      csavarAr: ar,
    }

    let response = await fetch('http://localhost:3000/csavar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({
      tipus: '',
      hossz: 0,
      keszlet: 0,
      ar: 0,
    })

    await this.loadCsavarok();

  }

  render() {
    const { tipus, hossz, keszlet, ar } = this.state;

    return <div>
      <h2>Csavar felvétele</h2>
      Típus: <input type="text" value={tipus} onChange={e => this.setState({ tipus: e.currentTarget.value })}/><br />
      Hossz: <input type="number" value={hossz} onChange={e => this.setState({ hossz: parseInt(e.currentTarget.value) })}/><br />
      Készlet: <input type="number" value={keszlet} onChange={e => this.setState({ keszlet: parseInt(e.currentTarget.value) })}/><br />
      Ár: <input type="number" value={ar} onChange={e => this.setState({ ar: parseInt(e.currentTarget.value) })}/><br />
      <button onClick={this.handleRegister}>Felvétel</button>
      <h2>Csavarok listája</h2>
      <ul>
        {
          this.state.csavarok.map(csavar => <li>{csavar.tipus}</li>)
        }
      </ul>
    </div>
  }
}

export default App;
