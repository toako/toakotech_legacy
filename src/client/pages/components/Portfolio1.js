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
                            <i> Check out my FreeCodeCamp profile <a href="https://www.freecodecamp.org/toako">here</a>.</i>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="s1-title"><i class="fas fa-star"></i> Coding Skillsets</h1>
                        <div className="s1-bar"/>
                        <p>
                            <span className="s1-skillset"><i class="fas fa-code"></i> MERN Stack Web Development</span> I build websites using 
                            React and SCSS for the front-end, Express.JS and Node.JS on the back-end, and MongoDB (& Mongoose) for storage and retrieval of data. 
                            In fact, this very website is built using the aforementioned libraries. I have used MERN on my website and also in my day-to-day work.<br/>
                            
                        </p>
                        <p>
                            <span className="s1-skillset"><i class="fas fa-funnel-dollar"></i> Sales Funnels & Tracking Tools</span> My current workplace has provided me an excellent opportunity
                            to grow and build skills in the direct response marketing space. I can confidently build a sales funnel/website from top to bottom with tracking and upsells. I also
                            build custom tracking tools in JS for scroll depth, user interaction, split testing, customer cookies and metrics, as well as collecting abandoned cart information. I have
                            also built custom checkout forms, affiliate pages, and improved sales funnels for a few clients that are using the Clickbank affiliate marketing platform.
                        </p>
                        <p>
                            <span className="s1-skillset"><i class="fas fa-funnel-dollar"></i> Unity Game Development</span> Right now, I am working on an unannounced game project in Unity,
                            which uses C# for scripting, The game I am building is a top-down dungeon crawler that utilizes A* pathfinding, advanced randomly-generated regions and dungeons, and API usage for a wide range 
                            of items, weapons, and creatures. This is what I do in my free time and is in no way something I do professionally.
                        </p>
                    </Col>
                </Row>
            </Container>);
    }
}

export default Portfolio1;