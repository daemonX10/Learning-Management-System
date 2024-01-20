import GoBack from "../components/Button/GoBack"

const NotFound = () => {

  return (
      <GoBack errorCode={404} message="Not Found Page" />
  )
}

export default NotFound