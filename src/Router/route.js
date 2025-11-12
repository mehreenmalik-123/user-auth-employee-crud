import express from "express";
import { signup_emp } from "../Controller/signup.js";
import{login} from "../Controller/signup.js"
import {add_employee,read_employee,update_employee,delete_employee} from"../Controller/employeecontroller.js"
import { verifyToken } from "../authmiddleware/verifytoken.js";

const router = express.Router();

router.post("/signup_emp", signup_emp);
router.post("/login", login)
router.post("/add_employee",verifyToken,add_employee);
router.get("/read_employee", verifyToken,read_employee);
router.patch("/update_employee", verifyToken,update_employee);
router.delete("/delete_employee", verifyToken,delete_employee);

export default router;

