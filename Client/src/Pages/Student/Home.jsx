import React from 'react'
import Hero from '../../Components/Student/Hero'
import CourseSection from '../../Components/Student/CourseSection'
import Companies from '../../Components/Student/Companies'
import TestimonialSection from '../../Components/Student/TestimonialSection'
import Footer from '../../Components/Student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-centerspace-y-7 text-center'>
     <Hero />
     <Companies />
     <CourseSection />
     <TestimonialSection/>
     <Footer/>

    </div>
  )
}

export default Home
