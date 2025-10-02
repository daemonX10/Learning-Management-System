import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaPlay, FaPlayCircle, FaPlus, FaTrash, FaEdit, FaBook, FaClock, FaUser } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import HomeLayout from '../../layouts/Layout'
import { deletecourseLecture, getCourseLecture, updateCourseLecture } from '../../redux/slices/lectureSlice';
import { setCurrentLecture } from '../../redux/slices/lectureSlice';


export const AddLectureButton = ({ state, role }) => {
  const navigate = useNavigate();

  return (
    role === 'ADMIN' && (
      <button
        onClick={() => navigate('/course/addLecture', { state })}
        className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
      >
        <FaPlus /> Add Lecture
      </button>
    )
  );
};

const DisplayLecture = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);

    const  { state } = useLocation();
    const { lectures } = useSelector((state)=>state.lecture)
    const { role } = useSelector((state)=>state.auth)
    const currentLecture = useSelector((state)=>state.lecture.currentLecture);

    // Edit lecture modal state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingLecture, setEditingLecture] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        lecture: null
    });

    const handleEditLecture = (lecture) => {
        setEditingLecture(lecture);
        setEditForm({
            title: lecture.title,
            description: lecture.description,
            lecture: null
        });
        setShowEditModal(true);
    };

    const handleEditFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'lecture') {
            setEditForm(prev => ({ ...prev, lecture: files[0] }));
        } else {
            setEditForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editForm.title || !editForm.description) {
            toast.error('Title and description are required');
            return;
        }

        try {
            await dispatch(updateCourseLecture({
                courseId: state._id,
                lectureId: editingLecture._id,
                title: editForm.title,
                description: editForm.description,
                lecture: editForm.lecture
            }));
            setShowEditModal(false);
            setEditingLecture(null);
            setEditForm({ title: '', description: '', lecture: null });
            await dispatch(getCourseLecture(state._id));
        } catch (error) {
            toast.error('Failed to update lecture');
        }
    };

    async function onLectureDelete ( courseId, lectureId){
      if (window.confirm('Are you sure you want to delete this lecture?')) {
        try {
          await dispatch(deletecourseLecture({courseId,lectureId}));
          await dispatch(getCourseLecture(courseId));
          toast.success('Lecture deleted successfully');
        } catch (error) {
          toast.error('Failed to delete lecture');
        }
      }
    }

    const formatTime = (seconds) => {
      if (!seconds) return '0:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(()=>{
        if(!state) {
          navigate('/course');
          return;
        }
        dispatch(getCourseLecture(state._id));
    },[state, dispatch, navigate])

  return (
  <HomeLayout>
    <div className='min-h-[90vh] pt-16 pb-8 px-4 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800'>
      <div className='max-w-7xl mx-auto'>
        {/* Course Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-4xl lg:text-5xl font-bold text-white mb-4'>
            {state?.title}
          </h1>
          <div className='flex items-center justify-center gap-6 text-gray-300'>
            <div className='flex items-center gap-2'>
              <FaUser className='text-blue-400' />
              <span>{state?.createdBy}</span>
            </div>
            <div className='flex items-center gap-2'>
              <FaBook className='text-green-400' />
              <span>{lectures?.length || 0} Lectures</span>
            </div>
            <div className='flex items-center gap-2'>
              <FaClock className='text-yellow-400' />
              <span>Course Duration</span>
            </div>
          </div>
        </div>

        { lectures && lectures.length > 0 ? 
          <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
            {/* Video Player Section */}
            <div className='xl:col-span-2'>
              <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden'>
                <div className='aspect-video bg-black rounded-t-2xl'>
                  <ReactPlayer 
                    url={lectures[currentLecture]?.lecture?.secure_url}
                    controls={true}
                    width='100%'
                    height='100%'
                    playing={isPlaying}
                    onProgress={({ played }) => setPlayed(played)}
                    onDuration={setDuration}
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                          disablePictureInPicture: true
                        }
                      }
                    }}
                  />
                </div>
                
                {/* Video Details */}
                <div className='p-6 space-y-4'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h2 className='text-2xl font-bold text-white mb-2'>
                        Lecture {currentLecture + 1}: {lectures[currentLecture]?.title}
                      </h2>
                      <p className='text-gray-300 leading-relaxed'>
                        {lectures[currentLecture]?.description}
                      </p>
                    </div>
                    {role === 'ADMIN' && (
                      <div className='flex gap-2 ml-4'>
                        <button 
                          onClick={() => handleEditLecture(lectures[currentLecture])}
                          className='p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors duration-300'
                          title='Edit Lecture'
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => onLectureDelete(state._id, lectures[currentLecture]?._id)}
                          className='p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors duration-300'
                          title='Delete Lecture'
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm text-gray-400'>
                      <span>Progress</span>
                      <span>{formatTime(played * duration)} / {formatTime(duration)}</span>
                    </div>
                    <div className='w-full bg-gray-700 rounded-full h-2'>
                      <div 
                        className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                        style={{ width: `${played * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lecture Playlist */}
            <div className='xl:col-span-1'>
              <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden'>
                <div className='bg-gradient-to-r from-blue-600 to-blue-800 p-6'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-bold text-white'>Course Content</h3>
                    <AddLectureButton state={state} role={role} />
                  </div>
                </div>
                
                <div className='max-h-96 lg:max-h-[500px] overflow-y-auto'>
                  {lectures.map((lecture, idx) => (
                    <div
                      key={lecture._id}
                      className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/5 ${
                        currentLecture === idx ? 'bg-blue-600/20 border-l-4 border-l-blue-400' : ''
                      }`}
                      onClick={() => { 
                        dispatch(setCurrentLecture(idx));
                        setIsPlaying(false);
                      }}
                    >
                      <div className='flex items-start gap-3'>
                        <div className='flex-shrink-0 mt-1'>
                          {currentLecture === idx ? (
                            <FaPlayCircle className='text-blue-400 text-lg' />
                          ) : (
                            <FaPlay className='text-gray-400 text-sm' />
                          )}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='font-semibold text-white text-sm mb-1 line-clamp-2'>
                            Lecture {idx + 1}: {lecture.title}
                          </p>
                          <p className='text-gray-400 text-xs line-clamp-2'>
                            {lecture.description}
                          </p>
                        </div>
                        {role === 'ADMIN' && (
                          <div className='flex gap-1'>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditLecture(lecture);
                              }}
                              className='flex-shrink-0 p-1 text-green-400 hover:text-green-300 transition-colors duration-300'
                              title='Edit Lecture'
                            >
                              <FaEdit className='text-xs' />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onLectureDelete(state._id, lecture._id);
                              }}
                              className='flex-shrink-0 p-1 text-red-400 hover:text-red-300 transition-colors duration-300'
                              title='Delete Lecture'
                            >
                              <FaTrash className='text-xs' />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          : 
          <div className='text-center py-16'>
            <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-12 max-w-md mx-auto'>
              <div className='w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6'>
                <FaBook className='text-4xl text-gray-400' />
              </div>
              <h2 className='text-3xl font-bold text-white mb-4'>No Lectures Available</h2>
              <p className='text-gray-300 mb-8'>
                This course doesn't have any lectures yet. 
                {role === 'ADMIN' ? ' Start by adding the first lecture.' : ' Check back later for updates.'}
              </p>
              <AddLectureButton state={state} role={role} />
            </div>
          </div>
        }
      </div>
    </div>

    {/* Edit Lecture Modal */}
    {showEditModal && (
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
        <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-white'>Edit Lecture</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className='p-2 text-gray-400 hover:text-white transition-colors duration-300'
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className='space-y-4'>
              <div>
                <label htmlFor='edit-title' className='block text-sm font-medium text-gray-300 mb-2'>
                  Lecture Title *
                </label>
                <input
                  type='text'
                  id='edit-title'
                  name='title'
                  value={editForm.title}
                  onChange={handleEditFormChange}
                  className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Enter lecture title'
                  required
                />
              </div>

              <div>
                <label htmlFor='edit-description' className='block text-sm font-medium text-gray-300 mb-2'>
                  Description *
                </label>
                <textarea
                  id='edit-description'
                  name='description'
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  rows='4'
                  className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                  placeholder='Enter lecture description'
                  required
                />
              </div>

              <div>
                <label htmlFor='edit-video' className='block text-sm font-medium text-gray-300 mb-2'>
                  Update Video (Optional)
                </label>
                <div className='border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-white/40 transition-colors duration-300'>
                  <FaUpload className='mx-auto h-8 w-8 text-gray-400 mb-2' />
                  <p className='text-gray-300 text-sm mb-2'>Choose new video file</p>
                  <input
                    type='file'
                    id='edit-video'
                    name='lecture'
                    onChange={handleEditFormChange}
                    accept='video/*'
                    className='hidden'
                  />
                  <label
                    htmlFor='edit-video'
                    className='cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300'
                  >
                    Select Video
                  </label>
                  {editForm.lecture && (
                    <p className='text-green-400 text-xs mt-2'>
                      Selected: {editForm.lecture.name}
                    </p>
                  )}
                </div>
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setShowEditModal(false)}
                  className='flex-1 py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-300'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300'
                >
                  Update Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </HomeLayout>
  )
}

export default DisplayLecture