import { Router } from 'express';
import verifyToken, { requireAdmin } from '../middleware/verifyToken.js';
import upload from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import { reservationSchema } from '../validators/schemas.js';

import {
  createReservation,
  getReservations,
  deleteReservation
} from '../controllers/reservationController.js';

const router = Router();

router.post('/reservation', upload.none(), validate(reservationSchema), createReservation);

router.get('/admin/reservations', verifyToken, requireAdmin, getReservations);
router.delete('/admin/reservations/:id', verifyToken, requireAdmin, deleteReservation);

export default router;
