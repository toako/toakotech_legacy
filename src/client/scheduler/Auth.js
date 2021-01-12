import React from "react";
import Axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import '@fortawesome/fontawesome-free/js/all.js';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";
const pw = "";
const db = "mongodb+srv://toako:ahAytD9KnMEqbTiK@toakotech.5npxi.mongodb.net/<dbname>?retryWrites=true&w=majority"



const infoPopover = (
    <Popover id="popover-basic">
        <Popover.Title as="h2">Employee Clocking and Scheduling App</Popover.Title>
        <Popover.Content> 
            This is an application that is designed to showcase my abilities in both
            the <strong>front</strong> and <strong>back</strong> end. This app allows 
            you to make an organization (say you were a business), then you can add 
            users (employees), and set their schedules and roles (such as accountant 
            or custodian), as well as grant or deny requests made by employees.
            In contrast, employees can make vacation/sick requests, trade shifts,
            view their work schedule, and clock in and out from work. All data is 
            stored on <strong>MongoDB</strong>. I am using <strong>Bootstrap </strong> 
            almost exclusively for styling, as I am focusing more on the mechanics than looks.
        </Popover.Content>
    </Popover>
);

class Auth extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            username: "", //USED IN login POST
            password: "", //USED IN login POST
            _id: "", //USED IN login POST
            oOrgName: "", //USED IN createOrg POST
            oEmail: "", //USED IN createOrg POST
            oFirstName: "", //USED IN createOrg POST
            oLastName: "", //USED IN createOrg POST
            oUsername: "", //USED IN createOrg POST
            oPassword: "" //USED IN createOrg POST
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit (e) {
        if(e) e.preventDefault();

        const submission = {
            "login": {
                action: "login",
                username: this.state.username,
                password: this.state.password,
                _id: this.state._id
            },
            "createOrg": {
                action: "createOrg",
                oOrgName: this.state.oOrgName,
                oEmail: this.state.oEmail,
                oFirstName: this.state.oFirstName,
                oLastName: this.state.oLastName,
                oUsername: this.state.oUsername,
                oPassword: this.state.oPassword
            }
        }

        Axios.post(`${server}/s/${e.target.id}`, submission[e.target.id])
            .then(res => {
                console.log(res.data);
            });

    }

    render () {
        return (
            <Container fluid className="p-5">
                <Row className="justify-content-center">
                    <p className="display-3 p-4">Employee Clocking and Scheduling</p>
                </Row>
                <Row className="justify-content-center">
                    <LinkContainer to="/">
                        <Button className="m-1" variant="primary">Return to portfolio</Button>
                    </LinkContainer>
                    <OverlayTrigger  trigger="click" placement="bottom" overlay={infoPopover}>
                        <Button className="m-1" variant="info">What is this? <i className="fas fa-info-circle"></i></Button>
                    </OverlayTrigger>
                </Row>
                <Row>
                    <Col className="col-12">
                        <div style={{padding: "30px 0px 30px 0px"}}>

                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="col-5">
                        <h2 className="mt-6">Login to your organization</h2>
                        <Form id="login" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control className="w-50" 
                                    type="text" 
                                    placeholder="Enter username" 
                                    name="username" 
                                    value={this.state.username} 
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="w-50" 
                                    type="password" 
                                    placeholder="Enter password" 
                                    name="password" 
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formOrgID">
                                <Form.Label>Organization ID</Form.Label>
                                <Form.Control className="w-50" 
                                type="number" 
                                placeholder="Enter ID" 
                                name="_id" 
                                value={this.state._id}
                                onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign in
                            </Button>
                        </Form>
                    </Col>
                    <Col className="col-5">
                        <h2 className="mt-6">Create an organization</h2>
                        <Form id="createOrg" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formOwnerOrg">
                                <Form.Label>Organization Name</Form.Label>
                                <Form.Control className="w-50" 
                                type="text" 
                                placeholder="Enter organization name"
                                name="oOrgName" 
                                value={this.state.oOrgName}
                                onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formOwnerEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="w-50" 
                                type="email" 
                                placeholder="Enter e-mail"
                                name="oEmail" 
                                value={this.state.oEmail}
                                onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formOwnerFirst">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control className="w-50" 
                                type="text" 
                                placeholder="Enter first name"
                                name="oFirstName" 
                                value={this.state.oFirstName}
                                onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formOwnerLast">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control className="w-50" 
                                type="text" 
                                placeholder="Enter last name"
                                name="oLastName" 
                                value={this.state.oLastName}
                                onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formOwnerUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control className="w-50" 
                                type="text" 
                                placeholder="Enter username"
                                name="oUsername" 
                                value={this.state.oUsername}
                                onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formOwnerPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="w-50" 
                                type="password" 
                                placeholder="Enter password"
                                name="oPassword" 
                                value={this.state.oPassword}
                                onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Create organization
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Auth;