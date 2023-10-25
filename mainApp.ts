import cors from "cors"
import express, { Application, Request, Response } from "express"
import user from "./Router/usersRouter"


export const appConfig = (app : Application) => {
    app
    .use(cors())
    .use(express.json())

    .use("/api/v1" , user)

    .get("/" , (req : Request , res : Response) => {
        try {
            return res.status(200).json({
                message : "Welcome 😊😊"
            })
        } catch (error) {
            return res.status(400).json({
                message : "An Error Occured"
            })
        }
    })
}