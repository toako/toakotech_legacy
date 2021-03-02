/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    *MANAGER*

    Schedule.js - FRONT END

    The clean and organized visual which allows managing users to set schedules for their
    designated employees in their department.

////////////////////////////////////////////////////////////////////////////////////////*/

import React from "react";
import Axios from "axios";
import tinycolor from "tinycolor2";
import { DateTime } from "luxon";

import {Col, Row, Button, Form, Card} from "react-bootstrap";

class Schedule extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            dateBox: "",
            dates: [],
            weekData: {},
            clockon: "",
            lunchon: "",
            lunchoff: "",
            clockoff: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTimeSubmit = this.handleTimeSubmit.bind(this);
        this.handleTimeReset = this.handleTimeReset.bind(this);
    }

    calendarColumnClasses = "cal-col d-flex justify-content-center pt-1";
    calendarColumnClasses2 = "cal-col2 d-flex justify-content-center pt-1";
    months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    
    componentDidMount() {
        Axios.get("/s/manager/schedule")
            .then (res => {
                console.log(res.data.weekData);
                this.setState({
                    dates: res.data.dates
                });
            })
            .catch(err => console.log(err));
    }

    handleChange (e) {
        e.persist();
        Axios.post("/s/manager/schedule/changeWeek", {date: e.target.value})
            .then(res => {
                this.setState({
                    dateBox: e.target.value,
                    dates: res.data.dates
                });
            })
            .catch(err => console.log(err));
    }

    handleTimeChange (e) {
        let action = e.target.id;
        console.log(e.target.value);
        switch (action) {
            case "clockon":
                this.setState({clockon: e.target.value});
                break;
            case "lunchon":
                this.setState({lunchon: e.target.value});
                break;
            case "lunchoff":
                this.setState({lunchoff: e.target.value});
                break;
            case "clockoff":
                this.setState({clockoff: e.target.value});
                break;
            default: 
                break;
        }
    }

    handleTimeSubmit (e) {

    }

    handleTimeReset (e) {

    }

    render () { return (<div className="m-2">
        <h1 className="mt-2 mb-4 ml-3">Schedule Employees</h1>
        <Form className="card mt-3 mb-3 ml-2 mr-2" onSubmit={this.handleTimeSubmit} onReset={this.handleTimeReset}>
            <Card.Body>
                <Card.Title>
                    Modifying time: {`${this.state.clockon}`}
                </Card.Title>
                <Row>
                    <Col className="col-2"><Form.Group>
                        <Form.Label>Clock On</Form.Label>
                        <Form.Control 
                            type="time"
                            name="clockon"
                            value={this.state.clockon}
                            onChange={this.handleTimeChange}
                            required/>
                    </Form.Group></Col>
                    <Col className="col-2"><Form.Group>
                        <Form.Label>Lunch Start</Form.Label>
                        <Form.Control 
                            type="time"
                            name="lunchon"
                            value={this.state.lunchon}
                            onChange={this.handleTimeChange}
                            required/>
                    </Form.Group></Col>
                    <Col className="col-2"><Form.Group>
                        <Form.Label>Lunch End</Form.Label>
                        <Form.Control 
                            type="time"
                            name="lunchoff"
                            value={this.state.lunchoff}
                            onChange={this.handleTimeChange}
                            required/>
                    </Form.Group></Col>
                    <Col className="col-2"><Form.Group>
                        <Form.Label>Clock off</Form.Label>
                        <Form.Control 
                            type="time"
                            name="clockoff"
                            value={this.state.clockoff}
                            onChange={this.handleTimeChange}
                            required/>
                    </Form.Group></Col>
                    <Col className="col-2 text-center"><Form.Group>
                        <Form.Label>Assign Labor</Form.Label>
                        <Button variant="success" type="submit" style={{width: "90%"}}>
                            Submit <i className="fas fa-clock fa-sm"></i>
                        </Button>
                    </Form.Group></Col>
                    <Col className="col-2 text-center"><Form.Group>
                        <Form.Label>Remove Labor</Form.Label>
                        <Button variant="danger" type="reset" style={{width: "90%"}}>
                            Remove <i className="fas fa-trash fa-sm"></i>
                        </Button>
                    </Form.Group></Col>
                </Row>
            </Card.Body>
        </Form>
        <Row>
            <p className="text-center col-12">Date <span><input type="date" onChange={this.handleChange} value={this.state.dateBox}></input></span></p>
        </Row>
        <div className="ml-3 mr-3">
            <Row>
                <Col className={this.calendarColumnClasses}>
                    <h6>Weekday</h6>
                </Col>
                <Col className={this.calendarColumnClasses}>
                    <h6>Monday</h6>
                </Col>
                <Col className={this.calendarColumnClasses}>
                    <h6>Tuesday</h6>
                </Col>
                <Col className={this.calendarColumnClasses}>
                    <h6>Wednesday</h6>
                </Col>
                <Col className={this.calendarColumnClasses}>
                    <h6>Thursday</h6>
                </Col>
                <Col className={this.calendarColumnClasses}>
                    <h6>Friday</h6>
                </Col>
                <Col className={this.calendarColumnClasses}>
                    <h6>Saturday</h6>
                </Col>
                <Col className={this.calendarColumnClasses}>
                    <h6>Sunday</h6>
                </Col>
            </Row>
            <Row>
                <Col key="date" className={this.calendarColumnClasses2}>
                    <h6>Date</h6>
                </Col>
                {this.state.dates.map(date => {
                    return (<Col key={DateTime.fromISO(date).day.toString()} className={this.calendarColumnClasses2}>
                        <h6>{this.months[DateTime.fromISO(date).month - 1]} {DateTime.fromISO(date).day.toString()}</h6>
                    </Col>)
                })}
            </Row>
        </div>
        
    </div>)}
}

export default Schedule;