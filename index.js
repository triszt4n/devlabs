const express = require('express');
const app = express();

const session = require('express-session');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

//BodyParser:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Static middleware:
app.use(express.static('static'));

//Session:
app.use(session({
    secret: 'rip keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

//Importing all application routes:
require("./routes/account")(app);
require("./routes/developers")(app);
require("./routes/milestone")(app);
require("./routes/projects")(app);
require("./routes/default")(app);

//Error handling:
app.use((err, req, res, next) => {
    console.error(err.stack);
    req.session.message = "Internal server error. Seek contact for help.";
    return res.status(500).redirect("/error");
});

//The 404 Route:
app.get('*', (req, res) => {
    req.session.message = "The page you're looking for is not found.";
    return res.status(400).redirect("/error");
});

const port = 3200;
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}/`);
});