import express from 'express'
import { register, login, getMe} from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
import { verifyEmail, resendVerificationEmail } from '../controllers/auth.controller.js';


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authMiddleware, getMe)
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);



export default router
