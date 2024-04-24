import { Router} from "express";
import { login, logout, signup } from "../controllers/auth.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

export default router;
