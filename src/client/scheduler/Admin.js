import React from "react";
import Axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

import LinkContainer from "react-router-bootstrap";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class Admin extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            session: {},
            user: {},
            organization: {}
        };
    }

    componentDidMount () {
        Axios.get(`${server}/s/admin`)
            .then(res => {
                console.log("Data passed from server:");
                console.log(res.data);
                this.setState({
                    session: res.data.session,
                    user: res.data.user,
                    organization: res.data.organization
                });
            })
            .catch(err => console.log(err));
    }

    render () {
        return (<Container>
        <Navbar bg="light" variant="light">
            <Navbar.Brand>Hello, {this.state.user.firstName}</Navbar.Brand>
            <Nav className="mr-auto">
                <NavDropdown title="Manage" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#users">Users <i class="fas fa-user-edit fa-sm"></i></NavDropdown.Item>
                    <NavDropdown.Item href="#roles">Roles <i class="fas fa-bars fa-sm"></i></NavDropdown.Item>
                    <NavDropdown.Item href="#locations">Locations <i class="fas fa-map-marker-alt fa-sm"></i></NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#schedule">Schedule <i class="fas fa-calendar-alt fa-sm"></i></Nav.Link>
                <Nav.Link href="#notifications">Notifications <i class="fas fa-bell fa-sm"></i></Nav.Link>
                <Nav.Link href="#settings">Settings <i class="fas fa-cog fa-sm"></i></Nav.Link>
            </Nav>
            <Nav>
                <Button variant="outline-danger">Log Out <i className="fas fa-sign-out-alt fa-sm"></i></Button>
            </Nav>
        </Navbar>
        </Container>)
    }
}

export default Admin;