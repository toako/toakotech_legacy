import React from "react";
import { IndexLinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container } from "react-bootstrap";
import '@fortawesome/fontawesome-free/js/all.js';

/*
    This component feeds the top-fixed navbar that is found on main parts of the site.
*/

export default function Navigation () {
    return (
        <Navbar collapseOnSelect expand="lg" bg="tt" fixed="top" variant="light" className="navbar-tt">
            <Container>
            <Navbar.Brand className="nav-btn" href="#home">
                <img
                alt=""
                src="./res/iconlarge.png"
                width="30"
                height="30"
                className="d-inline-block align-top mr-1"
                />{'   '}
                Will Kellermann
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto mr-auto">
                    <Nav.Link className="nav-btn" href="#portfolio">Portfolio</Nav.Link>
                    <Nav.Link className="nav-btn" href="#projects">Projects</Nav.Link>
                    <Nav.Link className="nav-btn" href="#about">About</Nav.Link>
                    <Nav.Link className="nav-btn" href="#contact">Contact</Nav.Link>
                    
                </Nav>
                <Nav>
                    <Nav.Link className="nav-btn" href="#github">GitHub <i className="fab fa-github fa-sm"></i></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
    
}