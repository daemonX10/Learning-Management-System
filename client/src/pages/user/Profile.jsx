import { useDispatch, useSelector } from "react-redux"

import HomeLayout from "../../layouts/Layout"

const Profile = () => {
  
  const userData = useSelector(state => state?.auth);
  const dispatch = useDispatch();
  console.log('userData' , userData);

  return (
    <HomeLayout>
        <div className="min-h-[90vh] flex items-center justify-center">
          <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
            <img src={userData?.data?.avatar?.secure_url} 
            className="w-40 m-auto rounded-full border border-black " />

          </div>

        </div>
    </HomeLayout>
  )
}

export default Profile