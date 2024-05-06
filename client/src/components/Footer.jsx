import { BsGithub, BsLinkedin, BsTwitter} from 'react-icons/bs'

import WhatsAppContact from './WhatsAppContact';

function Footer(){

    const year = new Date().getFullYear();

    return(
        <>
            <footer className="relative left-0 bottom-0 h-[10vh] py-2 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-white bg-gray-800 ">
                <section>
                    Copyright {year} | All right reserved
                </section>

                <section className=" flex items-center justify-center gap-5 text-2xl text-white">
                    <a href="https://www.linkedin.com/in/damodar-yadav-690425177/" className='hover:text-blue-500 transition-all ease-in-out duration-300'>
                        <BsLinkedin />
                    </a>
                    <a href="https://github.com/daemonX10" className='hover:text-blue-500 transition-all ease-in-out duration-300'>
                        <BsGithub />
                    </a>
                    <a href="#" className='hover:text-blue-500 transition-all ease-in-out duration-300'>
                        <BsTwitter />
                    </a>
                    <WhatsAppContact />

                </section>
            </footer>
        </>
    )

}

export default Footer;