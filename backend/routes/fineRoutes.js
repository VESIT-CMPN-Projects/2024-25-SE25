import express from 'express';
import {
  getFines,
  getFineById,
  getFinesByVehicle,
  createFine,
  updateFine,
  deleteFine
} from '../controllers/fineController.js';

const router = express.Router();

router.route('/')
  .get(getFines)
  .post(createFine);

router.route('/:id')
  .get(getFineById)
  .put(updateFine)
  .delete(deleteFine);

router.get('/vehicle/:vehicleId', getFinesByVehicle);

export default router;
