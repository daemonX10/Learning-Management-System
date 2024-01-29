import aboutMainPage from "../assets/Images/MainImage/aboutMainImage.png"
import apj from "../assets/Images/QuotesPersonalityImage/apj.png"
import billGates from "../assets/Images/QuotesPersonalityImage/billGates.png"
import einstein from "../assets/Images/QuotesPersonalityImage/einstein.png"
import nelsonMandela from "../assets/Images/QuotesPersonalityImage/nelsonMandela.png"
import steveJobs from "../assets/Images/QuotesPersonalityImage/steveJobs.png"
import HomeLayout from "../layouts/Layout"

const AboutUs = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col text-white p-4 md:p-20">
        <div className="flex flex-col md:flex-row items-center gap-10 mx-10">
          <section className="w-full md:w-1/2 scroll-py-10">
            <h1 className="text-5xl text-blue-500 font-semibold">
              Affordable and quality education for all
            </h1>
            <p className="text-xl text-gray-500 pt-4">
              Our goal is to provide the Affordable and quality education for all. We are a team of passionate people whose goal is to improve everyone's life through disruptive products. We build great products to solve your business problems.
            </p>
          </section>

          <div className="w-full md:w-1/2">
            <img src={aboutMainPage}
            alt="about main page"
            className="drop-shadow-2xl"  />
          </div>
        </div>
          
        {/* carousal */}

        <div className="carousel w-full md:w-1/2 my-10 mx-auto">
          <div id="slide1" className="carousel-item relative w-full flex items-center justify-center transition-all duration-300">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img src={apj} className="w-40 rounded-full border-2 border-blue-400" />
              <p className="text-xl text-white text-center"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio officia, eaque rem deleniti non cumque saepe quo repellendus.</p>
              <h3 className="text-2xl font-semibold text-blue-400 ">APJ Abdul Kalam</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide5" className="btn btn-circle">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img src={billGates} className="w-40 rounded-full border-2 border-blue-400" />
              <p className="text-xl text-white text-center"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio officia, eaque rem deleniti non cumque saepe quo repellendus.</p>
              <h3 className="text-2xl font-semibold text-blue-400 ">Bill Gates</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img src={nelsonMandela} className="w-40 rounded-full border-2 border-blue-400" />
              <p className="text-xl text-white text-center"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio officia, eaque rem deleniti non cumque saepe quo repellendus.</p>
              <h3 className="text-2xl font-semibold text-blue-400 ">Nelson Mendela</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide4" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img src={einstein} className="w-40 rounded-full border-2 border-blue-400" />
              <p className="text-xl text-white text-center"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio officia, eaque rem deleniti non cumque saepe quo repellendus.</p>
              <h3 className="text-2xl font-semibold text-blue-400 ">Albert Einstein</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">❮</a>
                <a href="#slide5" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img src={steveJobs} className="w-40 rounded-full border-2 border-blue-400" />
              <p className="text-xl text-white text-center"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio officia, eaque rem deleniti non cumque saepe quo repellendus.</p>
              <h3 className="text-2xl font-semibold text-blue-400 ">Steve Jobs</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default AboutUs