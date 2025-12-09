import express from "express";
import {userDetail,update,complients,users,delet} from "../Controllers/controller.js";
const router = express.Router();
router.post("/complaints", userDetail);
router.get("/admins",complients);
router.put("/update/:id",update);
router.get("/user",users);


router.delete("/delete/:id", delet);

export default router;

