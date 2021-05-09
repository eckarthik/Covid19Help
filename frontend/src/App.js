import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import {Route} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import OxygenStatus from './components/OxygenStatus/OxygenStatus';
import StateWiseDailyCase from './components/StateWiseDailyCase/StateWiseDailyCase';
import HospitalBeds from './components/HospitalBeds/HospitalBeds';
import Tweets from './components/Tweets/Tweets';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Route path="/" exact component={Homepage}/>
          <Route path="/oxygenCylinder" exact component={OxygenStatus} />
          <Route path="/graph" exact component={StateWiseDailyCase}/>
          <Route path="/hospitalBeds" exact component={HospitalBeds} />
        </div>
      </Layout>
      
    )
  }
}

export default App;
