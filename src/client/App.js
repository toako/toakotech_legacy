//Overarching imports
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/app.scss";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

//Page imports
import Home from './pages/Home.js';
import Navigation from "./pages/components/Navigation.js";

//Scheduler Imports
import Portal from "./scheduler/Portal.js";

//WillStyle Imports
import Dashboard from "./willstyle/WS.js";


//App class
class App extends React.Component {
  render () {
    return (
      (<Router> {/* This is a react router, allowing for easy page navigation*/}
        <Switch>
          <Route exact path="/"><Navigation/><Home/></Route>
          <Route path="/s"><Portal /></Route>
          <Route path="/ws"><Dashboard /></Route>
        </Switch>
      </Router>)
    );
  }
}

export default App;
