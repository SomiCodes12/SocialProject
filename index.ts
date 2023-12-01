import express, { Application } from "express"
import { appConfig } from "./mainApp";
import env from "dotenv"
env.config()

const port : number|string = 1234;

const app : Application = express()

appConfig(app);


const server = app.listen( process.env.port!||port , () => {
    console.log("Server Live");
})