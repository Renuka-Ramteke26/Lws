import Course from '../models/Course.js'; // ✅ Fixed path

// Get all published courses
export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }) // 🔍 Only published courses
      .select('-courseContent -enrolledStudents') // 🧹 Exclude large fields
      .populate({
        path: 'educator',
        select: 'name imageUrl', // 📦 Only necessary educator info
      })
      .lean(); // 🧠 Improves read performance

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
