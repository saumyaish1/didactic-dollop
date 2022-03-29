const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const res = require("express/lib/response");


const app = express();

app.use(express.static("pubic"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    console.log("the server is up and running ru nning");
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const emailId = req.body.email;
    const data = {
        members: [{
            email_address: emailId,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsondata = JSON.stringify(data);
    const url = " https://us14.api.mailchimp.com/3.0/lists/cbb57875a6";
    const options = {
        method: "POST",
        auth: "ish1308:47e734e9eb3f4e451d64200cb07f4179-us14"
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else
            res.sendFile(__dirname + "/failure.html");

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
});
app.post("/failure", function(req, res) {
    res.redirect("/")
})
app.listen(process.env.PORT || 3000, () => {
    console.log("the server is reunning on port 3000");
});


// api Key
// 47e734e9eb3f4e451d64200cb07f4179-us14


// list id 
// cbb57875a6