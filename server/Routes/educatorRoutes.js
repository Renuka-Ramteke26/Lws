import express from 'express';
import {
  addCourse,
  getEducatorCourses,
  updateRoleToEducator,
} from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router();

// ✅ POST route for updating user role to educator (previously only had a dummy GET route)
educatorRouter.post('/update-role', updateRoleToEducator);

// ✅ Add a new course (image upload middleware and auth middleware)
educatorRouter.post('/add-course', protectEducator, upload.single('image'), addCourse);

// ✅ Get all courses by the educator
educatorRouter.get('/courses', protectEducator, getEducatorCourses);

export default educatorRouter;
