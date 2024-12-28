import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { indexRoutes } from "./routes/indexRoutes.js";
dotenv.config();
var app = express();
var port = process.env.PORT || 4000;
app.use(cors({ credentials: true, origin: process.env.APPLICATION_URL }));
app.use(express.urlencoded({ extended: true, limit: 10000 }));
app.use(express.json({
    verify: function (req, res, buf) {
        req.rawBody = buf.toString();
    },
}));
app.use(cookieParser());
app.use("/api", indexRoutes);
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
