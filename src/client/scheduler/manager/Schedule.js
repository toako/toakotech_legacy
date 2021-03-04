/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    *MANAGER*

    Schedule.js - FRONT END

    The clean and organized visual which allows managing users to set schedules for their
    designated employees in their department.

////////////////////////////////////////////////////////////////////////////////////////*/

import React from "react";
import Axios from "axios";
import tinycolor from "tinycolor2";
import { DateTime , Duration } from "luxon";
import TimeField from "react-simple-timefield";

import {Col, Row, Button, Modal} from "react-bootstrap";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class Schedule extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            dateBox: "",
            dates: [],
            weekData: [],
            clockon: "",
            lunchon: "",
            lunchoff: "",
            clockoff: "",
            hoursUsed: 0,
            hoursLeft: 0,
            totalHours: 0,
            showModal: false,
            modalUserID: "",
            modalUser: "",
            modalDate: "",
            modalInfo: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTimeSubmit = this.handleTimeSubmit.bind(this);
        this.handleTimeReset = this.handleTimeReset.bind(this);
    }

    calendarColumnClasses = "cal-col d-flex justify-content-center pt-1";
    calendarColumnClasses2 = "cal-col2 d-flex justify-content-center pt-1";
    calendarColumnClasses3 = "cal-col2 text-center pt-2";
    months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    weekdays = ["Weekday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    componentDidMount() {
        Axios.get(`${server}/s/manager/schedule`)
            .then (res => {
                console.log(res.data.weekData);
                this.setState({
                    dates: res.data.dates,
                    totalHours: res.data.deptHours,
                    weekData: res.data.weekData
                });
            })
            .catch(err => console.log(err));
    }

    handleChange (e) {
        e.persist();
        Axios.post(`${server}/s/manager/schedule/changeWeek`, {date: e.target.value})
            .then(res => {
                this.setState({
                    dateBox: e.target.value,
                    dates: res.data.dates,
                    weekData: res.data.weekData
                });
            })
            .catch(err => console.log(err));
    }

    handleModalOpen (e) {
        const action = e.target.id.split("|");
        const id = action[0];
        const date = action[1];
        const name = action[2];
        let userClocks = this.state.weekData
            .filter(user => user.id === id)[0].schedule
            .filter(day => day.date === date)[0].expectedClock;

        console.log(userClocks);
        userClocks = userClocks.map(c => c == null ? "00:00" : c);

        this.setState({
            showModal: true,
            modalUserID: id,
            modalUser: name,
            modalDate: date,
            clockon: userClocks[0],
            lunchon: userClocks[0],
            lunchoff: userClocks[0],
            clockoff: userClocks[0],
        });
    }

    handleModalClose (e) {
        this.setState({
            showModal: false
        });
    }

    handleTimeChange (e) {
        const action = e.target.id;
        this.setState({
            [action]: e.target.value
        });
    }

    handleTimeSubmit (e) {

        if (this.state.clockon == "00:00") console.log(true);
        let dt1 = Duration.fromISOTime(this.state.clockon);
        let dt2 = Duration.fromISOTime(this.state.lunchon);
        let dt3 = Duration.fromISOTime(this.state.lunchoff);
        let dt4 = Duration.fromISOTime(this.state.clockoff);

        console.log(`${this.state.modalUserID} ${this.state.modalDate}`);
        console.log(dt1 < dt2);
        console.log(dt1.toObject());
        console.log(dt2.toObject());
        console.log(dt3.toObject());
        console.log(dt4.toObject());

    }

    handleTimeReset (e) {

    }

    render () { return (<div className="m-3">
        <h1 className="mt-2 mb-4">Schedule Employees</h1>
        <Row>
            <Col className="col-3">
                <p>Date <span><input type="date" className="ml-1" onChange={this.handleChange} value={this.state.dateBox}></input></span></p>
            </Col>
            <Col className="col-3"><h6>Total Labor Hours: <span className="text-danger">{this.state.totalHours}</span></h6></Col>
            <Col className="col-3"><h6>Used Labor Hours: <span className="text-danger">{this.state.hoursUsed}</span></h6></Col>
            <Col className="col-3"><h6>Available Labor Hours: <span className="text-danger">{this.state.hoursLeft}</span></h6></Col>
        </Row>
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
            this.state.weekData.map(user => (
                <Row key={user.id}>
                    <Col className={this.calendarColumnClasses3 + "cal-box"}>
                        <h6 className="mt-2 mb-2">{user.name}</h6>
                        <p className="cal-text cal-head"
                        style={{
                            backgroundColor: user.posColor,
                            borderRadius: "10px",
                            color: tinycolor(user.posColor).isDark() ? "#fff" : "#000"
                        }}>{user.posTitle}</p>
                    </Col>
                    { user.schedule.map(day => (
                        <Col key={day.date} className={this.calendarColumnClasses3}>
                            <p className="cal-text">
                                <span className="cal-head">Clock On: </span>
                                {day.expectedClock[0] == null ? "None" : day.expectedClock[0]}
                            </p>
                            <p className="cal-text">
                                <span className="cal-head">Lunch On: </span>
                                {day.expectedClock[1] == null ? "None" : day.expectedClock[1]}
                            </p>
                            <p className="cal-text">
                                <span className="cal-head">Lunch Off: </span>
                                {day.expectedClock[2] == null ? "None" : day.expectedClock[2]}
                            </p>
                            <p className="cal-text">
                                <span className="cal-head">Clock Off: </span>
                                {day.expectedClock[3] == null ? "None" : day.expectedClock[3]}
                            </p>
                            <Button 
                                id={`${user.id}|${day.date}|${user.name}`}
                                onClick={this.handleModalOpen} 
                                variant="warning"
                                className="cal-modify">Modify</Button>
                        </Col>
                        
                    )) }
                </Row>
            ))
        }
        <TimeBox 
            show={this.state.showModal} 
            close={this.handleModalClose}
            change={this.handleTimeChange}
            submit={this.handleTimeSubmit}
            clockon={this.state.clockon}
            lunchon={this.state.lunchon}
            lunchoff={this.state.lunchoff}
            clockoff={this.state.clockoff}
            id={this.state.modalUserID}
            name={this.state.modalUser}
            date={this.state.modalDate}
            info={this.state.modalInfo}
            />
    </div>)}
}

