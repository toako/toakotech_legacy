import React from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import '@fortawesome/fontawesome-free/js/all.js';

/*
    SECTION 1 - PORTFOLIO; Show skills and abilites.
*/

const languages = [
    ["HTML", "html.png", "Pixel Icons", 2],
    ["CSS + Bootstrap", "css.png", "Pixel Icons", 1],
    ["JavaScript + ES6", "js.png", "", 2],
    ["Node.js + Express", "node.png", "", 2],
    ["React", "react.png", "", 2],
    ["MongoDB", "mongo.png", "", 1],
    ["Unity", "unity.png", "Icons8", 2],
    ["C# (scripting)", "csharp.png", "", 1],
    ["Python", "python.png", "", 1],
    ["Java", "java.png", "", 0],
    ["NumPy/Pandas", "pandas.png", "", 0],
    ["D3", "d3.png", "", 0],
    ["Arduino", "arduino.png", "", 1]
];

const certifications = [
    ["1. Responsive Web Design Certification", 100, false],
    ["2. JS Algorithms and Data Structures Certification", 100, false],
    ["3. Front End Libraries Certification", 100, false],
    ["4. Data Visualization Certification", 60, false],
    ["5. APIs and Microservices Certification", 100, false],
    ["6. Quality Assurance Certification", 60, false],
    ["7. Scientific Computing with Python Certification", 100, true],
    ["8. Data Analysis with Python Certification", 100, true],
    ["9. Information Security Certification", 0, true],
    ["10. Machine Learning with Python Certification", 0, true]
];

class Portfolio1 extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            lang: languages,
            certs: certifications
        };
        this.skillTemplate = this.skillTemplate.bind(this);
        this.certTemplate = this.certTemplate.bind(this);
    }
    
    skillTemplate (name, image, creator, level) {
        const levels = ["fam","skl","adv"];
        const fullLevels = ["Familiar", "Skilled", "Advanced"];

        const imgText = `/res/logos/${image}`;
        const creatorText = `${name} logo by ${creator || "unknown"}`;
        const classText = `exp ${levels[level]}`;

        return (
            <Row className="align-items-center lang-item">
                <Col className="col-2">
                    <img src={imgText} alt={creatorText} width="60%"/>
                </Col>
                <Col className="col-6 mr-auto">
                    <h4>{name}</h4>
                </Col>
                <Col className="col-4">
                    <h4 className="text-center"><span className={classText}>{fullLevels[level]}</span></h4>
                </Col>
            </Row>
        )
    }
    certTemplate (name, progress, isOptional) {
        const isAnimated = progress < 100;
        const barLength = progress > 5 ? progress : 5;
        const optionalText = isOptional ? (<span className="exp opt">Optional</span>) : "";
        const nameText = isOptional ? ` ${name}` : name;

        return (
            <div className="fcc-prog">
                <h5>{optionalText}{nameText}</h5>
                <ProgressBar variant="info" animated={isAnimated} now={barLength} label={`${progress}%`}/>
            </div>
        )
    }
    render () {
        return (<Container id="s1">
                <Row className="text-center pt-5 pb-5">
                    <Col>
                        <p id="s1-header">Portfolio</p>
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
                            <i>Check out my FreeCodeCamp profile <a href="https://www.freecodecamp.org/toako">here</a>.</i>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="text-center port-title">Coding Skillsets</h1>
                        <div className="port-bar"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="port-area">
                            <h1 className="text-center port-title">Overview</h1>
                            <div className="port-bar"/>
                            <h2 className="port-subtitle">Important Takeaway</h2>
                            <h5>
                                I am a self-taught programmer, who has dabbled in many things, but I am 
                                particularly good at web design using the MERN stack. My favorite form of 
                                hobby-coding is Unity and C#. Another important note is that I am highly 
                                proficient in math at a calculus 2 level.
                            </h5>
                            <h2 className="port-subtitle">Coding History</h2>
                            <h5>
                                I have been coding since 7th grade. 
                                At Centennial High School, I took Boise State concurrent CS classes for
                                4 years and got 11 college credits. There, I learned to work in a team, learn Java, 
                                and dabble with Arduino microcontrollers. I started taking programming seriously 
                                junior year of high school, and I have been teaching myself Unity game design, as 
                                well as building up my knowledge and skills in full-stack web development.
                            </h5>
                            <h2 className="port-subtitle">FreeCodeCamp Certification</h2>
                            <h5>
                                FreeCodeCamp is a non-profit coding camp for learning JavaScript-based web development 
                                and earning coding certificates in various categories. I use and have been completing 
                                the FreeCodeCamp course and its certifications as a formal proof of my knowledge and
                                learning of various JS-based libraries and technologies for full-stack web development.
                            </h5>
                            <h2 className="port-subtitle">Proving My Skills</h2>
                            <h5>
                                I have applied my MERN stack skills in this website and use Heroku as my server and environment. 
                                This website heavily utilizes React-Bootstrap for styling. Please refer to my custom
                                made employee scheduling app to see my database and authentication skills.
                            </h5>
                        </div>
                    </Col>
                </Row>
            </Container>);
    }
}

export default Portfolio1;