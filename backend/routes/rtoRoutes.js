import express from 'express';
import {
  getRtos,
  getRtoById,
  createRto,
  updateRto,
  deleteRto
} from '../controllers/rtoController.js';

const router = express.Router();

router.route('/')
  .get(getRtos)
  .post(createRto);

router.route('/:id')
  .get(getRtoById)
  .put(updateRto)
  .delete(deleteRto);

export default router;
