import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Auth.js";
import Admin from "./Admin.js";
import User from "./User.js"

//Portal acts only as a router.

class Portal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <Switch>
                <Route exact path="/s"><Auth/></Route>
                <Route exact path="/s/user"><User/></Route>
                <Route exact path="/s/admin"><Admin/></Route>
            </Switch>
        )
    }
}

export default Portal;