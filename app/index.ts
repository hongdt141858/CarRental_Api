import * as express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";
import { createConnections } from 'typeorm'
import * as expressValidator from "express-validator";
import * as dotenv from 'dotenv';


createConnections().catch((e) => console.log(e)).then((e) => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    dotenv.config({ path: '.env' });
    app.set("port", process.env.PORT || 3000);

    console.log("ENV: ", app.get('env'))

    let engine = require('ejs-locals');
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.use(expressValidator());

    // const userRoute = require('./routers/user/UserAccountRouter')

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader('Access-Control-Allow-Credentials','true');
        next();
    });

    app.listen(app.get("port"), () => {
        console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
        console.log("  Press CTRL-C to stop\n");
    });
}).catch((err) => console.log(err))
