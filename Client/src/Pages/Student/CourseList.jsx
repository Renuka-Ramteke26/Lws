import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Searchbar from '../../Components/Student/Searchbar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../Components/Student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../Components/Student/Footer'

const CourseList = () => {
  const { navigate, allcourses } = useContext(AppContext)
  const { input } = useParams()

  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(() => {
    if (!allcourses || allcourses.length === 0) return

    const safeInput = input?.toLowerCase?.() || ''

    const filtered = allcourses.filter(course =>
      course.courseTitle.toLowerCase().includes(safeInput)
    )

    setFilteredCourse(filtered)
  }, [allcourses, input])

  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
        {/* Header */}
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-lg font-semibold text-gray-800'>Course List</h1>
            <p className='text-gray-500'>
              <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/')}>
                Home
              </span>{' '}
              | <span>Course List</span>
            </p>
          </div>
          <Searchbar data={input} />
        </div>

        {/* Search chip */}
        {input && (
          <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8 text-gray-600'>
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="clear"
              className='cursor-pointer'
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        {/* Course Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
          {filteredCourse.length > 0 ? (
            filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500'>
              No courses found matching "<strong>{input}</strong>"
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CourseList
