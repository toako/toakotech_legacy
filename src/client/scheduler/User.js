/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    User.js - FRONT END

    Technically the navbar, but is the linking source for all aspects that an user would
    need to view their schedules.

////////////////////////////////////////////////////////////////////////////////////////*/

import React from "react";
import Axios from "axios";
import { withRouter } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class Manager extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            session: {},
            user: {}
        };
        this.logout = this.logout.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount () {
        Axios.get(`${server}/s/user`)
            .then(res => {
                this.setState({
                    session: res.data.session,
                    user: res.data.user
                });
            })
            .catch(err => console.log(err));
    }

    redirect (e) {
        let action = (e.target.id).substr(4);
        this.props.history.push(`/s/user/${action}`);
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
                <Nav.Link id="nav-" onClick={this.redirect}>Home <i className="fas fa-home fa-sm"></i></Nav.Link>
                    <Nav.Link id="nav-schedule" onClick={this.redirect}>Schedule <i className="fas fa-calendar-alt fa-sm"></i></Nav.Link>
                    <Nav.Link id="nav-requests" onClick={this.redirect}>Requests <i className="fas fa-share fa-sm"></i></Nav.Link>
                    <Nav.Link id="nav-notifications" onClick={this.redirect}>Notifications <i className="fas fa-bell fa-sm"></i></Nav.Link>
                </Nav>
                <Nav>
                    <Button onClick={this.logout} variant="outline-danger">Log Out <i className="fas fa-sign-out-alt fa-sm"></i></Button>
                </Nav>
            </Navbar>)
    }
}

export default withRouter(Manager);