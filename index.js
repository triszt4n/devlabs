const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('static'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

require("./routes/dev")(app);
require("./routes/main")(app);
require("./routes/role")(app);
require("./routes/sprint")(app);

//TRY HERE:
/*app.use('/shoes', function (req, res, next) {
    console.log('Order: ' + req.query.order);
    console.log('Shoe type: ' + req.query.shoe.type);
    res.end();
});*/
//---------

//The 404 Route:
app.get('*', function(req, res){
    res.status(404).redirect("/notfound.html");
});

const port = 3000;
app.listen(port, function () {
    console.log(`Listening on: http://localhost:${port}/`);
});