import dotenv from "dotenv";
import express from "express";
import { IUser } from "types";
dotenv.config();

const mohit: IUser = {
    name: "Mohit",
    age: 78
}

const app = express()

app.listen(4000, () => {
    console.log("Server started");
})