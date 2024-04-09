import {Router} from "express"
import userController from "./user.controller"

const router = Router()


router.get("/", (req, res) => userController.getUsers(req, res))
router.get("/:id", (req, res)=> userController.getUsersById(req, res))
router.post("/", (req,res) => userController.createUser(req, res))
router.put("/", (req, res)=> userController.updateUser(req, res))
router.delete("/:id", (req, res) => userController.deleteUser(req, res))


export default router