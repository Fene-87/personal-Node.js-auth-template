import { Router} from "express";
import { login, signup } from "../controllers/auth.js";

const router = Router();

router.get('/signup');
router.post('/signup', signup);
router.get('/login');
router.post('/login', login);

export default router;
