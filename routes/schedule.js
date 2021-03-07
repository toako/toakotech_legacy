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

    const deptPos = org.data.departments.map(dept => ({
        title: dept.title,
        hours: dept.hours,
        positions: dept.positions
    }));

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
            hours: dept.hours,
            userData: deptUsers,
        };
    });
    return allDeptUsers;
}

function orientScheduleToUser (data, deptTitle) {
    let deptSch = [];
    let expectedHoursUsed = 0;
    let actualHoursUsed = 0;

    data.days.forEach(day => {
        const thisDeptUsers = day.departments.find(dept => dept.title == deptTitle).users;
        deptSch.push({
            date: day.date,
            users: thisDeptUsers
        });
    });

    let userSchedules = deptSch[0].users.map(user => ({
        id: user.id, 
        name: user.name,
        posColor: user.posColor,
        posID: user.posID,
        posTitle: user.posTitle,
        schedule: deptSch.map(day => {
            const daySchedule = day.users.find(user2 => user2.id == user.id);
            const expected = daySchedule.expectedClock;
            const actual = daySchedule.actualClock;
            const expectedHours = calculateHours(daySchedule.expectedClock);
            const actualHours = calculateHours(daySchedule.actualClock);

            expectedHoursUsed += expectedHours;
            actualHoursUsed += actualHours;

            return {
                date: day.date,
                expectedClock: expected,
                actualClock: actual,
                expectedHours,
                actualHours
            }
        })
    }));
    return {userSchedules, expectedHoursUsed, actualHoursUsed};
}

function calculateHours (timeArray) {

    let timeMinArray = [];

    timeArray.forEach(t => {
        const th = t.split(":");
        timeMinArray.push(parseInt(th[0]) * 60 + parseInt(th[1]));
    });
    
    const lunchMins = timeMinArray[2] - timeMinArray[1];
    const clockMins = timeMinArray[3] - timeMinArray[0];
    const totalHours = Math.round(((clockMins - lunchMins) / 60) * 100) / 100;

    return totalHours;
}

app.get("/s/admin/schedule", (req, res) => {
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);
        const departments = org.data.departments.map(dept => [dept.title, dept.hours]);
        res.json({departments});
    });
});

app.post("/s/admin/schedule", (req, res) => {
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);
        const deptIndex = org.data.departments.findIndex(dept => dept.title === req.body.dept);
        org.data.departments[deptIndex].hours = req.body.hours;
        
        org.markModified('data');
            org.save((err) => {
                if (err) console.error(err);
                res.json({
                    info: `Modified department ${req.body.dept} to ${req.body.hours} hours.`,
                    departments: org.data.departments.map(dept => [dept.title, dept.hours])
                });
            }); 
    });
});

app.get("/s/manager/schedule", (req, res) => {

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
            const userPosition = org.data.positionRegister.filter(posRegUser => posRegUser[0] == req.session._id)[0][1];
            const thisDept = org.data.departments.filter(dept => dept.manager.id == userPosition)[0];
            const deptTitle = thisDept.title;
            const deptHours = thisDept.hours;

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
                                    hours: dept.hours,
                                    users: dept.userData.map(user => {
                                        return {
                                            id: user.id,
                                            name: user.name,
                                            posID: user.posID,
                                            posTitle: user.posTitle,
                                            posColor: user.posColor,
                                            expectedClock: ["00:00","00:00","00:00","00:00"],
                                            actualClock: ["00:00","00:00","00:00","00:00"]
                                        }
                                    })
                                };
                            })
                        }))
                    });
                    const userOrientSchedule = orientScheduleToUser(newWeekStore, deptTitle);
                    newWeekStore.save(err => {
                        if (err) console.error(err);
                        res.json({
                            dates,
                            deptHours,
                            deptTitle,
                            weekData: userOrientSchedule.userSchedules,
                            expectedHoursUsed: userOrientSchedule.expectedHoursUsed,
                            actualHoursUsed: userOrientSchedule.actualHoursUsed
                        });
                    });
                }
                else {
                    const userOrientSchedule = orientScheduleToUser(weekStore[0], deptTitle);
                    res.json({
                        dates,
                        deptHours,
                        deptTitle,
                        weekData: userOrientSchedule.userSchedules,
                        expectedHoursUsed: userOrientSchedule.expectedHoursUsed,
                        actualHoursUsed: userOrientSchedule.actualHoursUsed
                    });
                }
            });
        });
    });
});

