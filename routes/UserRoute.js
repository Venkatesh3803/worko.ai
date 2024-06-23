import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/UserController.js";
import { verifyTokenAndAuthorization } from "../middleware/jwt.js";
const router = express.Router();

router.get("/single/:id", getUser)
router.get("/all", getAllUser)
router.patch("/:id", verifyTokenAndAuthorization, updateUser)
router.delete("/:id",verifyTokenAndAuthorization, deleteUser)

export default router