import express from 'express';

import { createSad, deleteSad, getAllSads, getOneSad, getParticularUserSads, restrictToOwner, update } from '../controllers/sadContoller.js'
import { isLoggedIn, protect } from '../controllers/authController.js';

const router = express.Router();

router.post('/', protect, createSad);
router.get('/',getAllSads );
router.get('/:id', getOneSad);
router.get('/user/:id',isLoggedIn, getParticularUserSads);
router.put('/:id',protect,restrictToOwner,update);
router.delete('/:id', protect,restrictToOwner,deleteSad);




export default router;