"use strict";

const uid = require("uniqid");
const { DateTime, Duration, Interval } = require("luxon");

const FunnelUser = require("./models/FunnelUser.js");
const Partial = require("./models/Partial.js");

let dur = Duration.fromObject({days: 1});

module.exports = function (app) {

app.get("/ws", (req, res) => {
    res.json({"message": "willstyle entry complete"});
});

function getDateRange(ds, de) {
    ds = DateTime.fromFormat(ds, "yyyy-MM-dd");
    de = DateTime.fromFormat(de, "yyyy-MM-dd");
    let allDates = [];
    let totalDays = Interval.fromDateTimes(ds, de).length("days");

    for (let i = 0; i <= totalDays; i++) { allDates.push(ds.plus({days: i}).toLocaleString()); }
    return allDates;
}

/*
GET SS FUNNEL DATA
*/

app.get("/ws/st", (req, res) => {
    let rq = req.query;
    let dates = getDateRange(rq.dateStart, rq.dateEnd);
    dates.forEach(d => console.log(d));

    //FIND USERS BASED ON DATE
    FunnelUser.find().where("dc").in(dates).exec((err, users) => {
        if (err) console.error(err);
        
        users = users.filter(u => u.source == "SvenCartStress");
        //SPLIT TEST DATA
        let stData = {
            a: { total: 0, wentToCheckout: 0, stress1: 0, stress3: 0, stress6: 0, conversion: 0 },
            b: { total: 0, wentToCheckout: 0, stress1: 0, stress3: 0, stress6: 0, conversion: 0 },
            corruptUsers: 0
        }
        users.forEach(u =>{
            if (u.data.splitVersion != "a" && u.data.splitVersion != "b") {
                stData.corruptUsers++;
                return;
            }
            else {
                stData[u.data.splitVersion].total = stData[u.data.splitVersion].total + 1;
                if (u.data.wentToCheckout) { 
                    stData[u.data.splitVersion].wentToCheckout = stData[u.data.splitVersion].wentToCheckout + 1;
                    stData[u.data.splitVersion][u.data.checkoutOption] = stData[u.data.splitVersion][u.data.checkoutOption] + 1;
                }
                if (u.data.purchases) {
                    if (u.data.purchases.includes("conversion")) stData[u.data.splitVersion].conversion = stData[u.data.splitVersion].conversion + 1;
                }
            }
        });

        //UPSELL DATA
        let upsellOrder = ["mots2", "mots3", "mots6", "sleep1", "sleep3", "sleep6"];
        let upsellData = { stress1: [0,0,0,0,0,0,0], stress3: [0,0,0,0,0,0,0], stress6: [0,0,0,0,0,0,0] };
        console.log(users);
        users.forEach(u => {
            if (u.data.purchases) {
                if (u.data.wentToCheckout && u.data.purchases.includes("conversion")) {
                    const initProduct = u.data.checkoutOption;
                    console.log(u.data);
                    upsellData[initProduct][0] = upsellData[initProduct][0] + 1;
                    if (u.data.purchases) {
                        upsellOrder.forEach((o, i) => {
                            if(u.data.purchases.includes(o)) upsellData[initProduct][i + 1] = upsellData[initProduct][i + 1] + 1;
                        });
                    }   
                }
            }
        });

        res.json({stData, upsellData});
    });
});

//CUSTOM QUERY AN
app.get("/ws/st/custom", (req, res) => {
    let rq = req.query;
    console.log(rq);
    let dates = getDateRange(rq.dateStart, rq.dateEnd);
    dates.forEach(d => console.log(d));

    //FIND USERS BASED ON DATE
    FunnelUser.find().where("dc").in(dates).exec((err, users) => {
        users = users.filter(u => u.source == "SvenCartStress");
        if (rq.crt == "conversions")
            users = users.filter(u => u.data.purchases.length > 1);
        else if (rq.crt == "conversionsE") {
            users = users.filter(u => u.data.purchases.length > 1);
            // users = users.map(u => {

            // });
        }
        res.json(users);
    });
});

/*
GET AN FUNNEL DATA
*/

app.get("/ws/an", (req, res) => {
    let rq = req.query;
    console.log(rq);
    let dates = getDateRange(rq.dateStart, rq.dateEnd);
    dates.forEach(d => console.log(d));

    //FIND USERS BASED ON DATE
    FunnelUser.find().where("dc").in(dates).exec((err, users) => {
        if (err) console.error(err);
        users = users.filter(u => u.source == "ANSMILE");
        //SPLIT TEST DATA
        let stData = {
            a: { total: 0, wentToCheckout: 0, smile1: 0, smile3: 0, smile6: 0, conversion: 0 },
            b: { total: 0, wentToCheckout: 0, smile1: 0, smile3: 0, smile6: 0, conversion: 0 },
            corruptUsers: 0
        }
        users.forEach(u =>{
            if (u.data.splitVersion != "a" && u.data.splitVersion != "b") {
                stData.corruptUsers++;
                return;
            }
            else {
                stData[u.data.splitVersion].total = stData[u.data.splitVersion].total + 1;
                if (u.data.wentToCheckout) { 
                    stData[u.data.splitVersion].wentToCheckout = stData[u.data.splitVersion].wentToCheckout + 1;
                    stData[u.data.splitVersion][u.data.checkoutOption] = stData[u.data.splitVersion][u.data.checkoutOption] + 1;
                }
                if (u.data.purchases) {
                    if (u.data.purchases.includes("conversion")) stData[u.data.splitVersion].conversion = stData[u.data.splitVersion].conversion + 1;
                }
            }
        });
        
        //UPSELL DATA
        let upsellOrder = ["smile6u", "sleep1", "sleep3", "sleep6", "smile4u"];
        let upsellData = { smile1: [0,0,0,0,0,0,0], smile3: [0,0,0,0,0,0,0], smile6: [0,0,0,0,0,0,0] };
        
        users.forEach(u => {
            if (u.data.purchases) {
                if (u.data.wentToCheckout && u.data.purchases.includes("conversion")) {
                    const initProduct = u.data.checkoutOption;
                    upsellData[initProduct][0] = upsellData[initProduct][0] + 1;
                    if (u.data.purchases) {
                        upsellOrder.forEach((o, i) => {
                            if(u.data.purchases.includes(o)) upsellData[initProduct][i + 1] = upsellData[initProduct][i + 1] + 1;
                        });
                    }   
                }
            }
        });

        res.json({stData, upsellData});
    });
});


//CUSTOM QUERY AN
app.get("/ws/an/custom", (req, res) => {
    let rq = req.query;
    console.log(rq);
    let dates = getDateRange(rq.dateStart, rq.dateEnd);
    dates.forEach(d => console.log(d));

    //FIND USERS BASED ON DATE
    FunnelUser.find().where("dc").in(dates).exec((err, users) => {
        users = users.filter(u => u.source == "ANSMILE");
        if (rq.crt == "conversions")
            users = users.filter(u => u.data.purchases.length > 1);
        else if (rq.crt == "conversionsE") {
            users = users.filter(u => u.data.purchases.length > 1);
            // users = users.map(u => {

            // });
        }
        res.json(users);
    });
});

/*
FUNNEL VISIT
*/

app.post("/ws/users/create", (req, res) => {
    let rb = req.body;
    FunnelUser.findById(rb.sessionID, (err, user) => {
        if (err) console.error(err);
        if (!user) {
            let newUser = new FunnelUser({
                _id: rb.sessionID,
                dc: DateTime.now().toLocaleString(),
                source: rb.source,
                email: "unknown",
                data: { allCookieData: rb.cookieData, splitVersion: rb.splitVersion, wentToCheckout: false, checkoutOption: "none", purchases: ["init"]}
            });
        
            // Save new user to db
            newUser.save((err, data) => {
                if (err) return console.error(err);
                res.json({info: `A new user, ${newUser._id}, has been created successfully.`});
            });
        }
        else {
            res.json({ "info": "User has already been created" });
        }
    })
});

/*
FUNNEL WENT TO CHECKOUT
*/

app.post("/ws/users/checkout", (req, res) => {
    let rb = req.body;
    FunnelUser.findById(rb.sessionID, (err, user) => {
        if (err) console.error(err);
        if (user) {
            user.data.wentToCheckout = true;
            user.data.checkoutOption = rb.checkoutOption;
        
            // Save checkout event
            user.markModified('data');
            user.save((err, data) => {
                if (err) return console.error(err);
                res.json({info: `User ${user._id}, went to checkout.`});
            });
        }
        else {
            res.json({ "info": "User not found." });
        }
    })
});

/*
FUNNEL CONVERSION
*/

app.post("/ws/users/conversion", (req, res) => {
    let rb = req.body;
    FunnelUser.findById(rb.sessionID, (err, user) => {
        if (err) console.error(err);
        if (user) {
            user.data.purchases.push("conversion");
            if(rb.params) {
                user.data.params = rb.params;
            }
            // Save checkout event
            user.markModified('data');
            user.save((err, data) => {
                if (err) return console.error(err);
                res.json({info: `User ${user._id}, purchased.`});
            });
        }
        else {
            res.json({ "info": "User not found." });
        }
    })
});

/*
FUNNEL UPSELL PURCHASE
*/

app.post("/ws/users/upsell", (req, res) => {
    let rb = req.body;
    FunnelUser.findById(rb.sessionID, (err, user) => {
        if (err) console.error(err);
        if (user) {
            user.data.purchases.push(rb.productID);
            // Save checkout event
            user.markModified('data');
            user.save((err, data) => {
                if (err) return console.error(err);
                res.json({info: `User ${user._id}, purchased at checkout.`});
            });
        }
        else {
            res.json({ "info": "User not found." });
        }
    })
});

/*
GET PARTIALS
*/

app.get("/ws/partials", (req, res) => {
    Partial.find({}, (err, partials) => {
        if (err) console.error(err);
        let pList = partials.filter(p => 
            p.em.length > 1 && 
            p.em != "unknown" && 
            p.fn != "unknown" && 
            p.ln != "unknown" &&
            !p.fn.includes("Test") &&
            !p.fn.includes("Customer") && 
            !p.ln.includes("Please") && 
            !p.ln.includes("Ignore"));
        res.json(pList);
    });
});

/*
CREATE PARTIAL
*/

app.post("/ws/partials/create", (req, res) => {
    let rb = req.body;
    Partial.findById(rb.sessionID, (err, partial) => {
        if (err) console.error(err);
        if (!partial) {
            let newPartial = new Partial({
                fn: rb.type == "fn" ? rb.args : "unknown",
                ln: rb.type == "ln" ? rb.args : "unknown",
                em: rb.type == "em" ? rb.args : "unknown",
                ph: rb.type == "ph" ? rb.args : "unknown",
                dc: rb.dc
            });
        
            // Save new partial to db
            newPartial.save((err, data) => {
                if (err) return console.error(err);
                res.json({ "info": `A new partial has been created successfully.`, id: newPartial._id });
            });
        }
        else {
            res.json({ "info": "Partial has already been created" });
        }
    })
});

/*
MODIFY PARTIAL
*/

app.post("/ws/partials/modify", (req, res) => {
    let rb = req.body;
    Partial.findById(rb.sessionID, (err, partial) => {
        if (err) console.error(err);
        if (partial) {
            partial[rb.type] = rb.args;
        
            // Save partial modification event
            partial.save((err, data) => {
                if (err) return console.error(err);
                res.json({ "info": `Partial ${partial._id}, has been modified.`});
            });
        }
        else {
            res.json({ "info": "Partial not found." });
        }
    })
});

}