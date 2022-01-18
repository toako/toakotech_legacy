import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '@fortawesome/fontawesome-free/js/all.js';

/*
    SECTION 0 - GREETING; The headline or top of main page.
*/

class Greeting0 extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    
    render () {
        return (
            <Container id="s0" className="s0-animbg">
                <Row id="s0-header">
                    <Col>
                        <p id="s0-name">William <br/> Burciaga <br/> Kellermann</p>
                        <p id="s0-summary">Web Developer in Boise, ID <i class="fas fa-map-marker-alt"></i></p>
                    </Col>
                </Row>
                <Row id="s0-subheader">
                    <Col>
                        <hr id="s0-hr"/>
                        <p id="s0-desctext">
                            Hi! My name is William, but people usually call me Will. I a web developer based out of 
                            Boise, Idaho. I spend a majority of my time coding and building my skills in all things computers, the internet, and 
                            e-commerce. I spend my free time building games in Unity, going to the gym, skiing, Minecraft, and kickin' it with friends. 
                            Programming is my passion!
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Greeting0;