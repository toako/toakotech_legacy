import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '@fortawesome/fontawesome-free/js/all.js';
import { LinkContainer } from "react-router-bootstrap";
import Greeting0 from "./components/Greeting0.js";
import Portfolio1 from "./components/Portfolio1.js";

/*
    This component serves the homepage of the website.
*/

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    
    render () {
        return (<div>
            <Greeting0/>
            <Portfolio1/>
            
        </div>);
    }
}

export default Home;