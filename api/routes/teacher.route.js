import express from 'express';
import { updateUser, updateAddress, deleteUser, updateTeachingLocation, updateTeachingInfo } from '../controllers/teacher.controller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

// Route for updating user profile
router.put('/:id', verifyToken, updateUser);

// Route for updating address
router.put('/address/:id', verifyToken, updateAddress);

// Route for updating teaching location
router.put('/teachinglocation/:id', verifyToken, updateTeachingLocation);

// Route for deleting user
router.delete('/:id', verifyToken, deleteUser);

router.put('/teachingdetails/:id', verifyToken, updateTeachingInfo)

export default router;
