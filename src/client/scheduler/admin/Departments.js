/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    Departments.js - FRONT END

    React file which shows the forms and visuals necessary for creating and destroying
    departments, as well as assigning positions to them.

////////////////////////////////////////////////////////////////////////////////////////*/

import React from "react";
import Axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import tinycolor from "tinycolor2";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class Departments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            departments: [],
            assnPos: [],
            unassnPos: [],
            editing: ""
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleAssignment = this.handleAssignment.bind(this);
        this.handleLaborHours = this.handleLaborHours.bind(this);
    }

    columns = [
        {
            dataField: 'title',
            text: 'Title',
            sort: true,
            style: {
                width: "12em"
            }
        },
        {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            csvExport: false,
            formatter: (cell, row) => <ActionFormat rowTitle={row.title} action={this.handleAction}/>
        }
    ];

    componentDidMount () {
        Axios.get(`${server}/s/admin/departments`)
            .then(res => {
                this.setState({
                    departments: res.data.departments,
                    unassnPos: res.data.unassn,
                    assnPos: res.data.assn,
                    editing: res.data.departments.length >= 1 ? res.data.departments[0].title : ""
                });
            })
            .catch(err => console.log(err));
    }

    handleChange (e) {
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit (e) {
        Axios.post(`${server}/s/admin/departments/add`, { title: this.state.title })
            .catch(err => console.log(err));
    }
    handleAction (e) {
        let _dept = e.currentTarget.value.split(",");
        if (_dept[0] === "delete") {
            Axios.delete(`${server}/s/admin/departments/delete`, {
                data: { title: _dept[1] }
            })
            .then(res => {
                if (res.data.hasOwnProperty("info")) {
                    console.log(res.data.info);
                    this.setState({ departments: res.data.departments });
                }
                else if (res.data.hasOwnProperty("error"))
                    console.log(res.data.error);
            })
            .catch(err => console.log(err));
        }
        else if(_dept[0] === "edit") {
            this.setState({
                editing: _dept[1]
            });
        }
    }

    handleAssignment (e) {
        const packet = {
            department: this.state.editing,
            id: parseInt(e.target.id.split("|")[0]),
            title: e.target.id.split("|")[1],
            assign: e.target.value
        };
        
        Axios.post(`${server}/s/admin/departments/assign`, packet)
            .then(res => {
                this.setState({
                    departments: res.data.departments,
                    unassnPos: res.data.unassn,
                    assnPos: res.data.assn
                });
            })
            .catch(err => console.log(err));
    }
    

    handleLaborHours (e) {

    }

    render () {
        return (<div>
            <Row className="ml-0 mr-0">
                <Col className="col-3 bg-light">
                    <Form className="p-3" onSubmit={this.handleSubmit}>
                        <h5 className="text-center">Create new department</h5>
                        <Row>
                            <Form.Control className="col-10"
                                type="text" 
                                placeholder="Enter title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                required/>
                            <Button variant="info" type="submit" className="col-2">
                                <i className="fas fa-plus fa-sm"></i>
                            </Button>
                        </Row>
                    </Form>
                    <BootstrapTable
                        keyField="title"
                        data = {this.state.departments}
                        columns = { this.columns }
                        bordered={false}
                        defaultSorted = {[{
                            dataField: 'title',
                            order: 'asc'
                        }]}/>
                        
                </Col>
                <Col className="col-9 pl-4 pt-3 pb-3 pr-4">
                    <h1>Departments</h1>
                    <h5 className="mt-4 ml-1">Unassigned Positions</h5>
                    <Row className="ml-0">
                        {this.state.unassnPos.map(pos => {
                            return (
                                <ButtonFormat
                                    key={pos.id}
                                    id={pos.id}
                                    title={pos.title}
                                    assigned={false}
                                    color={pos.color}
                                    action={this.handleAssignment}
                                />
                            )
                        })}
                    </Row>
                    {
                        this.state.editing === "" ? "" : (
                            <div>
                            <h5 className="mt-4 ml-1">Selected Department: {this.state.editing}</h5>
                            <EditDept 
                                dept={this.state.departments.filter(dept => dept.title === this.state.editing)[0]}
                                assn={this.handleAssignment}
                                labor={this.handleLaborHours}
                            /></div>
                        )
                    }
                    
                </Col>
            </Row> 
        </div>);
    }
}

export default Departments;

class EditDept extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 0
        }
    }

    render () {
        return (
            <div className="m-1">
                <h6>Manager Position:</h6>
                {this.props.dept.manager ? "" : (
                <h6 className="text-danger">NOTE: Manager position is not set, selecting a position will assign it to the managing position.</h6>)}
                <Row className="ml-0"> 
                {
                    this.props.dept.manager ? (
                        <ButtonFormat
                            key={this.props.dept.manager.id}
                            id={this.props.dept.manager.id}
                            title={this.props.dept.manager.title}
                            assigned={true}
                            color={this.props.dept.manager.color}
                            action={this.props.assn}
                        />
                    ) : ""
                }
                </Row>
                <h6>Department Positions:</h6>
                <Row className="ml-0">
                        {this.props.dept.positions.map(pos => {
                            return (
                                <ButtonFormat
                                    key={pos.id}
                                    id={pos.id}
                                    title={pos.title}
                                    assigned={true}
                                    color={pos.color}
                                    action={this.props.assn}
                                />
                            )
                        })}
                    </Row>
            </div>
        );
    }
}

function ActionFormat (props) {
    return (
        <div>
            <Button value={`edit,${props.rowTitle}`} onClick={props.action} className="mr-2" size="sm" variant="info"> 
                Edit <i className="fas fa-pencil-alt fa-sm"></i>
            </Button>
            <Button value={`delete,${props.rowTitle}`} onClick={props.action} size="sm" variant="danger"> 
                <i className="fas fa-trash fa-sm"></i>
            </Button>
        </div>
    );
}

function ButtonFormat (props) {
    
    const style = {
        backgroundColor: props.color,
        border: "none",
        color: tinycolor(props.color).isDark() ? "#fff" : "#000"
    };

    return (
        <Button 
            id={ `${ props.id }|${ props.title }`} 
            value={ props.assigned } 
            onClick={ props.action }
            style={ style }
            className="m-1">
            { props.title }
        </Button>
    );
}