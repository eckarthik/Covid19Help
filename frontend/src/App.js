import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import {Route} from 'react-router-dom';
import OxygenStatus from './components/OxygenStatus/OxygenStatus';

class App extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Route path="/" exact component={OxygenStatus}/>
        </div>
      </Layout>
      
    )
  }
}

export default App;
