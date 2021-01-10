import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import '@fortawesome/fontawesome-free/js/all.js';

import { LinkContainer } from "react-router-bootstrap"

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
            {/*Greeting Area*/}
            <div id="home-greet-area" className="align-items-center">
                <Container style={{maxWidth: "1400px"}}>
                    <Row className="text-center">
                        <p id="home-greet-title" className="col-12">Hello! I'm <span style={{color: "#ffa214", fontWeight: "bold"}}> Will Kellermann</span>.</p>
                    </Row>
                    <Row className="text-center">
                        <p id="home-greet-location" className="home-greet-location col-12">Programmer in Boise, Idaho <i className="fas fa-map-marker-alt"></i></p>
                    </Row>
                    <Row className="col-12">
                        <div id="home-greet-hover-fom">
                            <i id="home-greet-fom" className="fas fa-arrow-down fa-4x"></i>
                        </div>
                    </Row>
                </Container>
            </div>
            {/*Topic Area*/}
            <div id="home-topic-area" className="align-items-center">
                <Container>
                    <Row className="text-center">
                        <h1 id="home-topic-title" className="col-12">I am a MERN stack developer and Unity game designer.</h1>
                    </Row>
                    <Row className="text-center">
                        <h4 id="home-topic-subtitle" className="col-12">Click a section below <i className="far fa-hand-point-down"></i></h4>
                    </Row>
                    <Row>
                        <Col className="col-6">
                            <LinkContainer to="/portfolio"><button className="sect sect-portfolio">
                                <img 
                                    className="sect-img img-fluid"
                                    src="./res/sect/fcc.png"
                                    alt="portfolio" 
                                />
                                <div className="sect-text">
                                    <h2 className="sect-header-portfolio">Portfolio</h2>
                                    <h4 className="sect-desc">
                                        Are you an <span style={{fontWeight: "bold", color: "#0098dc"}}>employer</span>? Learn 
                                        about my skillsets, certifications, and
                                        experience with programming and technology.
                                    </h4>
                                </div>
                            </button></LinkContainer>
                        </Col>
                        <Col className="col-6">
                        <LinkContainer to="/projects"><button className="sect sect-projects">
                                <img 
                                    className="sect-img img-fluid"
                                    src="./res/sect/gamepeek.gif"
                                    alt="projects gif" 
                                />
                                <div className="sect-text">
                                    <h2 className="sect-header-projects">Projects</h2>
                                    <h4 className="sect-desc">
                                        Get a sneak peek of what games and apps I am 
                                        working on. Check back for progress and see
                                        future plans I may have.
                                    </h4>
                                </div>
                            </button></LinkContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-6">
                            <LinkContainer to="/about"><button className="sect sect-about">
                                <img 
                                    className="sect-img img-fluid"
                                    src="./res/sect/profile1.png"
                                    alt="Profile" 
                                />
                                <div className="sect-text">
                                    <h2 className="sect-header-about">About Me</h2>
                                    <h4 className="sect-desc">
                                        Life is more than computers! Here you can find a 
                                        bit about my personal life, hobbies, and 
                                        my background.
                                    </h4>
                                </div>
                            </button></LinkContainer>
                        </Col>
                        <Col className="col-6">
                        <LinkContainer to="/contact"><button className="sect sect-contact">
                                <img 
                                    className="sect-img img-fluid"
                                    src="./res/sect/phone.jpeg"
                                    alt="Credit: Terje Sollie on pexels.com, phone.jpeg" 
                                />
                                <div className="sect-text">
                                    <h2 className="sect-header-contact">Contact Me</h2>
                                    <h4 className="sect-desc">
                                        Submit a question or get in touch with 
                                        me. Also includes links to all of my social media.
                                    </h4>
                                </div>
                            </button></LinkContainer>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>);
    }
}

export default Home;