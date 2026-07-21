import { Router } from 'express';
import verifyToken, { requireAdmin } from '../middleware/verifyToken.js';
import upload from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import { formSchema } from '../validators/schemas.js';

import {
  submitForm,
  getForms,
  updateFormStatus,
  deleteForm
} from '../controllers/contactController.js';

const router = Router();

router.post('/contact', upload.none(), validate(formSchema), submitForm);

router.get('/admin/contact', verifyToken, requireAdmin, getForms);
router.patch('/admin/contact/:id', verifyToken, requireAdmin, updateFormStatus);
router.delete('/admin/contact/:id', verifyToken, requireAdmin, deleteForm);

export default router;
