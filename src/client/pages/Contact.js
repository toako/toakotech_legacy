import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '@fortawesome/fontawesome-free/js/all.js';

class Contact extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (<div className="align-items-center port-body">
        <Container style={{maxWidth: "28%"}} className="text-center">
            <p className="col-12 contact-header">Contact</p>
            <div className="text-left contact-main">
                <div className="text-center"><h1>Looking to get in touch?</h1></div>
                <h2 className="cont-method"><span className="cmt"><i class="fas fa-phone"></i> Phone/Text: </span>(208) 392-0286</h2>
                <h2 className="cont-method"><span className="cmt"><i class="fas fa-envelope"></i> E-mail: </span>williamebk@yahoo.com</h2>
                <h2 className="cont-method"><span className="cmt"><i class="fab fa-discord"></i> Discord: </span>ChunkyCurd#5179</h2>
                <h2 className="cont-method"><span className="cmt"><i class="fab fa-steam"></i> Steam: </span>toakonguf12</h2>
                <h2 className="cont-method"><span className="cmt"><i class="fab fa-snapchat-ghost"></i> Snapchat: </span> wkellermann</h2>
                <h2 className="cont-method"><span className="cmt"><i class="fab fa-instagram"></i> Instagram: </span> will_kellermann</h2>
            
            
            </div>
        </Container>
    </div>);
    }
}

export default Contact;