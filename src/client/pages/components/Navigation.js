import React from "react";
import { IndexLinkContainer } from "react-router-bootstrap"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import '@fortawesome/fontawesome-free/js/all.js';

/*
    This component feeds the top-fixed navbar that is found on main parts of the site.
*/

export default function Navigation () {
    return (
        <Navbar fixed="top" id="navbar-tt">
            <IndexLinkContainer to="/"><button id="nav-logo"/></IndexLinkContainer>
            <Nav className="mr-auto">
                <IndexLinkContainer to="/portfolio">
                    <button className="nav-btn">Portfolio <i className="fas fa-book-open fa-xs"></i></button>
                </IndexLinkContainer>
                <IndexLinkContainer to="/projects">
                    <button className="nav-btn">Projects <i className="fas fa-pencil-alt fa-xs"></i></button>
                </IndexLinkContainer>
                <IndexLinkContainer to="/about">
                    <button className="nav-btn">About Me <i className="fas fa-user fa-xs"></i></button>
                </IndexLinkContainer>
                <IndexLinkContainer to="/contact">
                    <button className="nav-btn">Contact <i className="fas fa-phone fa-xs"></i></button>
                </IndexLinkContainer>
                <IndexLinkContainer to="/eclipse">
                    <button className="nav-btn">Eclipse <img 
                        src="/res/logos/mitsu.png" 
                        alt="mitsubishi logo" 
                        width="20px" 
                        height="20px" 
                        style={{marginTop: "-4px"}}
                        />
                    </button>
                </IndexLinkContainer>
            </Nav>
            <Nav>
                <IndexLinkContainer to="/s">
                    <button className="nav-btn">Scheduler App <i className="fas fa-calendar-alt fa-xs"></i></button>
                </IndexLinkContainer>
                <button href="https://github.com/toako" className="nav-btn">GitHub <i className="fab fa-github fa-sm"></i></button>
            </Nav>
        </Navbar>
    )
    
}