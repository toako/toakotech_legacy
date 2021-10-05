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
            <Container id="s0">
                <Row id="s0-header">
                    <Col>
                        <p id="s0-name">Will Kellermann</p>
                        <p id="s0-summary">Web Developer in Boise, ID <i class="fas fa-map-marker-alt"></i></p>
                    </Col>
                </Row>
                <Row id="s0-subheader">
                    <Col id="s0-descbox">
                        <p id="s0-desctext">
                            Hi there, I'm Will, a web developer working in Boise, Idaho. I spend a majority of my time
                            coding and building my skills in all things computers, the internet, and e-commerce. I spend my free time
                            building games in Unity, tuning/modding my car, and hanging with my friends. 
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p id="s0-jumptitle">Jump to a section:</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} md={6} sm={12}>
                        <button className="home-topic home-topic-portfolio">
                            <img 
                                className="home-topic-img img-fluid"
                                src="./res/topic/fcc.png"
                                alt="portfolio" 
                            />
                            <div className="home-topic-textarea">
                                <h2 className="home-topic-header-portfolio">Portfolio</h2>
                            </div>
                        </button>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                    <button className="home-topic home-topic-projects">
                            <img 
                                className="home-topic-img img-fluid"
                                src="./res/topic/gamepeek.gif"
                                alt="projects gif" 
                            />
                            <div className="home-topic-textarea">
                                <h2 className="home-topic-header-projects">Projects</h2>
                            </div>
                        </button>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <button className="home-topic home-topic-about">
                            <img 
                                className="home-topic-img img-fluid"
                                src="./res/topic/profile1.png"
                                alt="Profile" 
                            />
                            <div className="home-topic-textarea">
                                <h2 className="home-topic-header-about">About Me</h2>
                            </div>
                        </button>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                    <button className="home-topic home-topic-contact">
                            <img 
                                className="home-topic-img img-fluid"
                                src="./res/topic/phone.jpeg"
                                alt="Credit: Terje Sollie on pexels.com, phone.jpeg" 
                            />
                            <div className="home-topic-textarea">
                                <h2 className="home-topic-header-contact">Contact Me</h2>
                            </div>
                        </button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Greeting0;