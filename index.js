const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("API VOIP ");
});

const getcallResultRoute = require('./routes/getCallResult.route')
const sendCampaignRoute = require('./routes/sendCampaign.route')
const getCusInfo = require('./routes/cusInfo.route')

dotenv.config();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

// connect db
mongoose.connect(
    process.env.URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => console.log(`connect database success`)
);


// using as middleware
app.use('/api/v3/callResult', getcallResultRoute)
app.use('/api/v3/sendCampaign', sendCampaignRoute)
app.use('/api/v3/cusInfo',getCusInfo)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});