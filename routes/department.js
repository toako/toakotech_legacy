"use strict";

const Organization = require("./models/Organization.js");
const User = require("./models/User.js");

module.exports = function (app) {





function findAssignments (positions, departments) {

    //Stripped to ID section
    let assignedPositions = [];
    departments.map(dept => dept.positions).forEach(dept => {
        assignedPositions.push(...dept);
    });
    departments.map(dept => dept.manager).forEach(manager => {
        if (manager != null) assignedPositions.push(manager);
    });

    let unassignedPositions = positions.filter(pos => {
        let assnPosIDs = assignedPositions.map(pos => pos.id);
        if (!assnPosIDs.includes(pos.id)) return pos;
    });

    return {
        departments: departments,
        assn: assignedPositions,
        unassn: unassignedPositions
    };
}

app.get("/s/admin/departments", (req, res) => {

    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);
        if (!org.data.hasOwnProperty("departments")) {
            org.data.departments = [];
            org.markModified('data');
            org.save((err) => {
                if (err) console.error(err);
            });
        }

        if (!org.data.hasOwnProperty("positions")) {
            org.data.positions = [];
            org.markModified('data');
            org.save((err) => {
                if (err) console.error(err);
            });
        }

        res.json(findAssignments(org.data.positions, org.data.departments));
    });
});

app.post("/s/admin/departments/add", (req, res) => {
    const rb = req.body;

    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);
        
        if (!org.data.hasOwnProperty("departments"))
            org.data.departments = [];

        if (org.data.departments.filter((dept) => dept.title == rb.title).length > 0) {
            res.json({error: "Cannot create two departments with the same title."});
        }
        else {
            org.data.departments.push({
                title: rb.title,
                manager: null,
                positions: [],
                data: {}
            });
            org.markModified('data');
            org.save((err) => {
                if (err) console.error(err);
                res.json({info: `A new department has been created successfully.`});
            }); 
        }
    });
});

app.post("/s/admin/departments/assign", (req, res) => {
    let rb = req.body;

    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);
        console.log(rb);
        const deptIndex = org.data.departments.map((dept) => dept.title).indexOf(rb.department);
        const posIndex = org.data.positions.map((pos) => pos.id).indexOf(rb.id);
        if (rb.assign == "false") {
            if(org.data.departments[deptIndex].manager == null) {
                org.data.departments[deptIndex].manager = org.data.positions[posIndex];
            }
            else {
                org.data.departments[deptIndex].positions.push(org.data.positions[posIndex]);
            }
        }
        else {
            if (org.data.departments[deptIndex].manager && org.data.departments[deptIndex].manager.id == rb.id) {
                org.data.departments[deptIndex].manager = null;
            }
            else {
                const removeIndex = org.data.departments[deptIndex].positions.map(pos => pos.id).indexOf(rb.id);
                org.data.departments[deptIndex].positions.splice(removeIndex, 1);
            }
        }

        org.markModified('data');
        org.save((err) => {
            if (err) console.error(err);
            res.json(findAssignments(org.data.positions, org.data.departments));
        });
    });
});

app.delete("/s/admin/departments/delete/", (req, res) => {
    const title = req.body.title;
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);

        const i = org.data.departments.map((dept) => dept.title).indexOf(title);
        if (i === -1) {
            res.json({ error: `Cannot find ${title} department.`});
        }
        org.data.departments.splice(i, 1);

        org.markModified('data');
        org.save((err, data) => {
            if (err) console.error(err);
            res.json({ 
                info: `Successfully deleted ${title} department.`,
                departments: org.data.departments
            });
        });
    })
});



}