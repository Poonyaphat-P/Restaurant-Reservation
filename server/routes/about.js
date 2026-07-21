import { Router } from 'express';
import { getTeam } from '../controllers/aboutController.js';

const router = Router();

router.get('/about', getTeam);

export default router;
