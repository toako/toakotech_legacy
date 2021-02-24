import React from "react";
import Axios from "axios";
import { withRouter } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

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
            id: 1,
            title: "",
            color: "#000000",
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
            sort: true,
            filter: textFilter()
        },
        {
            dataField: 'title',
            text: 'Title',
            sort: true,
            filter: textFilter()
        },
        {
            dataField: 'color',
            text: 'Color',
            sort: true,
            formatter: (cell, row) => <ColorFormat color={row.color}/>,
            filter: textFilter()
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
        Axios.get(`${server}/s/admin/positions`, {})
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
            id: this.state.id,
            title: this.state.title,
            color: this.state.color
        }

        Axios.post(`${server}/s/admin/positions/add`, dataPacket)
            .catch(err => console.log(err));
    }

    handleAction (e) {
        let _position = e.currentTarget.value.split(" ");
        console.log(_position[0]);
        if (_position[1] === "delete") {
            Axios.delete(`${server}/s/admin/positions/delete`, {
                data: { id: _position[0] }
            })
            .then(res => {
                if (res.data.hasOwnProperty("info")) {
                    console.log(res.data.info);
                    this.setState({positions: res.data.positionData});
                }
                else if (res.data.hasOwnProperty("error"))
                    console.log(res.data.error);
            })
            .catch(err => console.log(err));
        }
        else if (_position[1] === "manage") {
            this.props.history.push(`/s/admin/positions/${_position[0]}`);
        }
    }

    render () {
        return (<div>
            <h1 className="mt-3">Positions</h1>
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
                            <Form.Label>Add Position</Form.Label>
                            <Button variant="info" type="submit">
                                Create <i className="fas fa-plus fa-sm"></i>
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
                pagination={ paginationFactory() }
                filter={ filterFactory() }
                filterPosition="top"
            />
        </div>);
    }
}

export default withRouter(Positions);


function ActionFormat (props) {
    return (
        <div>
            <Button value={`${props.rowID} manage`} onClick={props.action} className="mr-2" size="sm" variant="info"> 
                Manage <i className="fas fa-pencil-alt fa-sm"></i>
            </Button>
            <Button value={`${props.rowID} delete`} onClick={props.action} size="sm" variant="danger"> 
                Delete <i className="fas fa-trash fa-sm"></i>
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