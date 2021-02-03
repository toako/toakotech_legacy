import React from "react";
import Axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';

import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            email: ""
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    columns = [
        {
            dataField: 'id',
            text: 'User ID',
            sort: true
        },
        {
            dataField: 'name',
            text: 'Name',
            sort: true
        },
        {
            dataField: 'username',
            text: 'Username',
            sort: true
        },
        {
            dataField: 'email',
            text: 'E-mail',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            csvExport: false,
            formatter: (cell, row) => <ActionFormat userID={row.id} action={this.handleAction}/>
        }
    ];

    componentDidMount () {
        Axios.get(`${server}/s/admin/users`)
            .then(res => {
                this.setState({
                    users: res.data.userData
                });
                console.log(res.data.info);
            })
            .catch(err => console.log(err));        
    }

    handleChange (e) {
        this.setState({[e.target.name]:e.target.value});
    }

    handleAction (e) {
        let _user = e.currentTarget.value.split(" ");
        console.log(_user[0]);
        if (_user[1] === "delete") {
            Axios.all([
                Axios.delete(`${server}/s/admin/users/delete`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: { id: _user[0] }
                })
                .then(res => {
                    if (res.data.hasOwnProperty("info")) 
                        console.log(res.data.info);
                    else if (res.data.hasOwnProperty("error"))
                        console.log(res.data.error);
                })
                .catch(err => console.log(err)),
                Axios.get(`${server}/s/admin/users`)
                .then(res => {
                    this.setState({
                        users: res.data.userData
                    });
                    console.log(res.data.info);
                })
                .catch(err => console.log(err))
            ]);
        }
    }

    handleSubmit (e) {
        Axios.all([
            Axios.post(`${server}/s/admin/users/create`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email
                    },
                })
                .catch(err => console.log(err)),
            Axios.get(`${server}/s/admin/users`)
                .then(res => {
                    this.setState({
                        users: res.data.userData
                    });
                    console.log(res.data.info);
                })
                .catch(err => console.log(err))
        ]);
        
    }

    render () {
        return (<div>
            <h1>Users</h1>
            <Form className="card mt-3 mb-3" onSubmit={this.handleSubmit}>
                <Card.Body>
                    <Card.Title>
                        Create a user
                    </Card.Title>
                    <Row>
                        <Form.Group  className="col-6">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Enter first name"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                />
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter last name"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="col-6">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                required/>
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required/>
                        </Form.Group>
                    </Row>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control 
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            />
                    </Form.Group>
                    <Button variant="info" type="submit">
                            Create New User <i className="fas fa-plus fa-sm"></i>
                        </Button>
                </Card.Body>
            </Form>
            <BootstrapTable 
                keyField="id"
                data = {this.state.users}
                columns = { this.columns }
                defaultSorted = {[{
                    dataField: 'name',
                    order: 'desc'
                }]}
            />
        </div>);
    }
}

export default Users;


function ActionFormat (props) {
    return (
        <div>
            <Button value={`${props.userID} view`} onClick={props.action} className="mr-2" size="sm" variant="info"> 
                View <i className="far fa-eye fa-sm" ></i>
            </Button>
            <Button value={`${props.userID} delete`} onClick={props.action} size="sm" variant="danger"> 
                <i className="fas fa-trash fa-sm"></i>
            </Button>
        </div>
    );
}