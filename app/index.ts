import * as express from 'express';
import * as bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

let engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.listen(app.get("port"), () => {
    console.log("  Press CTRL-C to stop\n");
});

