import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import {Route} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import OxygenStatus from './components/OxygenStatus/OxygenStatus';
import StateWiseDailyCase from './components/StateWiseDailyCase/StateWiseDailyCase';

class App extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Route path="/" exact component={Homepage}/>
          <Route path="/oxygenCylinder" exact component={OxygenStatus} />
          <Route path="/graph" exact component={StateWiseDailyCase}/>
        </div>
      </Layout>
      
    )
  }
}

export default App;
