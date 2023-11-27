import express, { Application } from "express"
import { appConfig } from "./mainApp";

const port : number = 1234;

const app : Application = express()

appConfig(app);


const server = app.listen( port , () => {
    console.log("Server Live");
})