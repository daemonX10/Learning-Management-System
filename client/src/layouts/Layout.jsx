import {AiFillCloseCircle} from 'react-icons/ai'
import {FiMenu} from 'react-icons/fi'
import { useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

import Footer from '../components/Footer'
import { logout } from '../redux/slices/authSlice'

// TODO: CHANGE THE SIDEBAR TO ADVANCE SIDE BAR
function HomeLayout ({ children }) {

const navigate = useNavigate();
const dispatch = useDispatch();

const isLoggedIn = useSelector(state=>state?.auth?.isLoggedIn);
const role = useSelector(state=>state?.auth?.role);

async function onLogout(e){
  e.preventDefault();
  const res = await dispatch(logout());
  if(res?.payload?.success){
    navigate('/');
  }

  // todo:
  navigate('/')
}

  function changeWidth() {
    const drawerSide = document.getElementsByClassName('drawer-side')[0];

    if (window.innerWidth <= 640) { 
      drawerSide.style.width = 'fit'; 
    } else {
      drawerSide.style.width = 'auto';
    }
    drawerSide.style.display = 'block'; // Show the drawer
  }

  function hideDrawer() {
    const element = document.getElementsByClassName('drawer-toggle')[0];
    if (element) {
      element.checked = false;
    }
    const drawerSide = document.getElementsByClassName('drawer-side')[0];
    if (drawerSide) {
      drawerSide.style.display = 'none'; // Hide the drawer
    }
  }

return (

  <div className='min-h-[90vh]'>
    <div className='drawer absolute left-0 z-50 w-full sm:w-2/3'>
      <input type="checkbox" id='my-drawer' className='drawer-toggle' />
      <div className='drawer-content w-full'>
        <label htmlFor="my-drawer">
          <FiMenu onClick={changeWidth} size={"32px"} />
        </label>
      </div>

      {/* Sidebar */}
      <div className='drawer-side w-[280px] sm:w-80' >
        <label htmlFor="my-drawer" className='drawer-overlay'></label>
        <div className='bg-gray-900/95 backdrop-blur-sm h-full border-r border-gray-700'>
          <ul className='menu p-6 w-full h-full text-white relative'>
            {/* Close button */}
            <li className='absolute right-4 top-4 z-50'>
              <button 
                onClick={hideDrawer}
                className='text-gray-400 hover:text-white transition-colors duration-300'
              >
                <AiFillCloseCircle size={28} />
              </button>
            </li>

            {/* Logo/Title */}
            <li className='mb-8 mt-4'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold text-blue-400'>LMS</h2>
                <p className='text-gray-400 text-sm'>Learning Management System</p>
              </div>
            </li>

            {/* Navigation Links */}
            <div className='space-y-2 flex-1'>
              <li>
                <Link 
                  to='/'
                  className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300'
                >
                  <span>🏠</span>
                  <span>Home</span>
                </Link>
              </li>

              {isLoggedIn && role === 'ADMIN' && (
                <>
                  <li>
                    <Link 
                      to='/course/create'
                      className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300'
                    >
                      <span>➕</span>
                      <span>Create Course</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/admin/dashboard'
                      className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300'
                    >
                      <span>📊</span>
                      <span>Admin Dashboard</span>
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link 
                  to='/about'
                  className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300'
                >
                  <span>ℹ️</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  to='/contact'
                  className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300'
                >
                  <span>📞</span>
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  to='/course'
                  className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-300'
                >
                  <span>📚</span>
                  <span>All Courses</span>
                </Link>
              </li>
            </div>

            {/* User Actions */}
            <div className='mt-auto space-y-3'>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link 
                      to='/user/profile'
                      className='block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-center'
                    >
                      👤 Profile
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={onLogout}
                      className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300'
                    >
                      🚪 Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to='/login'
                      className='block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-center'
                    >
                      🔑 Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/signup'
                      className='block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-center'
                    >
                      ✨ Sign Up
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
    
    <div className=''>
      {children}
      <Footer />
    </div>
  </div>
)
}

export default HomeLayout