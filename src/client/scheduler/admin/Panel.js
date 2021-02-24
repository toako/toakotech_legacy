/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    Panel.js - FRONT END

    Introduction page when first logging into your designated panel, whether it be
    the admin, manager, or user panel.

////////////////////////////////////////////////////////////////////////////////////////*/

import React from "react";

class Panel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div><h1>Panel subpage</h1></div>
        )
    }
}

export default Panel;