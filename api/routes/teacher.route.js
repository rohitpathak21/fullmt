import express from 'express';
import { updateUser, updateAddress, deleteUser, updateTeachingLocation, updateTeachingInfo, getTeachersForStudents, getUsersForTeachers } from '../controllers/teacher.controller.js';
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

// Route for updating teaching details
router.put('/teachingdetails/:id', verifyToken, updateTeachingInfo);

// Route for fetching teachers (for students)
router.get('/teachers', verifyToken, getTeachersForStudents);

// Route for fetching users (for teachers)
router.get('/users', verifyToken, getUsersForTeachers);

export default router;
