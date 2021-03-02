/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    Portal.js - FRONT END

    Not physically visible to the user despite being React. This page is specifically for
    routing the user around the employment scheduling app.

////////////////////////////////////////////////////////////////////////////////////////*/

import React from "react";
import { Switch, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Auth from "./Auth.js";

//Admin imports
import Admin from "./Admin.js";
import Panel from "./admin/Panel.js";
import Users from "./admin/Users.js";
import Positions from "./admin/Positions.js";
import PositionsData from "./admin/PositionsData.js";
import Departments from "./admin/Departments.js";
import Schedule from "./admin/Schedule.js";
import Notifications from "./admin/Notifications.js";
import Settings from "./admin/Settings.js";

//Manager imports
import Manager from "./Manager.js";
import ScheduleManager from "./manager/Schedule.js";
import NotificationsManager from "./manager/Notifications.js";
import SettingsManager from "./manager/Settings.js";

//User imports
import User from "./User.js";
import ScheduleUser from "./user/Schedule.js";
import Requests from "./user/Requests.js";
import NotificationsUser from "./user/Notifications.js";

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

                {/* Admin Routes */}
                <Route exact path="/s/admin"><Container>
                    <Admin/><Panel/>
                </Container></Route>

                <Route exact path="/s/admin/users"><Container>
                    <Admin/><Users/>
                </Container></Route>

                <Route exact path="/s/admin/positions"><Container>
                    <Admin/><Positions/>
                </Container></Route>

                <Route exact path="/s/admin/positions/:posID"><Container>
                    <Admin/><PositionsData/>
                </Container></Route>

                <Route exact path="/s/admin/departments"><Container>
                    <Admin/><Departments/>
                </Container></Route>

                <Route exact path="/s/admin/schedule"><Container>
                    <Admin/><Schedule/>
                </Container></Route>

                <Route exact path="/s/admin/notifications"><Container>
                    <Admin/><Notifications/>
                </Container></Route>
                
                <Route exact path="/s/admin/settings"><Container>
                    <Admin/><Settings/>
                </Container></Route>

                {/* Manager Routes */}
                <Route exact path="/s/manager"><Container>
                    <Manager/><Panel/>
                </Container></Route>
                <Route exact path="/s/manager/schedule"><Container>
                    <Manager/><ScheduleManager/>
                </Container></Route>
                <Route exact path="/s/manager/notifications"><Container>
                    <Manager/><NotificationsManager/>
                </Container></Route>
                <Route exact path="/s/manager/settings"><Container>
                    <Manager/><SettingsManager/>
                </Container></Route>

                {/* User Routes */}
                <Route exact path="/s/user"><Container>
                    <User/><Panel/>
                </Container></Route>
                <Route exact path="/s/user/schedule"><Container>
                    <User/><ScheduleUser/>
                </Container></Route>
                <Route exact path="/s/user/requests"><Container>
                    <User/><Requests/>
                </Container></Route>
                <Route exact path="/s/user/notifications"><Container>
                    <User/><NotificationsUser/>
                </Container></Route>                
            </Switch>
        )
    }
}

export default Portal;