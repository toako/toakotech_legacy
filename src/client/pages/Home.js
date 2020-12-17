import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import '@fortawesome/fontawesome-free/js/all.js';

import { LinkContainer } from "react-router-bootstrap"

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    render () {
        return (<div>
            {/*Website Section 1 - Introduction*/}
            <div className="home-bg align-items-center">
                {/*Introduction Container*/}
                <Container style={{maxWidth: "1400px"}}>
                    <Row className="text-center"> {/*Row 1 - Name*/}
                        <p className="display-1 home-title-shadow col-sm-12">
                            Hello! I'm 
                            <span className="home-title-emphasis"> Will Kellermann</span>.
                        </p>
                    </Row>
                    <Row className="text-center"> {/*Row 2 - Location*/}
                        <p className="display-4 home-title-shadow col-sm-12">
                            Programmer in Boise, Idaho <i className="fas fa-map-marker-alt"></i> 
                        </p>
                    </Row>
                    <Row className="col-sm-12"> {/*Row 3 - User Guiding*/}
                    <div className="hoverObject" style={{marginTop: "400px"}}>
                        <p className="display-4 home-title-shadow" style={{marginLeft: "-148px"}}>Find out more</p>
                        <i className="fas fa-arrow-down fa-4x home-title-shadow"></i>
                    </div>
                    </Row>
                </Container>
            </div>
            {/*Website Section 1 - Portfolio Summary*/}
            <div className="align-items-center section-area">
                <Container>
                    {/*Row 1*/}
                    <Row className="text-center">
                        <h1 className="col-sm-12 section-title">I am a MERN stack developer and Unity game designer.</h1>
                    </Row>
                    <Row className="text-center">
                        <h4 className="col-sm-12 section-subtitle">Click a section below <i className="far fa-hand-point-down"></i></h4>
                    </Row>
                    <Row>
                        <Col className="col-sm-6">
                            <LinkContainer to="/portfolio"><a><div className="sect sect-portfolio">
                                <img 
                                    className="sect-img img-fluid"
                                    src="./res/logos/fcc.png"
                                    alt="portfolio image" 
                                />
                                <div className="sect-text">
                                    <h2 className="sect-header-portfolio">Portfolio</h2>
                                    <h4 className="sect-desc">
                                        Are you an <span style={{fontWeight: "bold", color: "#0098dc"}}>employer</span>? Learn 
                                        about my skillsets, certifications, and
                                        experience with programming and technology.
                                    </h4>
                                </div>
                            </div></a></LinkContainer>
                        </Col>
                        <Col className="col-sm-6">
                        <LinkContainer to="/projects"><a><div className="sect sect-projects">
                                <img 
                                    className="sect-img img-fluid"
                                    src="./res/gamepeek.gif"
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
                            </div></a></LinkContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-sm-6">
                            <LinkContainer to="/about"><a><div className="sect sect-about">
                                <img 
                                    className="sect-img img-fluid"
                                    src="./res/logos/fcc.png"
                                    alt="about image" 
                                />
                                <div className="sect-text">
                                    <h2 className="sect-header-about">About Me</h2>
                                    <h4 className="sect-desc">
                                        Life is more than computers! Learn 
                                    </h4>
                                </div>
                            </div></a></LinkContainer>
                        </Col>
                        <Col className="col-sm-6">
                        <LinkContainer to="/contact"><a><div className="sect sect-contact">
                                <img 
                                    className="sect-img img-fluid"
                                    src="./res/gamepeek.gif"
                                    alt="contact image" 
                                />
                                <div className="sect-text">
                                    <h2 className="sect-header-contact">Contact Me</h2>
                                    <h4 className="sect-desc">
                                        Get a sneak peek of what games and apps I am 
                                        working on. Check back for progress and see
                                        future plans I may have.
                                    </h4>
                                </div>
                            </div></a></LinkContainer>
                        </Col>
                    </Row>
                </Container>
            </div>
                
        </div>);
    }
}

export default Home;