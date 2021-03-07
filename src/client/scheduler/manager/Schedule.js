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
            deptTitle: "",
            clockon: "",
            lunchon: "",
            lunchoff: "",
            clockoff: "",
            hoursUsed: 0,
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
                console.log(res.data.deptTitle);
                this.setState({
                    dates: res.data.dates,
                    totalHours: res.data.deptHours,
                    deptTitle: res.data.deptTitle,
                    weekData: res.data.weekData,
                    hoursUsed: res.data.expectedHoursUsed
                });
            })
            .catch(err => console.log(err));
    }

    handleChange (e) {
        e.persist();
        Axios.post(`${server}/s/manager/schedule/changeWeek`, {date: e.target.value})
            .then(res => {
                console.log(res.data.weekData);
                console.log(res.data.deptTitle);
                this.setState({
                    dateBox: e.target.value,
                    dates: res.data.dates,
                    deptTitle: res.data.deptTitle,
                    weekData: res.data.weekData,
                    hoursUsed: res.data.expectedHoursUsed
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
        let dt1 = Duration.fromISOTime(this.state.clockon);
        let dt2 = Duration.fromISOTime(this.state.lunchon);
        let dt3 = Duration.fromISOTime(this.state.lunchoff);
        let dt4 = Duration.fromISOTime(this.state.clockoff);


        let noLunch = false;
        let error = false;
        let info = "";

        //Determine if no lunch, but clock on and clock off are present
        if (this.state.clockon !== "00:00" && 
            this.state.clockoff !== "00:00" &&
            this.state.lunchon === "00:00" && 
            this.state.lunchoff === "00:00") {
            noLunch = true;
        }
        //Determine if all clocks are present
        else if (this.state.clockon !== "00:00" && 
                this.state.lunchon !== "00:00" && 
                this.state.lunchoff !== "00:00" &&
                this.state.clockoff !== "00:00") {
            noLunch = false;
        }
        //Some times are not present that should be
        else {
            error = true;
            info = "A clock time is missing.";
        }

        //If there is no lunch, but clock off and clock on are in order
        if (noLunch && !error && dt1 < dt4) {
            error = false;
        }
        //If lunch is present, and all clock times are in order
        else if (!noLunch && !error && dt1 < dt2 && dt2 < dt3 && dt3 < dt4) {
            error = false;
        }
        //If times are not in order.
        else {
            error = true;
            if (info !== "A clock time is missing.")
            info = "Clock times are not in chronological order.";
        }

        if (!error) {
            let timeArray = [this.state.clockon, this.state.lunchon, this.state.lunchoff, this.state.clockoff];
            let timeMinArray = [];

            timeArray.forEach(t => {
                const th = t.split(":");
                timeMinArray.push(parseInt(th[0]) * 60 + parseInt(th[1]));
            });
            
            const lunchMins = timeMinArray[2] - timeMinArray[1];
            const clockMins = timeMinArray[3] - timeMinArray[0];
            const totalHours = Math.round(((clockMins - lunchMins) / 60) * 100) / 100;

            if (totalHours > this.state.totalHours - this.state.hoursUsed) {
                error = true;
                info = "Clock time exceeds hours left for department. Please adjust."
            }
        }
        

        if (error) {
            this.setState({
                modalInfo: info
            });
        }
        else {
            Axios.post(`${server}/s/manager/schedule/modify`, {
                id: this.state.modalUserID,
                date: this.state.modalDate,
                title: this.state.deptTitle,
                clocks: [ this.state.clockon, this.state.lunchon, this.state.lunchoff, this.state.clockoff ]
            }).then(res => {
                this.setState({
                    weekData: res.data.weekData,
                    hoursUsed: res.data.expectedHoursUsed,
                    modalInfo: res.data.info,
                    clockon: "00:00",
                    lunchon: "00:00",
                    lunchoff: "00:00",
                    clockoff: "00:00"
                });
            }).catch(err => console.log(err));
        }
    }

    handleTimeReset (e) {
        Axios.post(`${server}/s/manager/schedule/modify`, {
            id: this.state.modalUserID,
            date: this.state.modalDate,
            title: this.state.deptTitle,
            clocks: [ "00:00", "00:00", "00:00", "00:00" ]
        }).then(res => {
            this.setState({
                weekData: res.data.weekData,
                hoursUsed: res.data.expectedHoursUsed,
                modalInfo: res.data.info
            });
        }).catch(err => console.log(err));
    }

    render () { return (<div className="m-3">
        <h1 className="mt-2 mb-4">Schedule Employees</h1>
        <Row>
            <Col className="col-3">
                <p>Date <span><input type="date" className="ml-1" onChange={this.handleChange} value={this.state.dateBox}></input></span></p>
            </Col>
            <Col className="col-3"><h6>Total Labor Hours: <span className="text-danger">{this.state.totalHours}</span></h6></Col>
            <Col className="col-3"><h6>Used Labor Hours: <span className="text-danger">{this.state.hoursUsed}</span></h6></Col>
            <Col className="col-3"><h6>Available Labor Hours: <span className="text-danger">{this.state.totalHours - this.state.hoursUsed}</span></h6></Col>
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
                                {day.expectedClock[0]}
                            </p>
                            <p className="cal-text">
                                <span className="cal-head">Lunch On: </span>
                                {day.expectedClock[1]}
                            </p>
                            <p className="cal-text">
                                <span className="cal-head">Lunch Off: </span>
                                {day.expectedClock[2]}
                            </p>
                            <p className="cal-text">
                                <span className="cal-head">Clock Off: </span>
                                {day.expectedClock[3]}
                            </p>
                            <p>Hours Scheduled: {day.expectedHours}</p>
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
            reset={this.handleTimeReset}
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
                    props.info === "" ? "" : <h6 className="text-info mt-3">{props.info}</h6>
                }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
                Close
            </Button>
            <Button variant="warning" onClick={props.reset}>
                Remove Clocks
            </Button>
            <Button variant="primary" onClick={props.submit}>
                Submit Clocks
            </Button>
            </Modal.Footer>
        </Modal>
    );
}