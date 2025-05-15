"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.send("hello");
});
app.listen(8000, () => {
    console.log("App is listening on port", 8000);
});
