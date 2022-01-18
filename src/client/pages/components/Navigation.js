import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import '@fortawesome/fontawesome-free/js/all.js';

/*
    This component feeds the top-fixed navbar that is found on main parts of the site.
*/

export default function Navigation () {
    return (
        <Navbar collapseOnSelect expand="lg" bg="tt" fixed="top" variant="light" className="navbar-tt">
            <Container>
            <Navbar.Brand className="nav-btn" href="#s0">
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
                    <Nav.Link className="nav-btn" href="#s1">Portfolio</Nav.Link>
                    <Nav.Link className="nav-btn" href="#s2">Projects</Nav.Link>
                    <Nav.Link className="nav-btn" href="#s3">Contact</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="nav-btn" href="https://www.github.com/toako">GitHub <i className="fab fa-github fa-sm"></i></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
    
}