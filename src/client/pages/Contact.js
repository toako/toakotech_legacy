import React from "react";
import Container from "react-bootstrap/Container";
import '@fortawesome/fontawesome-free/js/all.js';

class Contact extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (<div className="contact-body">
            <p className="col-12 contact-header">Contact</p>
            <h2 className="contact-method"><span className="cmt"><i class="fas fa-phone"></i> Phone/Text: </span>(208) 392-0286</h2>
            <h2 className="contact-method"><span className="cmt"><i class="fas fa-envelope"></i> E-mail: </span>williamebk@yahoo.com</h2>
            <h2 className="contact-method"><span className="cmt"><i class="fab fa-discord"></i> Discord: </span>ChunkyCurd#5179</h2>
            <h2 className="contact-method"><span className="cmt"><i class="fab fa-steam"></i> Steam: </span>toakonguf12</h2>
            <h2 className="contact-method"><span className="cmt"><i class="fab fa-snapchat-ghost"></i> Snapchat: </span> wkellermann</h2>
            <h2 className="contact-method"><span className="cmt"><i class="fab fa-instagram"></i> Instagram: </span> will_kellermann</h2>
            
    </div>);
    }
}

export default Contact;