export default Schedule;


function TimeBox (props) {
    const timebox = {
        width: "45px",
        height: "25px"
    }

    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
            <Modal.Title>Modify clock time: {props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                On date: <span className="text-danger">{props.date}</span>
                <Row className="mt-3">
                    <Col className="col-3 text-center">
                        <p>Clock On</p>
                        <TimeField 
                            id="clockon"
                            value={props.clockon}
                            onChange={props.change} 
                            style={timebox}/>
                    </Col>
                    <Col className="col-3 text-center">
                        <p>Lunch On</p>
                        <TimeField 
                            id="lunchon"
                            value={props.lunchon}
                            onChange={props.change} 
                            style={timebox}/>
                    </Col>
                    <Col className="col-3 text-center">
                        <p>Lunch Off</p>
                        <TimeField 
                            id="lunchoff"
                            value={props.lunchoff}
                            onChange={props.change} 
                            style={timebox}/>
                    </Col>
                    <Col className="col-3 text-center">
                        <p>Clock Off</p>
                        <TimeField 
                            id="clockoff"
                            value={props.clockoff}
                            onChange={props.change} 
                            style={timebox}/>
                    </Col>
                </Row>
                {
                    props.info === "" ? "" : <h6 className="text-info">{props.info}</h6>
                }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
                Close
            </Button>
            <Button variant="primary" onClick={props.submit}>
                Submit
            </Button>
            </Modal.Footer>
        </Modal>
    );
}