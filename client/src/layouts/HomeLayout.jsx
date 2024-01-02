import {AiFillCloseCircle} from 'react-icons/ai'
import {FiMenu} from 'react-icons/fi'
import {Link} from 'react-router-dom'

import Footer from '../components/Footer'

function HomeLayout ({ children }) {
    function changeWidth(){
      const drawerSide = document.getElementsByClassName('drawer-side');
      drawerSide[0].style.width = 'auto';
    }

    function hideDrawer (){
      const element = document.getElementById('my-drawer');
    }


  return (

    <div className='min-h-[90vh]'>
      <div className='drawer absolute left-0 z-50 w-full'>
        <input type="checkbox" id='my-drawer' className='drawer-toggle' />
        <div className='drawer-content'>
          <label htmlFor="my-drawer">
            <FiMenu onClick={changeWidth} size={"32px"} />
          </label>
        </div>
        <div className='drawer-side w-0'>
          <label htmlFor="my-drawer" className='drawer-overlay'>hhhh</label>
          <ul className='menu p-4 w-0 sm:w-80 bg-base-200 relative'>
            <li className='w-fit absolute right-2 z-50'>
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'> About Us</Link>
            </li>
            <li>
              <Link to='/contact'>Contact us</Link>
            </li>
            <li>
              <Link to='/courses'>All Courses</Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default HomeLayout