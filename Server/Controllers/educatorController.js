import { clerkClient } from '@clerk/express';
import Course from '../models/Course.js';
import { v2 } from 'cloudinary';

export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId;

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            },
        });

        res.status(200).json({ success: true, message: 'You can publish a course now' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


//add new course
export const addCourse = async( req, res) =>{
    try {
        const { courseData} = req.body
        const imageFile = req.imageFile
        const educatorId = req.auth.userId

        if(!imageFile){
            return res.json({ success: false, message: 'Thumbnail Not Attached'})

        }

        const parsedCoursedata = await JSON.parse(courseData)
        parsedCoursedata.educator = educatorId
        const newCourse =  await Course.create(parsedCoursedata)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()

        res.json({ success: true, message: 'Course Added'})

    } catch (error) {
        res.json({ success: false, message: error.message })
        
    }
}

export const getEducatorCourses = async (req, res)=>{
    try {
        const educator = req.auth.userId

        const courses = await Course.find({educator})
        res.json({ success: true, courses})
    } catch (error) {
        res.json({success:false, message: error.message })
    }
}
