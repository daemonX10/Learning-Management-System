import { useEffect } from 'react';
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import HomeLayout from '../../layouts/Layout'
import { deletecourseLecture, getCourseLecture } from '../../redux/slices/lectureSlice';
import { setCurrentLecture } from '../../redux/slices/lectureSlice';


export const AddLectureButton = ({ state, role }) => {
  const navigate = useNavigate();

  return (
    role === 'ADMIN' && (
      <button
        onClick={() => navigate('/course/addLecture', { state })} // state is the course details is passed to the AddLecture component
        className='px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white'
      >
        Add Lecture
      </button>
    )
  );
};

const DisplayLecture = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const  { state } = useLocation();
    const { lectures } = useSelector((state)=>state.lecture)

    const { role } = useSelector((state)=>state.auth)

    const currentLecture = useSelector((state)=>state.lecture.currentLecture);

    async function onLectureDelete ( courseId, lectureId){
      console.log('deleteThunk')
        await dispatch(deletecourseLecture({courseId,lectureId}));
        await dispatch(getCourseLecture(courseId));
    }

    useEffect(()=>{
        if(!state) navigate('/courses')
        dispatch(getCourseLecture(state._id));
    },[])

  return (
  <HomeLayout>
    <div className='flex flex-col items-center justify-center min-h-screen py-10 bg-gray-900 text-white'>
      <h1 className='text-4xl font-bold mb-10'>
        Course Name : {state?.title}
      </h1>
      { lectures && lectures.length > 0 ? 
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-7xl'>
          <div className='flex flex-col space-y-5 p-5 rounded-lg shadow-lg bg-gray-800'>
            <ReactPlayer 
              url={lectures[currentLecture]?.lecture?.secure_url}
              controls={true}
              width='100%'
              height='100%'
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                    disablePictureInPicture: true
                  }
                }
              }}
            />
            <h1 className='text-2xl font-semibold'>
              <span className='text-gray-400'>Title : </span>
              {lectures[currentLecture]?.title}
            </h1>
            <p className='text-lg'>
              <span className='text-gray-400'>Description : </span>
              {lectures[currentLecture]?.description}
            </p>
          </div>
          <ul className='flex flex-col space-y-5 p-5 rounded-lg shadow-lg bg-gray-800 text-white'>
            <li className='flex justify-between items-center text-2xl font-semibold'>
              Lecture List
              <AddLectureButton state={state} role={role} />
            </li>
            <div className='max-h-[500px] overflow-auto'>
                {
                  lectures.map((lecture, idx) => {
                    return (
                      <li className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${currentLecture === idx ? 'bg-gray-700' : 'bg-gray-600'}`} key={lecture._id}>
                        <p className='cursor-pointer' onClick={() => { dispatch(setCurrentLecture(idx)) }} >
                          <span className='font-bold text-gray-300'>Lecture {idx + 1} : </span> {lecture.title}
                        </p>
                        {
                          role === 'ADMIN' && (
                            <button
                              onClick={() => onLectureDelete(state._id, lecture._id)}
                              className='px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white'
                            >
                              Delete
                            </button>
                          )
                        }
                      </li>
                    )
                  })
                }
            </div>
          </ul>
        </div>
        : 
        <div className='flex-col justify-center items-center space-y-4'>
          <h1 className='text-4xl font-bold'>
            No Lectures
          </h1>
            <li className='space-x-2 w-[22rem] flex justify-between items-center text-2xl font-semibold bg-gray-700 p-4 rounded-md shadow'>
              Lecture List
              <AddLectureButton state={state} role={role} />
            </li>
        </div> }
    </div>
  </HomeLayout>
  )
}

export default DisplayLecture