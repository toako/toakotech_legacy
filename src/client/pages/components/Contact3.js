import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '@fortawesome/fontawesome-free/js/all.js';

/*
    SECTION 3 - Contact; Show contact info.
*/

class Contact3 extends React.Component {
    
    render () {
        return (<Container id="s3">
                <Row className="text-center pt-5 pb-5">
                    <Col>
                        <p id="s3-header">C o n t a c t</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-center">Network with me on <a className="s3-link" href="https://www.linkedin.com/in/william-kellermann-078a481b7">LinkedIn</a> or <br/>
                        e-mail me at <a className="s3-link" href="mailto:williamebk@yahoo.com">williamebk@yahoo.com</a>.</p>
                        <div className="s3-bar"/>
                        <p id="s3-footer">© 2022 ToakoTech. Website by William Burciaga Kellermann.</p>
                    </Col>
                </Row>
            </Container>);
    }
}

export default Contact3;