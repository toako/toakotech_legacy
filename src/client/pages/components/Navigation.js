import React from "react";
import { LinkContainer } from "react-router-bootstrap"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import '@fortawesome/fontawesome-free/js/all.js';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { NavbarBrand } from "react-bootstrap";

export default function Navigation () {
    return (
        <Navbar fixed="top" variant="dark" bg="dark">
            <LinkContainer to="/">
                <Navbar.Brand className="imageSwitch"></Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
                <LinkContainer to="/portfolio">
                    <Nav.Link>Portfolio <i class="fas fa-book-open fa-xs"></i></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/projects">
                    <Nav.Link>Projects <i class="fas fa-pencil-alt fa-xs"></i></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                    <Nav.Link>About Me <i class="fas fa-user fa-xs"></i></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                    <Nav.Link>Contact <i class="fas fa-phone fa-xs"></i></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/eclipse">
                    <Nav.Link>Eclipse <img src="/res/mitsu.png" width="20px" height="20px" style={{marginTop: "-4px"}}/></Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav>
                <LinkContainer to="/scheduler">
                    <Nav.Link>Scheduler App <i class="fas fa-calendar-alt fa-xs"></i></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/github">
                    <Nav.Link>GitHub <i class="fab fa-github fa-sm"></i></Nav.Link>
                </LinkContainer>
            </Nav>
            
            
        </Navbar>
    )
    
}