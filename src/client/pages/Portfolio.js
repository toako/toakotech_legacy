import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProgressBar from "react-bootstrap/ProgressBar"

class Portfolio extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    render () {
        return (
            <div>
                <div className="align-items-center port-body">
                    <Container fluid={true}>
                        <Row className="text-center">
                            <p className="display-1 col-12">Portfolio</p>
                        </Row>
                        <Row>
                            <Col className="col-4">
                                <div className="port-area">
                                    <h1 className="text-center">Programming Experience</h1>
                                    <hr/>
                                    <Row>
                                        <Col>
                                            <Row className="align-items-center lang-item">
                                                <Col className="col-2">
                                                    <img src="/res/logos/html5.png" alt="Html Logo Icon by Pixel Icons" width="100%"/>
                                                </Col>
                                                <Col className="col-6 mr-auto">
                                                    <h4>HTML</h4>
                                                </Col>
                                                <Col className="col-4">
                                                    <h3 className="exp adv text-center">Advanced</h3>
                                                </Col>
                                            </Row>
                                            <Row className="align-items-center lang-item">
                                                <Col className="col-2">
                                                    <img src="/res/logos/css.png" alt="Css Logo Icon by Pixel Icons" width="100%"/>
                                                </Col>
                                                <Col className="col-6">
                                                    <h4>CSS</h4>
                                                </Col>
                                                <Col className="col-4">
                                                    <h3 className="exp skl text-center">Skilled</h3>
                                                </Col>
                                            </Row>
                                            <Row className="align-items-center lang-item">
                                                <Col className="col-2">
                                                    <img src="/res/logos/js.png" alt="JS Logo" width="100%"/>
                                                </Col>
                                                <Col className="col-6">
                                                    <h4>JavaScript</h4>
                                                </Col>
                                                <Col className="col-4">
                                                    <h3 className="exp adv text-center">Advanced</h3>
                                                </Col>
                                            </Row>
                                            <Row className="align-items-center lang-item">
                                                <Col className="col-2">
                                                    <img src="/res/logos/unity.png" alt="Unity Logo by Icons8" width="100%"/>
                                                </Col>
                                                <Col className="col-6">
                                                    <h4>Unity</h4>
                                                </Col>
                                                <Col className="col-4">
                                                    <h3 className="exp adv text-center">Advanced</h3>
                                                </Col>
                                            </Row>
                                            <Row className="align-items-center lang-item">
                                                <Col className="col-2">
                                                    <img src="/res/logos/unity.png" alt="Unity Logo by Icons8" width="100%"/>
                                                </Col>
                                                <Col className="col-6">
                                                    <h4>Unity</h4>
                                                </Col>
                                                <Col className="col-4">
                                                    <h3 className="exp adv text-center">Advanced</h3>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    
                                </div>
                            </Col>
                            <Col className="col-4">
                                <div className="port-area">
                                    <h1 className="text-center">Overview</h1>
                                    <hr/>
                                </div>
                                
                            </Col>
                            <Col className="col-4">
                                <div className="port-area">
                                    <h1 className="text-center">FreeCodeCamp Certifications</h1>
                                    <hr/>
                                    <div className="fcc-prog">
                                        <h5>1. Responsive Web Design Certification </h5>
                                        <ProgressBar variant="success" now={100} label={"100%"}/>
                                    </div>
                                    <div className="fcc-prog">
                                        <h5>2. JS Algorithms and Data Structures Certification </h5>
                                        <ProgressBar variant="success" now={100} label={"100%"}/>
                                    </div>
                                    <div className="fcc-prog">
                                        <h5>3. Front End Libraries Certification </h5>
                                        <ProgressBar variant="success" now={100} label={"100%"}/>
                                    </div>
                                    <div className="fcc-prog">
                                        <h5>4. Data Visualization Certification </h5>
                                        <ProgressBar animated variant="warning" now={60} label={"60%"}/>
                                    </div>
                                    <div className="fcc-prog">
                                        <h5>5. APIs and Microservices Certification </h5>
                                        <ProgressBar variant="success" now={100} label={"100%"}/>
                                    </div>
                                    <div className="fcc-prog">
                                        <h5>6. Quality Assurance Certification Certification </h5>
                                        <ProgressBar animated variant="warning" now={60} label={"60%"}/>
                                    </div>
                                    <div className="fcc-prog">
                                        <h5><span className="exp opt">Optional</span> 7. Scientific Computing with Python Certification </h5>
                                        <ProgressBar variant="success" now={100} label={"100%"}/>
                                    </div>
                                    <div className="fcc-prog">
                                        <h5><span className="exp opt">Optional</span> 8. Data Analysis with Python Certification </h5>
                                        <ProgressBar variant="success" now={100} label={"100%"}/>
                                    </div>
                                    <div className="fcc-prog">
                                        <h5><span className="exp opt">Optional</span> 9. Information Security Certification </h5>
                                        <ProgressBar animated variant="warning" now={5} label={"0%"}/>
                                    </div>
                                    <div className="fcc-prog">
                                        <h5><span className="exp opt">Optional</span> 10. Machine Learning with Python Certification </h5>
                                        <ProgressBar animated variant="warning" now={5} label={"0%"}/>
                                    </div>
                                    <h4 className="fcc-prog font-italic">
                                        Check out my FreeCodeCamp profile <a href="https://www.freecodecamp.org/toako">here</a>.
                                    </h4>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                
            </div>
        );
    }
}

export default Portfolio;