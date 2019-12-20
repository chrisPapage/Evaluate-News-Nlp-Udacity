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
  application_id: "a67995e5",
  application_key: "f2d826b77540bbb3128d9e7aefccf38c"
});

app.post("/save", function(req, res) {
  console.log(req.body);

  console.log("Received");
  const parseUrl = req.body.url;
  console.log(parseUrl);
  aylienApi.classify(
    {
      url: parseUrl
    },
    (err, resp) => {
      if (err === null && resp.categories.length !==0) {
        const classify = resp.categories[0].label;
        console.log(classify);
        res.json({
          message: classify
        });
      } else {
        const failedText = "Could not classify this news article.";
        res.json({
          message: failedText
        });
      }
    }
  );
});
