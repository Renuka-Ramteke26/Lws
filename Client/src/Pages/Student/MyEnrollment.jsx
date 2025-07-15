import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import { Line } from 'rc-progress'
import Footer from '../../Components/Student/Footer'

const MyEnrollment = () => {
  const { enrolledCourses, calculateCourseduration, navigate } = useContext(AppContext)

  const [progressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 6, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 5, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 4 },
  ])

  return (
    <>
      <div className='md:px-36 px-8 pt-10'>
        <h1 className='text-2xl font-semibold mb-6'>My Enrollments</h1>

        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm border'>
            <thead className='bg-gray-100 text-gray-900 border-b border-gray-300 text-left max-sm:hidden'>
              <tr>
                <th className='px-4 py-3 font-semibold'>Course</th>
                <th className='px-4 py-3 font-semibold'>Duration</th>
                <th className='px-4 py-3 font-semibold'>Completed</th>
                <th className='px-4 py-3 font-semibold'>Status</th>
              </tr>
            </thead>

            <tbody className='text-gray-700'>
              {enrolledCourses.map((course, index) => {
                const progress = progressArray[index] || { lectureCompleted: 0, totalLectures: 1 }
                const percent = (progress.lectureCompleted * 100) / progress.totalLectures

                return (
                  <tr key={course._id || index} className='border-b border-gray-200'>
                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                      <img src={course.courseThumbnail} alt={course.courseTitle} className='w-14 sm:w-24 md:w-28 object-cover rounded' />
                      <div className='flex-1'>
                        <p className='mb-1 max-sm:text-sm font-medium'>{course.courseTitle}</p>
                        <Line
                          percent={percent}
                          strokeWidth={3}
                          strokeColor="#2563EB"
                          trailColor="#E5E7EB"
                          className='rounded-full'
                        />
                      </div>
                    </td>

                    <td className='px-4 py-3 max-sm:hidden'>
                      {calculateCourseduration(course)}
                    </td>

                    <td className='px-4 py-3 max-sm:hidden'>
                      {progress.lectureCompleted} / {progress.totalLectures} <span className='text-gray-400'>Lectures</span>
                    </td>

                    <td className='px-4 py-3 text-right'>
                      <button
                        className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded'
                        onClick={() => navigate('/player/' + course._id)}
                      >
                        {percent === 100 ? 'Completed' : 'On Going'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default MyEnrollment
