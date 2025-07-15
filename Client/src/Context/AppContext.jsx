import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration';
import { useAuth , useUser } from '@clerk/clerk-react';


export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;


   const [allCourses, setAllCourses] = useState([]); // ✅ update here

    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses ,setEnrolledCourses] = useState([]);
    
    
    const navigate = useNavigate();

    const {getToken} =useAuth()
    const {user} =useUser()

    

    const fetchAllCourses = async () => {
        // In a real app, you'd fetch from an API. Here it's static:
        
        setAllCourses(dummyCourses);
    };
//calculate average rating
    const calculateRating = (course) => {
    const ratings = course.courseRating || [];
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    return total / ratings.length;
};


//calculate course chapter time
 const calculateChapterTime = (chapter)=>{
    let time =0 
    chapter.chapterContent.map((lecture)=> time+= lecture.lectureDuration)
    return humanizeDuration(time * 60 * 1000 , {units : ["h" ,"m"]})
 }

 //calculate total duration of course
 const calculateCourseduration = (course)=>{
    let time =0 

     course.courseContent.forEach((chapter) =>
    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration;
    })
  );
    return humanizeDuration(time * 60 * 1000 , {units : ["h" ,"m"]})

 }

 // calculate no. of lectures in the course
 const calculateNoOfLectures = (course)=>{
    let totalLectures =0 ;
    course.courseContent.forEach(chapter =>{
        if (Array.isArray(chapter.chapterContent)){
            totalLectures +=chapter.chapterContent.length
        }
    });
    return totalLectures;
 }

//fetch user enrolled coureses
const fetchUserEnrolledCourses = async ()=>{
    setEnrolledCourses(dummyCourses)
}

useEffect(()=>{
    fetchAllCourses()
    fetchUserEnrolledCourses()
},[])

 const logToken = async ()=>{
    console.log(await getToken());
 }
useEffect(()=>{
    if(user){
        logToken()
    }
},[user])


    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,isEducator,setIsEducator,
        calculateChapterTime ,calculateNoOfLectures,calculateCourseduration,
        fetchUserEnrolledCourses,enrolledCourses
        
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
