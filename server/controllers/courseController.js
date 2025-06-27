import Course from '../server/models/Course.js';

// Get all published courses
export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
            .select(['-courseContent', '-enrolledStudents'])
            .populate({ path: 'educator' });

        res.json({ success: true, courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
