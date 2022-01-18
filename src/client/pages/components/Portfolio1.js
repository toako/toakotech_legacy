import React from "react";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import '@fortawesome/fontawesome-free/js/all.js';

/*
    SECTION 1 - PORTFOLIO; Show skills and abilites.
*/

class Portfolio1 extends React.Component {
    
    render () {
        return (<Container id="s1">
                <Row className="text-center pt-5 pb-5">
                    <Col>
                        <p id="s1-header">P o r t f o l i o</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="s1-title"><i class="fab fa-free-code-camp"></i> Certified Programmer</h1>
                        <div className="s1-bar"/>
                        <p>
                            I began FreeCodeCamp in August of 2020. Though I had the ability to code and took multiple coding classes through Boise State University, I wanted to step up my
                            game by reinforcing my knowledge and confidence in all things web development. For the unacquainted, FreeCodeCamp is a online coding camp that gives lessons, challenges,
                            and projects in various categories of web development. 
                            <i> Check out my FreeCodeCamp profile <a href="https://www.freecodecamp.org/toako">here</a>.</i>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="s1-title"><i class="fas fa-star"></i> Coding Skillsets</h1>
                        <div className="s1-bar"/>
                        <Tabs defaultActiveKey="mern" id="skl" className="mb-3">
                            <Tab eventKey="mern" title="MERN Web Development" className="s1-tab">
                                React and SCSS for the front-end, Express.JS and Node.JS on the back-end, and MongoDB (& Mongoose) for storage and retrieval of data. 
                                In fact, this very website is built using the aforementioned libraries. I have used MERN on my website and also in my day-to-day work.
                            </Tab>
                            <Tab eventKey="funnel" title="Funnels & E-Commerce" className="s1-tab">
                                I build sales funnels & e-commerce pages from top to bottom with metrics, retargeting, and upsells. I also
                                build custom tracking tools in JS for scroll depth, user interaction, split testing, customer cookies and metrics, as well as collecting abandoned cart information. I have
                                also built custom checkout forms, affiliate pages, and improved sales funnels for a few clients that are using the Clickbank affiliate marketing platform.
                            </Tab>
                            <Tab eventKey="game" title="Game Dev" className="s1-tab">
                                I'm actively working on an unrevealed game project in Unity using C#. It is a top-down dungeon crawler that utilizes A* 
                                pathfinding, advanced randomly-generated regions and dungeons, and API usage for a wide range 
                                of items, weapons, and creatures. This is what I do in my free time and is in no way something I do professionally.
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>);
    }
}

export default Portfolio1;