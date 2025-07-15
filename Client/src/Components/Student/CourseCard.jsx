import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  const rating = calculateRating(course);
  const discountedPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2);

  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => scrollTo(0, 0)}
      className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'
    >
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle || 'Course Thumbnail'}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        <p className='text-gray-500'>{course.educator?.name || 'Unknown Educator'}</p>
        <div className='flex items-center space-x-2 mt-1'>
          <p>{rating}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                alt=""
                className='w-3.5 h-3.5'
              />
            ))}
          </div>
          <p className='text-gray-500'>{course.courseRating?.length || 0}</p>
        </div>
        <p className='text-base font-semibold text-gray-800 mt-2'>
          {currency}
          {discountedPrice}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
