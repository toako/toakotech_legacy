/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    *ADMIN*

    Schedule.js - FRONT END

    The clean and organized visual which allows managing users to set schedules for their
    designated employees in their department.

////////////////////////////////////////////////////////////////////////////////////////*/

import React from "react";
import Axios from "axios";

import { Row, Col, Button } from "react-bootstrap";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class Schedule extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            departments: [],
            dept: "",
            hours: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        Axios.get(`${server}/s/admin/schedule`)
            .then(res => {
                console.log(res.data.departments);
                this.setState({
                    departments: res.data.departments
                });
            })
            .catch(err => console.log(err));
    }

    handleChange(e) {
        if (e.target.id === "input") {
            this.setState({
                hours: e.target.value
            });
        }
        else {
            const thisDept = this.state.departments.find(dept => dept[0] === e.target.id);
            this.setState({
                dept: thisDept[0],
                hours: thisDept[1]
            });
        }   
    }
    handleSubmit(e) {
        Axios.post(`${server}/s/admin/schedule/`, {dept: this.state.dept, hours: this.state.hours})
            .then(res => {
                console.log(res.data);
                this.setState({ departments: res.data.departments });
            })
            .catch(err => console.log(err));
    }

    render () {return(<div className="m-2">
            <h1>Schedule Labor Per Department</h1>
            <Row className="mt-3">
                <Col className="col-2">
                    <h5>Departments</h5>
                    {this.state.departments.map(dept => 
                        (<Button id={dept[0]} key={dept[0]} onClick={this.handleChange} className="mr-2 mt-1 mb-1" variant="dark">{dept[0]}</Button>)
                    )}
                </Col>
                <Col className="col-10">
                    <h5>Selected Department: {this.state.dept}</h5>
                    <Row className="m-0">
                        <input id="input" placeholder="Enter hours" value={this.state.hours} onChange={this.handleChange}/>
                        <Button onClick={this.handleSubmit} variant="info" className="ml-2">Submit Hours</Button>
                    </Row>
                </Col>
            </Row>
            
        </div>)
    }
}

export default Schedule;