import Footer from '../components/Footer'

function HomeLayout ({ children }) {
  return (
    <div>
        {children}
        <Footer/>
    </div>
  )
}

export default HomeLayout