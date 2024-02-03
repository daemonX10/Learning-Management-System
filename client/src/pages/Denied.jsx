

import GoBack from "../components/Button/GoBack"

const Denied = () => {

  return (
    <GoBack errorCode={403} message="Access Denied"  />
  )
}

export default Denied