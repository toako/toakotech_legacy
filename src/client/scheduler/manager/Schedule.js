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
import TimeField from "react-simple-timefield";

import {Col, Row, Button, Card} from "react-bootstrap";

class Schedule extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            dateBox: "",
            dates: [],
            weekData: {},
            title: "",
            clockon: "",
            lunchon: "",
            lunchoff: "",
            clockoff: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTimeSubmit = this.handleTimeSubmit.bind(this);
        this.handleTimeReset = this.handleTimeReset.bind(this);
        this.filterWeekData = this.filterWeekData.bind(this);
    }

    calendarColumnClasses = "cal-col d-flex justify-content-center pt-1";
    calendarColumnClasses2 = "cal-col2 d-flex justify-content-center pt-1";
    months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    weekdays = ["Weekday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    componentDidMount() {
        Axios.get("/s/manager/schedule")
            .then (res => {
                const filteredData = this.filterWeekData(res.data.weekData, res.data.deptTitle);
                this.setState({
                    dates: res.data.dates,
                    title: res.data.deptTitle,
                    weekData: filteredData
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

    filterWeekData(data, deptTitle) {
        let deptSch = [];

        data.days.forEach(day => {
            const thisDeptUsers = day.departments.find(dept => dept.title == deptTitle).users;
            deptSch.push({
                date: day.date,
                users: thisDeptUsers
            });
        });
        console.log(deptSch);

        let userSchedules = deptSch[0].users.map(user => ({
            id: user.id, 
            name: user.name,
            posColor: user.posColor,
            posID: user.posID,
            posTitle: user.posTitle,
            schedule: deptSch.map(day => {
                const daySchedule = day.users.find(user2 => user2.id == user.id);
                const expected = daySchedule.expectedClock;
                const actual = daySchedule.actualClock;

                return {
                    date: day.date,
                    expectedClock: expected,
                    actualClock: actual
                }
            })
        }));
        console.log(userSchedules);
        return deptSch;
    }

    render () { return (<div className="m-3">
        <h1 className="mt-2 mb-4">Schedule Employees</h1>
        <Row>
        <p>Date <span><input type="date" className="ml-1" onChange={this.handleChange} value={this.state.dateBox}></input></span></p>
        </Row>
        {/* <Row>
            
            <Col className="col-10" style={{backgroundColor: "#ddd"}}><Row>
                <Col className="col-3">
                    <h5>
                        Managing User
                    </h5>
                </Col>
                <Col className="col-2 text-center">
                    <p>Clock On</p>
                    <TimeField 
                        id="clockon"
                        value={this.state.clockon} 
                        onChange={this.handleTimeChange} 
                        style={this.timebox}/>
                </Col>
                <Col className="col-2 text-center">
                    <p>Lunch On</p>
                    <TimeField 
                        id="lunchon"
                        value={this.state.lunchon} 
                        onChange={this.handleTimeChange} 
                        style={this.timebox}/>
                </Col>
                <Col className="col-2 text-center">
                    <p>Lunch Off</p>
                    <TimeField 
                        id="lunchoff"
                        value={this.state.lunchoff} 
                        onChange={this.handleTimeChange} 
                        style={this.timebox}/>
                </Col>
                <Col className="col-2 text-center">
                    <p>Clock Off</p>
                    <TimeField 
                        id="clockoff"
                        value={this.state.clockoff} 
                        onChange={this.handleTimeChange} 
                        style={this.timebox}/>
                </Col>
                <Col className="col-1 text-center">
                    <Button variant="success" type="submit">
                        <i className="fas fa-check fa-sm"></i>
                    </Button>
                    <Button variant="danger" type="reset">
                        <i className="fas fa-trash fa-sm"></i>
                    </Button>
                </Col>
            </Row></Col>                
        </Row> */}
        <Row>
            {this.weekdays.map(wd => {
                return (
                <Col key={wd} className={this.calendarColumnClasses}>
                    <h6>{wd}</h6>
                </Col>)
            })}
        </Row>
        <Row>
            <Col key="date" className={this.calendarColumnClasses2}>
                <h6>Date</h6>
            </Col>
            {
                this.state.dates.map(date => (
                    <Col key={DateTime.fromISO(date).day.toString()} className={this.calendarColumnClasses2}>
                        <h6>{this.months[DateTime.fromISO(date).month - 1]} {DateTime.fromISO(date).day.toString()}</h6>
                    </Col>
                ))
            }
        </Row>
        {
            this.state.weekData.map(user => (<h6>{user.id}</h6>))
        }
    </div>)}
}

export default Schedule;