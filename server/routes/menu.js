import { Router } from 'express';
import verifyToken, { requireAdmin } from '../middleware/verifyToken.js';
import upload from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import { createMenuSchema, updateMenuSchema } from '../validators/schemas.js';

import {
  getMenu,
  getMenuAdmin,
  createMenu,
  updateMenu,
  deleteMenu,
  toggleRecommend
} from '../controllers/menuController.js';

const router = Router();

router.get('/menu', getMenu);

router.get('/admin/menu', verifyToken, requireAdmin, getMenuAdmin);
router.post('/admin/menu', verifyToken, requireAdmin, upload.single('image'), validate(createMenuSchema), createMenu);
router.put('/admin/menu', verifyToken, requireAdmin, upload.single('image'), validate(updateMenuSchema), updateMenu);
router.delete('/admin/menu/:id', verifyToken, requireAdmin, deleteMenu);
router.patch('/admin/menu/:id/recommend', verifyToken, requireAdmin, toggleRecommend);

export default router;
