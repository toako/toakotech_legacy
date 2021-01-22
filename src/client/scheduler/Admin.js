import React from "react";
import Axios from "axios";
import { withRouter } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class Admin extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            session: {},
            user: {},
            organization: {}
        };
        this.logout = this.logout.bind(this);
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
        this.logout = this.logout.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    redirect (e) {
        let action = (e.target.id).substr(4);
        this.props.history.push(`/s/admin/${action}`);
    }

    logout () {
        Axios.post(`${server}/s/logout`, { action: "logout"} )
            .then(res => {
                if (res.data.operation === "destroyed session")
                    this.props.history.push(`/s`);
            })
            .catch(err => console.log(err));
    }

    render () {
        return (<Navbar bg="light" variant="primary">
                <Navbar.Brand>Hello, {this.state.user.firstName}</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavDropdown title="Manage" id="collasible-nav-dropdown">
                        <NavDropdown.Item id="nav-users" onClick={this.redirect}>Users <i className="fas fa-user-edit fa-sm"></i></NavDropdown.Item>
                        <NavDropdown.Item id="nav-roles" onClick={this.redirect}>Roles <i className="fas fa-bars fa-sm"></i></NavDropdown.Item>
                        <NavDropdown.Item id="nav-locations" onClick={this.redirect}>Locations <i className="fas fa-map-marker-alt fa-sm"></i></NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link id="nav-schedule" onClick={this.redirect}>Schedule <i className="fas fa-calendar-alt fa-sm"></i></Nav.Link>
                    <Nav.Link id="nav-notifications" onClick={this.redirect}>Notifications <i className="fas fa-bell fa-sm"></i></Nav.Link>
                    <Nav.Link id="nav-settings" onClick={this.redirect}>Settings <i className="fas fa-cog fa-sm"></i></Nav.Link>
                </Nav>
                <Nav>
                    <Button onClick={this.logout} variant="outline-danger">Log Out <i className="fas fa-sign-out-alt fa-sm"></i></Button>
                </Nav>
            </Navbar>)
    }
}

export default withRouter(Admin);