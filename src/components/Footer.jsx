import logoLight from '../assets/logo_dark.png'; 
import logoDark from '../assets/logo.png'; 
import mailDark from '../assets/mail_icon_dark.png';
import mailLight from '../assets/mail_icon.png';
import { useTheme } from '../hooks/useTheme';

const Footer = () => {
  const { theme } = useTheme();
  const iconMail = theme === 'dark' ? mailDark : mailLight;
  const logoSrc = theme === 'dark' ?  logoLight  : logoDark;

  return (
    <div
      className={` pt-10 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <div className='text-center'>
        <img
          src={logoSrc}
          alt='logo'
          className='w-36 mx-auto mb-2'
        />

        <div className='w-max flex items-center mx-auto gap-2'>
          <img src={iconMail} alt='mail' className='w-6' />
          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
            wisnuiben21@gmail.com
          </span>
        </div>
      </div>

      <div
        className={`text-center sm:flex items-center justify-between border-t mx-[10%] mt-10 py-6 ${
          theme === 'dark'
            ? 'border-gray-700 text-gray-300'
            : 'border-gray-400 text-gray-800'
        }`}
      >
        <p>@ 2025 Wisnu Ibnu. All right reserved.</p>
        <ul className='flex gap-10 mt-4 items-center justify-center sm:mt-0'>
          <li>
            <a
              target='_blank'
              href='https://github.com/WisnuIbnu'
              rel='noopener noreferrer'
            >
              Github
            </a>
          </li>
          <li>
            <a
              target='_blank'
              href='https://linkedin.com/in/WisnuIbnu'
              rel='noopener noreferrer'
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              target='_blank'
              href='https://x.com/WisnuIbnu'
              rel='noopener noreferrer'
            >
              X
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;