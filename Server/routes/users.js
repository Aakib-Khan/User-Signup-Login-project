import express from "express";
import { signup ,signin} from "../controllers/users.js";

const router=express.Router()



// router.get('/:id',getPostById)

router.post('/login',signin)
router.post('/signup',signup)

export default router
