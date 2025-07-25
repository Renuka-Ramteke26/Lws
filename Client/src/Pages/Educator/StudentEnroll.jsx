import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';

const StudentEnroll = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  return enrolledStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
        <div className='w-full overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold'>Student Name</th>
                <th className='px-4 py-3 font-semibold'>Course Title</th>
                <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Date</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {enrolledStudents.map((item, index) => (
                <tr key={item.id || index} className='border-b border-gray-500/20'>
                  <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                    <img
                      src={item.student?.imageUrl}
                      alt='Student avatar'
                      className='w-9 h-9 rounded-full object-cover'
                    />
                    <span className='truncate'>{item.student?.name || 'Unknown'}</span>
                  </td>
                  <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                  <td className='px-4 py-3 hidden sm:table-cell'>
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center text-lg text-gray-500'>
      Loading...
    </div>
  );
};

export default StudentEnroll;
