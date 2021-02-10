import React from "react";
import Axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class Positions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: "",
            color: "#000000",
            manager: false,
            positions: []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    columns = [
        {
            dataField: 'id',
            text: 'Position ID',
            sort: true
        },
        {
            dataField: 'title',
            text: 'Title',
            sort: true
        },
        {
            dataField: 'color',
            text: 'Color',
            sort: true,
            formatter: (cell, row) => <ColorFormat color={row.color}/>
        },
        {
            dataField: 'manager',
            text: 'Is Manager?',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            csvExport: false,
            formatter: (cell, row) => <ActionFormat rowID={row.id} action={this.handleAction}/>
        }
    ];

    componentDidMount () {
        Axios.post(`${server}/s/admin/getPos`, {})
            .then(res => {
                this.setState({
                    positions: res.data
                });
            })
            .catch(err => console.log(err));
    }

    handleChange (e) {
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit (e) {

        console.log(this.state);
        let dataPacket = {
            action: "addPos",
            id: this.state.id,
            title: this.state.title,
            color: this.state.color,
            manager: this.state.manager
        }

        Axios.post(`${server}/s/admin/addPos`, dataPacket)
            .catch(err => console.log(err));
        Axios.post(`${server}/s/admin/getPos`, {})
            .then(res => {
                this.setState({
                    positions: res.data
                });
            })
            .catch(err => console.log(err));
    }

    handleAction (e) {
        const passedData = e.currentTarget.value.split(" ");
        if (passedData[1] === "delete") {
            return
        }

    }

    render () {
        return (<div>
            <h1>Positions</h1>
            <Form className="card mt-3 mb-3" onSubmit={this.handleSubmit}>
                <Card.Body>
                    <Card.Title>
                        Create new position
                    </Card.Title>
                    <Row>
                        <Col className="col-3"><Form.Group>
                            <Form.Label>Position ID</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Enter ID"
                                name="id"
                                value={this.state.id}
                                onChange={this.handleChange}
                                required/>
                        </Form.Group></Col>
                        <Col className="col-4"><Form.Group>
                            <Form.Label>Position Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                required/>
                        </Form.Group></Col>
                        <Col className="col-3"><Form.Group>
                            <Form.Label>Position Color</Form.Label>
                            <Form.Control 
                                type="color" 
                                name="color"
                                value={this.state.color}
                                onChange={this.handleChange}
                                />
                        </Form.Group></Col>
                        <Col className="col-2"><Form.Group>
                            <Form.Check 
                                className="mb-2"
                                label="Is manager?" 
                                name="manager"
                                value={this.state.manager}
                                onChange={this.handleChange}
                                />
                            <Button variant="info" type="submit">
                                Create New <i className="fas fa-plus fa-sm"></i>
                            </Button>
                        </Form.Group></Col>
                    </Row>
                </Card.Body>
            </Form>
            <BootstrapTable 
                keyField="id"
                data = {this.state.positions}
                columns = { this.columns }
                defaultSorted = {[{
                    dataField: 'id',
                    order: 'asc'
                }]}
            />
        </div>);
    }
}

export default Positions;


function ActionFormat (props) {
    return (
        <div>
            <Button value={`${props.rowID} view`} onClick={props.action} className="mr-2" size="sm" variant="success"> 
                <i className="far fa-eye fa-sm" ></i>
            </Button>
            <Button value={`${props.rowID} edit`} onClick={props.action} className="mr-2" size="sm" variant="info"> 
                <i className="fas fa-pencil-alt fa-sm"></i>
            </Button>
            <Button value={`${props.rowID} delete`} onClick={props.action} size="sm" variant="danger"> 
                <i className="fas fa-trash fa-sm"></i>
            </Button>
        </div>
    );
}

function ColorFormat (props) {

    const mainStyle = {
        padding: 0,
        margin: "0px 0px -10px 0px",
        height: "25px"
    };

    let colorStyle = {
        backgroundColor: props.color,
        width: "92%",
        height: "80%",
        border: "1px solid black"
    };

    return (
        <Row style={mainStyle}>
            <Col className="col-4"><div style={colorStyle}></div></Col>
            <Col className="col-8"><p>{props.color}</p></Col>
        </Row>
    );
}