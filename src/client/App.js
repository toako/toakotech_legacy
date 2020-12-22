import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/app.scss"
import Home from'./pages/Home.js';
import Portfolio from './pages/Portfolio.js';
import Projects from './pages/Projects.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Eclipse from'./pages/Eclipse.js';
import Scheduler from './pages/Scheduler.js';
import Navigation from "./pages/components/Navigation.js"
import Footer from "./pages/components/Footer.js"

class App extends React.Component {
  render () {
    return (
      <Router>
        <Navigation/>
        <div>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/portfolio"><Portfolio /></Route>
            <Route exact path="/projects"><Projects /></Route>
            <Route exact path="/about"><About /></Route>
            <Route exact path="/contact"><Contact /></Route>
            <Route exact path="/eclipse"><Eclipse /></Route>
            <Route exact path="/scheduler"><Scheduler /></Route>
          </Switch>
        </div>
        <Footer/>
      </Router>
    );
  }
}

export default App;
