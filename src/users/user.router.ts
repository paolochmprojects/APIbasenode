import { Router } from "express"
import userController from "./user.controller"

const router = Router()


router.get("/", async (req, res) => await userController.getUsers(req, res))
router.get("/:id", async (req, res) => await userController.getUsersById(req, res))
router.post("/", async (req, res) => await userController.createUser(req, res))
router.put("/", async (req, res) => await userController.updateUser(req, res))
router.delete("/:id", async (req, res) => await userController.deleteUser(req, res))


export default router