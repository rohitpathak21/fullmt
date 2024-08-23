import express from "express";
import { updateUser, deleteUser, updateAddress, updateAcadInfo } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const route = express.Router();

route.put("/:id", verifyToken, updateUser);   // Update User
route.delete("/:id", verifyToken, deleteUser); // Delete User
route.put("/address/:id", verifyToken, updateAddress); //update Address
route.put("/academicinfo/:id", verifyToken, updateAcadInfo);

export default route;
