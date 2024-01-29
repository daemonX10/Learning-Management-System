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

      {/* Carousel */}
      <div className='drawer-side w-[50vw] bg-transparent sm:w-full' >
        <label htmlFor="my-drawer" className='drawer-overlay'></label>
        <ul className='menu p-4 w-fit h-[100%] sm:w-80 bg-base-200 relative'>
          <li className='w-fit absolute right-2 z-50'>
            <button onClick={hideDrawer}>
              <AiFillCloseCircle size={24} />
            </button>
          </li>
          <li>
            <Link to='/'>Home</Link>
          </li>

          {isLoggedIn && role === 'ADMIN' && (
            <li>
              <Link to='/course/create'>Create Course</Link>
            </li>
          )}

          {isLoggedIn && role === 'ADMIN' && (
            <li>
              <Link to='/admin/dashboard'>Admin DashBoard</Link>
            </li>
          )}

          <li>
            <Link to='/about'> About Us</Link>
          </li>
          <li>
            <Link to='/contact'>Contact us</Link>
          </li>
          <li>
            <Link to='/course'>All Courses</Link>
          </li>

          { isLoggedIn ? (
              <li className='absolute bottom-4 w-[90%]'>
                <div className="w-full flex flex-col sm:flex-row items-center justify-center">
                  <button className='bg-pink-600 btn-primary px-4 py-1 font-semibold rounded-md w-full '><Link to={'/user/profile'}>Profile</Link></button>
                  <button className='bg-blue-600 btn-primary px-4 py-1 font-semibold rounded-md w-full '><Link onClick={onLogout}>Logout</Link></button>
                </div>
              </li>)
              : (
              <li className='absolute bottom-4 w-[90%]'>
                <div className=" w-full flex flex-col sm:flex-row items-center justify-center ">
                  <button className=' bg-pink-600 btn-primary px-4 py-1 font-semibold rounded-md w-full ' ><Link to={'/login'}>Login</Link></button>
                  <button className='btn-primary bg-blue-600 px-4 py-1 font-semibold rounded-md w-full '><Link to={'/signup'}>SignUP</Link></button>
                </div>
              </li>
              )
          }
        </ul>
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