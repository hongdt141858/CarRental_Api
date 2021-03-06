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

    let engine = require('ejs-locals');
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(expressValidator());

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader('Access-Control-Allow-Credentials','true');
        next();
    });

    const cityRoute = require('./router/CityRouter')
    const brandRoute = require('./router/BrandRouter')
    const seatRoute = require('./router/SeatRouter')
    const transmission = require('./router/TransmissionRouter')
    const fuelRoute = require('./router/FuelRouter')
    const vehiclePartnerRouter = require('./router/VehiclePartnerRouter')
    const bookingRouter = require('./router/BookingRouter')
    const userRouter = require('./router/UserRouter')

    app.use("/city", cityRoute )
    app.use("/brand", brandRoute )
    app.use("/seat", seatRoute )
    app.use("/transmission", transmission )
    app.use("/fuel", fuelRoute )
    app.use("/vehicle-partner", vehiclePartnerRouter )
    app.use("/booking", bookingRouter )
    app.use("/user", userRouter)

    app.listen(app.get("port"), () => {
        console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
        console.log("  Press CTRL-C to stop\n");
    });
}).catch((err) => console.log(err))
