import github_icon from '../assets/github-mark-white.png'
import instagram_icon from '../assets/icon-instagram.svg'
import facebook_icon from '../assets/icon-facebook.svg'
import linkedin_icon from '../assets/icons8-linkedin.svg'
const Footer = () => {
    return (
        <div className='flex w-full h-28 gap-4 flex-col flex-1 justify-center items-center bg-slate-700'>
            <p className='text-white text-sm'>Copyright &copy; {new Date().getFullYear()}, All Rights Mounir Charef</p>
            <div className="flex justify-center gap-3">
                <a href="https://www.facebook.com/Chrf.Mounir" target='_blank'>
                    <img src={facebook_icon} alt="fb" className="h-6 hover:opacity-75 transition"/>
                </a>
                <a href="https://www.instagram.com/chrf_mounir/" target='_blank'>
                    <img src={instagram_icon} alt="fb" className="h-6 hover:opacity-75 transition"/>
                </a>
                <a href="https://github.com/lolifmaster" target='_blank'>
                    <img src={github_icon} alt="fb" className="h-6 hover:opacity-75 transition"/>
                </a>
                <a href="https://www.linkedin.com/in/mounir-charef-3397b1229/" target='_blank'>
                    <img src={linkedin_icon} alt="fb" className="h-7 hover:opacity-75 transition"/>
                </a>
            </div>

        </div>
    );
};

export default Footer;
