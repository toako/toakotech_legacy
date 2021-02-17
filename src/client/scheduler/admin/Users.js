import React from "react";
import Axios from "axios";
import { withRouter } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

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
            email: "",
            password: ""
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    columns = [
        {
            dataField: 'id',
            text: 'User ID',
            sort: true,
            filter: textFilter()
        },
        {
            dataField: 'name',
            text: 'Name',
            sort: true,
            filter: textFilter()
        },
        {
            dataField: 'username',
            text: 'Username',
            sort: true,
            filter: textFilter()
        },
        {
            dataField: 'email',
            text: 'E-mail',
            sort: true,
            filter: textFilter()
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
            Axios.delete(`${server}/s/admin/users/delete`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { id: _user[0] }
            })
            .then(res => {
                if (res.data.hasOwnProperty("info")) {
                    console.log(res.data.info);
                    this.setState({users: res.data.userData});
                }
                else if (res.data.hasOwnProperty("error"))
                    console.log(res.data.error);
            })
            .catch(err => console.log(err));
        }
    }

    handleSubmit (e) {
        Axios.post(`${server}/s/admin/users/create`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
        }).then((res) => {
            console.log(res);
        }).catch(err => console.log(err));
    }

    render () {
        return (<div>
            <h1 className="mt-3">Users</h1>
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
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control 
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                />
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
                    pagination={ paginationFactory() }
                    filter={ filterFactory() }
                    filterPosition="top"
                />
        </div>);
    }
}

export default withRouter(Users);


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