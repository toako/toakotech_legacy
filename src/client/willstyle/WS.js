/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    ws.js - FRONT END

    WillStyle.js dashboard page, showing data for all requests.

////////////////////////////////////////////////////////////////////////////////////////*/

import React from "react";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class WS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount () {
        console.log("running");
        Axios.get(`${server}/ws`)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    render () {
        return (<Container>
            <h1>test</h1>
        </Container>);
    }
}

export default WS;