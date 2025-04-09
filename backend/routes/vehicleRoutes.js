import express from 'express';
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicle
} from '../controllers/vehicleController.js';

const router = express.Router();

router.route('/')
  .get(getVehicles)
  .post(createVehicle);

router.get('/search', searchVehicle);

router.route('/:id')
  .get(getVehicleById)
  .put(updateVehicle)
  .delete(deleteVehicle);

export default router;
