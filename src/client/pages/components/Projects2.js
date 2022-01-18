import React from "react";
import '@fortawesome/fontawesome-free/js/all.js';
import { Container, Row, Col, Button } from "react-bootstrap";

let projects = [
    {
        name: "Personal Website",
        image: "website.jpg",
        desc: "I created this website to show off all of my projects and act as a gateway to learn more about my life and programming career.",
        link: "https://github.com/toako/toakotech"
    },
    {
        name: "Super Secret Dungeon Crawler Project",
        image: "game.png",
        desc: "A class-based dungeon crawler RPG made in Unity. My most ambitious work yet, stay tuned.",
        link: "#"
    },
    {
        name: "CodePen Projects",
        image: "codepen.png",
        desc: "Visit my CodePen page to view all of my FreeCodeCamp projects that involves mostly React and D3.",
        link: "https://codepen.io/toako"
    },
    {
        name: "Repl.it Projects",
        image: "repl.png",
        desc: "Visit my Repl.it page to view all of my FreeCodeCamp projects that involves mostly Python, Pandas, and Node/Express.",
        link: "https://repl.it/@toakonguf12"
    },
    {
        name: "GitHub Page",
        image: "blank.png",
        desc: "View all of the rest of my projects from free time and high school on GitHub.",
        link: "https://www.github.com/toako"
    },
    
];
/*
    SECTION 2 - Projects; Show current projects.
*/

class Projects2 extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            proj: projects
        };
    }

    render () {
        return (
            <Container id="s2">
                <Row className="text-center pt-5 pb-5">
                    <Col>
                        <p id="s2-header">P r o j e c t s</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-center text-white">
                            <span className="text-danger font-weight-bold">Current Project: </span>
                            <i>Unrevealed Dungeon Crawler Game</i>
                        </p>
                        <Button className="s2-button" href="https://github.com/toako/toakotech">
                            Source code for this website <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                        </Button>
                        <Button className="s2-button" href="https://www.github.com/toako">
                            Browse my Github <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                        </Button>
                        <Button className="s2-button" href="https://codepen.io/toako">
                            Projects on codepen.io <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                        </Button>
                        <Button className="s2-button" href="https://repl.it/@toakonguf12">
                            Projects on repl.it <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                        </Button>
                        <Button className="s2-button" href="#s2-header">
                            Check out progress on my game! <i>Coming soon...</i> <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Projects2;