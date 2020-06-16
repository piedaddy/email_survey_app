import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from "./Header";
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';



//brains of react router
//react component that is used to set up a rule bw a route and components


class App extends Component {
  //constructor(props);

  componentDidMount() {
    this.props.fetchUser();
    //action creator that will fetch the user info

  };

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null,actions)(App);
///first arg is reserved for mapstatetoprops
//second arg is for actions 
//actions will then be assigned to the APp component as props!
//thats why we access it as this.props
