import React from "react";
import { LinkContainer } from "react-router-bootstrap"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import '@fortawesome/fontawesome-free/js/all.js';


export default function Navigation () {
    return (
        <Navbar fixed="top" variant="dark" bg="dark">
            <LinkContainer to="/">
                <Navbar.Brand className="imageSwitch"></Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
                <LinkContainer to="/portfolio">
                    <Nav.Link>Portfolio <i className="fas fa-book-open fa-xs"></i></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/projects">
                    <Nav.Link>Projects <i className="fas fa-pencil-alt fa-xs"></i></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                    <Nav.Link>About Me <i className="fas fa-user fa-xs"></i></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                    <Nav.Link>Contact <i className="fas fa-phone fa-xs"></i></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/eclipse">
                    <Nav.Link>Eclipse <img 
                        src="/res/mitsu.png" 
                        alt="mitsubishi logo" 
                        width="20px" 
                        height="20px" 
                        style={{marginTop: "-4px"}}
                        />
                    </Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav>
                <LinkContainer to="/scheduler">
                    <Nav.Link>Scheduler App <i className="fas fa-calendar-alt fa-xs"></i></Nav.Link>
                </LinkContainer>
                <Nav.Link href="https://github.com/toako">GitHub <i className="fab fa-github fa-sm"></i></Nav.Link>
            </Nav>
            
            
        </Navbar>
    )
    
}