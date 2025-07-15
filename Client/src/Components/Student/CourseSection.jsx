import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import CourseCard from './CourseCard';

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>
        Discover our top rated courses across various categories. From coding <br />
        and design to business and wellness, our courses are crafted to deliver results.
      </p>

      <div
        className='grid gap-4 px-4 md:px-0 md:my-16 my-10'
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', display: 'grid' }}
      >
        {Array.isArray(allCourses) &&
          allCourses.slice(0, 4).map((course) => (
            <CourseCard key={course._id || course.id} course={course} />
          ))}
      </div>

      <Link
        to='/course-list'
        onClick={() => scrollTo(0, 0)}
        className='text-gray-600 border border-gray-300 px-6 py-2 mt-4 inline-block rounded hover:bg-gray-100 transition-all duration-200'
      >
        Show all Courses
      </Link>
    </div>
  );
};

export default CourseSection;
