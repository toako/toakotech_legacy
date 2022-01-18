import React from "react";
import '@fortawesome/fontawesome-free/js/all.js';
import Greeting0 from "./components/Greeting0.js";
import Portfolio1 from "./components/Portfolio1.js";
import Projects2 from "./components/Projects2.js";
import Contact3 from "./components/Contact3.js";

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
            <div style={{marginTop: "65px"}}></div>
            <Greeting0/>
            <Portfolio1/>
            <Projects2/>
            <Contact3/>
        </div>);
    }
}

export default Home;