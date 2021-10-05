import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/js/all.js';

const inf = {
    red: "#e60013",
    orange: "#ff8126",
    yellow: "#ffe800",
    green: "#14ff2f",
    forest: "#0b7417",
    blue: "#009bff",
    cyan: "#30ffff",
    purple: "#6d23ff",
    magenta: "#c214ff",
    graydark: "#494949",
    graylight: "#fafafa"
};

/*
    This component serves the homepage of the website.
*/

class HomeNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div>
            <Container id="section0">
                <Row id="sec0-header" className="align-items-center">
                    <Col>
                        <p id="sec0-summary">
                            Programmer.<br/>
                            E-commerce.<br/>
                            Game Dev.
                        </p>
                    </Col>
                    <Col>
                        <p id="sec0-name">I am<br/>William<br/>Kellermann</p>
                    </Col>
                </Row>
            </Container>
            <Container id="section1">
                <Row className="align-items-center">
                    <Col md={12} lg={8}>
                        <p id="sec1-title">Who am I?</p>
                        <div className="divider"></div>
                        <p id="sec1-description">
                            I usually go by Will. I am a self-taught programmer located in Boise, Idaho. You'll catch me in my free time playing Minecraft, working on my car, or hanging out with my friends.
                        </p>
                    </Col>
                    <Col md={12} lg={4}>
                        <img id="sec1-img" src="./res/will.jpg" alt="William Kellermann" class="img-fluid mx-auto d-block"/>
                    </Col>
                </Row>
            </Container>
            <Container id="section2">
                <Row className="align-items-center">
                    <Col>
                        <p id="sec2-title">What do I do?</p>
                        <div className="divider"></div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={4} sm={12} className="text-center">
                        <i className="fas fa-laptop-code fa-3x mb-4"></i>
                        <p className="sec2-subtitle">Design Websites</p>
                        <div className="divider-small"></div>
                        <p className="sec2-desc">
                            I design and build websites using libraries like Node.js, React, Bootstrap, and Express.js. 
                            I also use databases like MySQL and MongoDB. I also build websites using Shopify and WordPress.
                        </p>
                    </Col>
                    <Col md={4} sm={12} className="text-center">
                        <i className="fas fa-funnel-dollar fa-3x mb-4"></i>
                        <p className="sec2-subtitle">Build Sales Funnels</p>
                        <div className="divider-small"></div>
                        <p className="sec2-desc">
                            Through my work experience, I have taken on projects to build and scale e-commerce product offers, 
                            including long-form and e-commerce style pages, as well as using CRM's and cookies/tracking to analyze performance.
                        </p>
                    </Col>
                    <Col md={4} sm={12} className="text-center">
                        <i className="fas fa-gamepad fa-3x mb-4"></i>
                        <p className="sec2-subtitle">Make Games</p>
                        <div className="divider-small"></div>
                        <p className="sec2-desc">
                            I have been creating games since 7th grade, beginning with writing mods for Minecraft (Java) and 2d top-downs in Scratch.
                            As of right now, I am working on a dungeon-crawler RPG in Unity, written with C# and advanced AI NPC's. Will reveal soon. ;)
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container id="section3">
                <Row className="align-items-center">
                    <Col>
                        <p id="sec3-title"><i class="fab fa-free-code-camp"></i> Certifications <i class="fab fa-free-code-camp"></i></p>
                        <div className="divider-forest"></div>
                        <p id="sec3-desc">
                            To thrust myself into the web development world (which I am in right now), I took coding certification courses through FreeCodeCamp. 
                            To date, I have finished 6 certifications and almost done with two more. They are listed below:
                        </p>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <p className="sec3-cert"><span style={{color: inf.blue}}><i className="fas fa-check-square"></i></span> 1. Responsive Web Design Certification</p>
                    <p className="sec3-cert"><span style={{color: inf.blue}}><i className="fas fa-check-square"></i></span> 2. JS Algorithms and Data Structures Certification</p>
                    <p className="sec3-cert"><span style={{color: inf.blue}}><i className="fas fa-check-square"></i></span> 3. Front End Libraries Certification</p>
                    <p className="sec3-cert"><span style={{color: inf.orange}}><i className="far fa-square"></i></span> 4. Data Visualization Certification</p>
                    <p className="sec3-cert"><span style={{color: inf.blue}}><i className="fas fa-check-square"></i></span> 5. APIs and Microservices Certification</p>
                    </Col>
                    <Col>
                    <p className="sec3-cert"><span style={{color: inf.orange}}><i className="far fa-square"></i></span> 6. Quality Assurance Certification</p>
                    <p className="sec3-cert"><span style={{color: inf.blue}}><i className="fas fa-check-square"></i></span> 7. Scientific Computing with Python Certification</p>
                    <p className="sec3-cert"><span style={{color: inf.blue}}><i className="fas fa-check-square"></i></span> 8. Data Analysis with Python Certification</p>
                    <p className="sec3-cert"><span style={{color: inf.orange}}><i className="far fa-square"></i></span> 9. Information Security Certification</p>
                    <p className="sec3-cert"><span style={{color: inf.orange}}><i className="far fa-square"></i></span> 10. Machine Learning with Python Certification</p>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}

export default HomeNew;