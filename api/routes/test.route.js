import express from "express";
import {shouldbeLoggedin} from "../controllers/test.contoller.js";
import { verifyToken } from "../middleware/verifytoken.js";


const route = express.Router();

route.get("/shouldbeLoggedin",verifyToken, shouldbeLoggedin);


export default route;