//Overarching imports
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/app.scss";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

//Page imports
import Home from './pages/Home.js';
import HomeNew from './pages/HomeNew.js';
import Portfolio from './pages/Portfolio.js';
import Projects from './pages/Projects.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Eclipse from'./pages/Eclipse.js';
import Navigation from "./pages/components/Navigation.js";
import NavGap from "./pages/components/NavGap.js"
import Footer from "./pages/components/Footer.js";

//Scheduler Imports
import Portal from "./scheduler/Portal.js"

//App class
class App extends React.Component {
  render () {
    return (
      (<Router> {/* This is a react router, allowing for easy page navigation*/}
        <Switch>
          <Route exact path="/"><Navigation/><NavGap/><Home/><Footer/></Route>
          <Route exact path="/newhome"><Navigation/><NavGap/><HomeNew/><Footer/></Route>
          <Route exact path="/portfolio"><Navigation/><NavGap/><Portfolio /><Footer/></Route>
          <Route exact path="/projects"><Navigation/><NavGap/><Projects /><Footer/></Route>
          <Route exact path="/about"><Navigation/><NavGap/><About /><Footer/></Route>
          <Route exact path="/contact"><Navigation/><NavGap/><Contact /><Footer/></Route>
          <Route exact path="/eclipse"><Navigation/><NavGap/><Eclipse /><Footer/></Route>
          <Route path="/s"><Portal /></Route>
        </Switch>
      </Router>)
    );
  }
}

export default App;
