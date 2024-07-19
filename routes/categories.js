import { Router } from 'express';
import controller from '../controllers/category.js';

const router = Router();

router.get('/', controller.getIndex);

router.get('/add', controller.getAdd);

router.post('/add', controller.postAdd);

router.get('/:id', controller.getDetails);

router.get('/:id/edit', controller.getEdit);

router.post('/:id/edit', controller.postEdit);

router.delete('/:id/remove', controller.delete);

export default router;
