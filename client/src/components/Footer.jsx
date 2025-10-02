import { BsGithub, BsLinkedin, BsTwitter} from 'react-icons/bs'

import WhatsAppContact from './WhatsAppContact';

function Footer(){

    const year = new Date().getFullYear();

    return(
        <>
            <footer className="relative left-0 bottom-0 bg-gray-900 border-t border-gray-700">
                <div className="py-6 px-4 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <section className="text-gray-300 text-sm">
                            <p>© {year} Learning Management System. All rights reserved.</p>
                        </section>

                        <section className="flex items-center justify-center gap-6">
                            <a 
                                href="https://www.linkedin.com/in/damodar-yadav-690425177/" 
                                className='text-gray-400 hover:text-blue-400 transition-all ease-in-out duration-300 transform hover:scale-110'
                                aria-label="LinkedIn Profile"
                            >
                                <BsLinkedin className="text-xl" />
                            </a>
                            <a 
                                href="https://github.com/daemonX10" 
                                className='text-gray-400 hover:text-gray-200 transition-all ease-in-out duration-300 transform hover:scale-110'
                                aria-label="GitHub Profile"
                            >
                                <BsGithub className="text-xl" />
                            </a>
                            <a 
                                href="#" 
                                className='text-gray-400 hover:text-blue-300 transition-all ease-in-out duration-300 transform hover:scale-110'
                                aria-label="Twitter Profile"
                            >
                                <BsTwitter className="text-xl" />
                            </a>
                            <div className="transform hover:scale-110 transition-transform duration-300">
                                <WhatsAppContact />
                            </div>
                        </section>
                    </div>
                </div>
            </footer>
        </>
    )

}

export default Footer;