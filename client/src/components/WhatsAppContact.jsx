
import { BsWhatsapp } from 'react-icons/bs';


const WhatsAppContact = () => {

    const phoneNumber =  import.meta.env.VITE_APP_PHONE_NUMBER;// Replace with your WhatsApp number
    const message = 'Hello, I have a question. I am Here From Your Website LMS';
    const handleWhatsAppClick = () => {
          try {
          const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

          // Attempt to open the link, if it fails, fallback to the web link
          window.location.href = whatsappLink;

          // If the above doesn't work, fallback to the web link
          setTimeout(() => {
            window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
          }, 500);

      } catch (error) {
        return error.response?.data || 'Oops! Something went wrong.';
      }
    };
      
  return (
    <div>
          < BsWhatsapp onClick={handleWhatsAppClick}  />
    </div>
  )
}

export default WhatsAppContact

