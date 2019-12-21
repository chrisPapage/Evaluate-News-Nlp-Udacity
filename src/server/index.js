const dotenv = require("dotenv");
dotenv.config();

let projectData = {};

var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mockAPIResponse = require("./mockAPI.js");
var aylien = require("aylien_textapi");

const app = express();
const distPath = path.join(__dirname, "..//..//dist");
/* Dependencies */
/* Middleware*/
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(distPath));

app.get("/", function(req, res) {
  res.sendFile(path.resolve(distPath, "index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(3030, function() {
  console.log("Example app listening on port 3030!");
});

app.get("/test", function(req, res) {
  res.send(mockAPIResponse);
});

//set aylien API credentials
const aylienApi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

app.post("/save", function(req, res) {
  console.log(req.body);
  const parseUrl = req.body.url;
  console.log(parseUrl);
  if (aylienApi){
    aylienApi.sentiment({
      url: parseUrl
    },
    (err, resp) => {
      if (err === null) {
        console.log(resp);
        res.json({
          message: resp.polarity,
          message1: resp.polarity_confidence
        });
      } else {
        const failedText = "Could not define the sentiment";
        res.json({
          message: failedText
        });
      }
    }
  );
  }
});
