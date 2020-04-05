const express = require('express');
const app = express();
// const cors = require('cors');

app.use(express.static('dist'));
// app.use(cors());

app.use(express.json({ limit: '1mb', extended: true }));
app.use(express.urlencoded({ extended: true }));

// import model route
const modelRoute = require('./routes/model');

// Route middleware
app.use('/model', modelRoute)

// Fix this
let PORT = 3000;
app.listen(process.env.PORT || PORT, () => console.log("Server up and running on port 3000..."))
