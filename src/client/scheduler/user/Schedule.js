/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    *USER*

    Schedule.js - FRONT END

    The clean and organized visual which allows users to view schedule/

////////////////////////////////////////////////////////////////////////////////////////*/
import React from "react";
import Axios from "axios";

import {Col, Row, Button} from "react-bootstrap";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class Schedule extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            dateBox: "",
            dates: [],
            name: "",
            id: "",
            title: "",
            schedule1: [],
            schedule2: [],
            startDate1: "",
            startDate2: "",
            info: ""
        };

        this.handleClock = this.handleClock.bind(this);
    }

    calendarColumnClasses = "cal-col d-flex justify-content-center pt-1";
    calendarColumnClasses2 = "cal-col2 d-flex justify-content-center pt-1";
    calendarColumnClasses3 = "cal-col2 text-center pt-2";
    months = ["", "Jan.", "Feb.", "Mar.", "Apr.", "May.", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    weekdays = ["Weekday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    componentDidMount() {
        Axios.get(`${server}/s/user/schedule`)
            .then (res => {
                this.setState({
                    name: res.data.name,
                    id: res.data.id,
                    title: res.data.title,
                    schedule1: res.data.schedule1,
                    schedule2: res.data.schedule2,
                    startDate1: res.data.startDate1,
                    startDate2: res.data.startDate2
                });
            })
            .catch(err => console.log(err));
    }

    handleClock (e) {
        Axios.post(`${server}/s/user/schedule/clock`, {index: parseInt(e.target.id), title: this.state.title, id: this.state.id})
            .then(res => {
                this.setState({
                    info: res.data.info
                });
            })
            .catch(err => console.log(err));
    }

    render () { return (<div className="m-3">
        <h1 className="mt-2 mb-4">Work Clocking:</h1>
        <Row>
            <Button id="0" className="mr-2" onClick={this.handleClock}>Clock On</Button>
            <Button id="1" className="mr-2" variant="warning" onClick={this.handleClock}>Lunch On</Button>
            <Button id="2" className="mr-2" variant="warning" onClick={this.handleClock}>Lunch Off</Button>
            <Button id="3" className="mr-2" onClick={this.handleClock}>Clock Off</Button>
        </Row>
        
        <h6 className="text-info mt-2">{this.state.info}</h6>
        <h1 className="mt-4 mb-4">Viewing Schedule: {this.state.name}</h1>
        <Row>
            {this.weekdays.map(wd => {
                return (
                <Col key={wd} className={this.calendarColumnClasses}>
                    <h6>{wd}</h6>
                </Col>)
            })}
        </Row>
        <Row>
            <Col className={this.calendarColumnClasses3 + "cal-box"}>
                <h6 className="mt-2 mb-2">Week of:</h6>
                <h6 className="mt-2 mb-2">{this.state.startDate1}</h6>
            </Col>
            {
                this.state.schedule1.map(day => (
                    <Col key={day.date} className={this.calendarColumnClasses3}>
                        <p>{`${this.months[day.date.split("/")[0]]} ${day.date.split("/")[1]}`}</p>
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
                    </Col>
                ))
            }
        </Row>
        <Row>
            <Col className={this.calendarColumnClasses3 + "cal-box"}>
                <h6 className="mt-2 mb-2">Week of:</h6>
                <h6 className="mt-2 mb-2">{this.state.startDate2}</h6>
            </Col>
            {
                this.state.schedule2.map(day => (
                    <Col key={day.date} className={this.calendarColumnClasses3}>
                        <p>{`${this.months[day.date.split("/")[0]]} ${day.date.split("/")[1]}`}</p>
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
                    </Col>
                ))
            }
        </Row>
    </div>)}
}

export default Schedule;