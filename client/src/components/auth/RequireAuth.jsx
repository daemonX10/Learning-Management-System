import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({allowedRoles}) => {
    
    const  { isLoggedIn , role } = useSelector((state) => state.auth);

    console.log("isLoggedIn",isLoggedIn,"role",role)
    console.log("allowedRoles",allowedRoles)

  return isLoggedIn && allowedRoles.find((myrole)=>myrole=== role) ? (
    <Outlet />
  ) : isLoggedIn ? 
  (<Navigate to="/denied" />) : (<Navigate to="/login" />)
  
}

export default RequireAuth

