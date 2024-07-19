import { Router } from 'express';
import upload from '../middlewares/multer.js';
import controller from '../controllers/item.js';

const router = Router();

router.get('/', controller.getIndex);

router.get('/add', controller.getAdd);

router.post('/add', upload.single('photo'), controller.postAdd);

router.get('/:id', controller.getDetails);

router.delete('/:id/remove', controller.delete);

router.get('/:id/edit', controller.getEdit);

router.post('/:id/edit', upload.single('photo'), controller.postEdit);

export default router;
