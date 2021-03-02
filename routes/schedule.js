/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    schedule.js - BACK END

    Server handler that sends and receives data about someone's schedule.
    Is used by the user, manager, and admin.

////////////////////////////////////////////////////////////////////////////////////////*/

"use strict";

const Organization = require("./models/Organization.js");
const User = require("./models/User.js");
const WeekStore = require("./models/WeekStore.js");
const { DateTime } = require("luxon");

module.exports = function (app) {

function getWeekDates (isoDate) {
    const chosenDate = DateTime.fromISO(isoDate);
    const wd = chosenDate.weekday;
    let weekDates = [];
    for (let i = 1; i < wd; i++) {
        const tempDate = chosenDate.minus({days: wd - i});
        weekDates.push(tempDate.toISO());
    }
    for (let i = 7; i >= wd; i--) {
        const tempDate = chosenDate.plus({days: 7 - i});
        weekDates.push(tempDate.toISO());
    }
    return weekDates;
}

function getDeptUserData (id, org, users) {
    // const userPosition = org.data.positionRegister.filter(posRegUser => posRegUser[0] == id)[0][1];
    // const dept = org.data.departments.filter(dept => dept.manager.id == userPosition)[0];
    // const deptTitle = dept.title;
    // let deptUserIDs = [];

    // dept.positions.map(pos => pos.id).forEach(pos => {
    //     let usersInPos = org.data.positionRegister.filter(posRegUser => posRegUser[1] == pos);
    //     usersInPos = usersInPos.map(user => user[0]);
    //     deptUserIDs.push(...usersInPos);
    // })
    // let deptUsers = deptUserIDs.map(deptUserID => {
    //     const tempUser = users.filter(user => user._id == deptUserID)[0];
    //     return {
    //         _id: tempUser._id,
    //         name: `${tempUser.firstName} ${tempUser.lastName}`
    //     };
    // });
    // return {
    //     title: deptTitle,
    //     users: deptUsers
    // }

    const deptPos = org.data.departments.map(dept => ({
        title: dept.title,
        positions: dept.positions
    }));

    console.log(deptPos);

    let allDeptUsers = deptPos.map(dept => {
        let deptUsers = [];
        dept.positions.forEach(pos => {
            const matchingUsers = [];
            org.data.positionRegister.forEach(posRegUser => {
                if (posRegUser[1] == pos.id) {
                    let tempUser = users.filter(user => user._id == posRegUser[0])[0];
                    const userOutput = {
                        id: tempUser._id,
                        name: `${tempUser.firstName} ${tempUser.lastName}`,
                        posID: pos.id,
                        posTitle: pos.title,
                        posColor: pos.color
                    }
                    matchingUsers.push(userOutput);
                }
            });
            deptUsers.push(...matchingUsers);
        });
        return {
            title: dept.title,
            userData: deptUsers
        };
    });
    console.log(allDeptUsers);
    return allDeptUsers;
}

app.get("/s/manager/schedule/", (req, res) => {

    let currentDate = DateTime.now();
    const dates = getWeekDates(currentDate.toISO());

    const localeDates = dates.map(date => {
        return DateTime.fromISO(date).toLocaleString();
    });

    console.log(localeDates[0]);
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);

        User.find({orgID: req.session.orgID}, (err, users) => {
            if (err) console.error(err);

            const deptData = getDeptUserData(req.session._id, org, users);

            WeekStore.find({orgID: 8032, startDate: localeDates[0]}, (err, weekStore) => {
                if (err) console.error(err);
                
                if (!weekStore.length > 0) {
                    
                    let newWeekStore = new WeekStore({
                        orgID: req.session.orgID,
                        startDate: localeDates[0],
                        active: true,
                        days: localeDates.map(date => ({
                            date: date,
                            departments: deptData.map(dept => {
                                return {
                                    title: dept.title,
                                    users: dept.userData.map(user => {
                                        return {
                                            id: user.id,
                                            name: user.name,
                                            posID: user.posID,
                                            posTitle: user.posTitle,
                                            posColor: user.posColor,
                                            expectedClock: [null, null, null, null],
                                            actualClock:  [null, null, null, null]
                                        }
                                    })
                                };
                            })
                        }))
                    });
        
                    newWeekStore.save(err => {
                        if (err) console.error(err);
                        res.json({
                            dates,
                            weekData: newWeekStore
                        });
                    });
                }
                else {
                    res.json({
                        dates,
                        weekData: weekStore
                    });
                }
            });
        });
    });
    
});

app.post("/s/manager/schedule/changeWeek", (req, res) => {
    let currentDate = DateTime.fromISO(req.body.date);
    const dates = getWeekDates(currentDate.toISO());
    res.json({dates})
});

}