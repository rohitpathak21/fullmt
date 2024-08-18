import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const route = express.Router();

route.put("/:id", verifyToken, updateUser);   // Update User
route.delete("/:id", verifyToken, deleteUser); // Delete User

export default route;
