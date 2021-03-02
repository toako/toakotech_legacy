/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    Panel.js - FRONT END

    Introduction page when first logging into your designated panel, whether it be
    the admin, manager, or user panel.

////////////////////////////////////////////////////////////////////////////////////////*/

import React from "react";
import Axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const server = process.env.REACT_APP_PROJECT_SERVER ? process.env.REACT_APP_PROJECT_SERVER : "";

class Panel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            organization: "",
            position: ""
        }
    }

    componentDidMount() {
        Axios.get(`${server}/s/admin/panel`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    username: res.data.username,
                    email: res.data.email,
                    organization: res.data.organization,
                    position: res.data.position
                });
            })
            .catch(err => console.log(err));
    }

    render () {
        return (<div>
            <h1 className="display-4 text-center mt-3 mb-3">Welcome, {this.state.firstName} {this.state.lastName}</h1>
            <div className="text-center mb-3" style={{backgroundColor: "#ccc", height: "1px", width: "100%"}}></div>
            <Row>
                <Col className="col-4">
                    <h5>Member of: </h5>
                    <p>{this.state.organization}</p>
                    <h5>Job Role: </h5>
                    <p>{this.state.position}</p>
                    <h5>Username: </h5>
                    <p>{this.state.username}</p>
                    <h5>E-mail: </h5>
                    <p>{this.state.email}</p>

                </Col>
                <Col className="col-8">
                    <h5>About:</h5>
                    <p>Add filler content here later</p>
                </Col>
            </Row>
        </div>)
    }
}

export default Panel;