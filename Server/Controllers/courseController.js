import Course from "../models/Course.js";

//get all courses
export const getAllCourse = async(req,res)=>{
    try {
        const course = await Course.find({isPublished: true}).select
        (['-courseContent','-enrolledStudents' ]).populate({path:'edocator'})

        res.json({ success: true, courses })
    } catch (error) {
        
    }
}