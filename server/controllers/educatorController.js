import { clerkClient } from '@clerk/express';
import Course from '../models/Course.js';
import { v2 as cloudinary } from 'cloudinary'; // ✅ Correct usage (lowercase)
import fs from 'fs'; // Optional: to delete temp files after upload

// ✅ Update user role to 'educator'
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: 'educator' },
    });

    res.status(200).json({ success: true, message: 'You can publish a course now' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Add new course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file; // ✅ multer uses `req.file`
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: 'Thumbnail not attached' });
    }

    const parsedCourseData = JSON.parse(courseData); // Consider adding a try-catch around this
    parsedCourseData.educator = educatorId;

    const newCourse = await Course.create(parsedCourseData);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    // Optionally remove the uploaded temp file from local storage
    fs.unlink(imageFile.path, () => {}); // 🔐 cleanup

    res.status(201).json({ success: true, message: 'Course added successfully' });
  } catch (error) {
    console.error('Add Course Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all courses by educator
export const getEducatorCourses = async (req, res) => {
  try {
    const educatorId = req.auth.userId;
    const courses = await Course.find({ educator: educatorId });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