app.post("/s/manager/schedule/changeWeek", (req, res) => {
    let currentDate = DateTime.fromISO(req.body.date);

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
            const userPosition = org.data.positionRegister.filter(posRegUser => posRegUser[0] == req.session._id)[0][1];
            const thisDept = org.data.departments.filter(dept => dept.manager.id == userPosition)[0];
            const deptTitle = thisDept.title;
            const deptHours = thisDept.hours;

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
                                    hours: dept.hours,
                                    users: dept.userData.map(user => {
                                        return {
                                            id: user.id,
                                            name: user.name,
                                            posID: user.posID,
                                            posTitle: user.posTitle,
                                            posColor: user.posColor,
                                            expectedClock: ["00:00","00:00","00:00","00:00"],
                                            actualClock: ["00:00","00:00","00:00","00:00"]
                                        }
                                    })
                                };
                            })
                        }))
                    });
                    const userOrientSchedule = orientScheduleToUser(newWeekStore, deptTitle);
                    newWeekStore.save(err => {
                        if (err) console.error(err);
                        res.json({
                            dates,
                            deptHours,
                            deptTitle,
                            weekData: userOrientSchedule.userSchedules,
                            expectedHoursUsed: userOrientSchedule.expectedHoursUsed,
                            actualHoursUsed: userOrientSchedule.actualHoursUsed
                        });
                    });
                }
                else {
                    const userOrientSchedule = orientScheduleToUser(weekStore[0], deptTitle);
                    res.json({
                        dates,
                        deptHours,
                        deptTitle,
                        weekData: userOrientSchedule.userSchedules,
                        expectedHoursUsed: userOrientSchedule.expectedHoursUsed,
                        actualHoursUsed: userOrientSchedule.actualHoursUsed
                    });
                }
            });
        });
    });
});

app.post("/s/manager/schedule/modify", (req, res) => {
    const rb = req.body;
    console.log(req.body);
    //Convert date for use with luxon
    const splitDate = rb.date.split("/");
    if (parseInt(splitDate[0]) < 10) 
        splitDate[0] = "0" + splitDate[0];
    if (parseInt(splitDate[1]) < 10) 
        splitDate[1] = "0" + splitDate[1];
    const currentDate = DateTime.fromISO(`${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`);
    const dates = getWeekDates(currentDate.toISO());
    const localeDates = dates.map(date => {
        return DateTime.fromISO(date).toLocaleString();
    });
    
    WeekStore.findOne({orgID: 8032, startDate: localeDates[0]}, (err, weekStore) => {
        if (err) console.error(err);

        const dayIndex = weekStore.days.findIndex(day => day.date == rb.date);
        const deptIndex = weekStore.days[dayIndex].departments.findIndex(dept => dept.title == rb.title);
        const userIndex = weekStore.days[dayIndex].departments[deptIndex].users.findIndex(user => user.id == rb.id);

        weekStore.days[dayIndex].departments[deptIndex].users[userIndex].expectedClock = rb.clocks;

        weekStore.markModified('days');
        weekStore.save((err) => {
            if (err) console.error(err);
            const userOrientSchedule = orientScheduleToUser(weekStore, rb.title);
            res.json({
                weekData: userOrientSchedule.userSchedules,
                expectedHoursUsed: userOrientSchedule.expectedHoursUsed,
                actualHoursUsed: userOrientSchedule.actualHoursUsed,
                info: "Sucessfully modified time."
            });
        });
    });
});

app.get("/s/user/schedule", (req, res) => {
    //Week 1 (this week)
    let currentDate = DateTime.now();
    const dates = getWeekDates(currentDate.toISO());
    //Week 2 (next week)
    const nextWeekDate = DateTime.fromISO(dates[0]).plus({days: 7});
    const nextDates = getWeekDates(nextWeekDate.toISO());

    const locDates0 = dates.map(date => {
        return DateTime.fromISO(date).toLocaleString();
    });
    const locDates1 = nextDates.map(date => {
        return DateTime.fromISO(date).toLocaleString();
    });

    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);

        const posIndex = org.data.positionRegister.find(posRegUser => posRegUser[0] == req.session._id)[1];
        const deptTitle = org.data.departments.find(dept => dept.positions.findIndex(pos => pos.id == posIndex) != -1).title;
        WeekStore.find({orgID: 8032}, (err, _weekStores) => {
            if (err) console.error(err);
            
            let weekStore0 = _weekStores.find(ws => ws.startDate == locDates0[0]);
            let weekStore1 = _weekStores.find(ws => ws.startDate == locDates1[0]);

            const sch1 = orientScheduleToUser(weekStore0, deptTitle).userSchedules.find(user => user.id == req.session._id);
            const sch2 = orientScheduleToUser(weekStore1, deptTitle).userSchedules.find(user => user.id == req.session._id);
            res.json({
                name: sch1.name,
                id: sch1.id,
                title: deptTitle,
                schedule1: sch1.schedule,
                schedule2: sch2.schedule,
                startDate1: locDates0[0],
                startDate2: locDates1[0],
            });
        });
    });
});

app.post("/s/user/schedule/clock", (req, res) => {
    const rb = req.body;
    const index = rb.index;
    console.log(index);

    const currentDate = DateTime.now();
    const dates = getWeekDates(currentDate.toISO());
    const localeDates = dates.map(date => {
        return DateTime.fromISO(date).toLocaleString();
    });

    WeekStore.findOne({orgID: 8032, startDate: localeDates[0]}, (err, weekStore) => {
        if (err) console.error(err);

        const dayIndex = weekStore.days.findIndex(day => day.date == currentDate.toLocaleString());
        const deptIndex = weekStore.days[dayIndex].departments.findIndex(dept => dept.title == rb.title);
        const userIndex = weekStore.days[dayIndex].departments[deptIndex].users.findIndex(user => user.id == rb.id);
        weekStore.days[dayIndex].departments[deptIndex].users[userIndex].actualClock[index] = currentDate.toISOTime().substr(0,5);

        weekStore.markModified('days');
        weekStore.save((err) => {
            if (err) console.error(err);

            res.json({
                info: "Sucessful clock at time."
            });
        });
    });
});

}