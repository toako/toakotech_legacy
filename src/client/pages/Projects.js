import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

let projects = [
    {
        name: "Personal Website",
        image: "website.jpg",
        desc: "I created this website to show off all of my projects and act as a gateway to learn more about my life and programming career.",
        link: "https://github.com/toako/toakotech"
    },
    {
        name: "Dungeon Crawler RPG",
        image: "game.png",
        desc: "A game I have been working off and on with. It is a class-based dungeon crawler RPG made in Unity. Project is on the backburner until I complete the FreeCodeCamp certification.",
        link: "#"
    },
    {
        name: "Scheduler App",
        image: "blank.png",
        desc: "An easy-to-use employee scheduling app. This project is an example of my database and authentication abilities.",
        link: "https://www.toako.tech/scheduler"
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

class Projects extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            proj: projects
        };
    }

    projectTemplate (name, image, desc, link) {
        const imageSource = `/res/proj/${image}`;
        return (
        <a href={link}><Row className="text-center proj-box">
            <Col className="col-5">
                <img src={imageSource} className="proj-img rounded" alt=""/>
            </Col>
            <Col className="col-7 text-left">
                <p className="proj-name">{name}</p>
                <p className="proj-desc">{desc}</p>
            </Col>
    </Row></a>)
    }

    render () {
        return (<div className="align-items-center port-body">
        <Container style={{maxWidth: "80%"}}>
            <p className="col-12 proj-header">Projects</p>
            {this.state.proj.map((p) => this.projectTemplate(p.name, p.image, p.desc, p.link))}
        </Container>
    </div>);
    }
}

export default Projects;