import { Outlet } from 'react-router-dom';
import BlueLaptop from '../../assets/image/login/blue_laptop.jpg';
import DarkPurple from '../../assets/image/login/dark_purple.jpg';
import GreyLaptop from '../../assets/image/login/grey_laptop.jpg';
import PurpleBlue from '../../assets/image/login/purple_blue.jpg';
import PurpleLaptop from '../../assets/image/login/purple_laptop.jpg';
import RedLaptop from '../../assets/image/login/red_laptop.jpg';
import BlackLaptop from '../../assets/image/login/black_laptop.jpg';
import BlackDesk from '../../assets/image/login/black_desk_1.jpg';

const Layout = (props) => {
  return (
    <div className='flex h-screen'>
      <img className="object-cover" style={{width: '55%'}} src={BlackDesk} />
      <div style={{width: '45%'}}>
        <Outlet />
      </div>
    </div>

  );
};

export default Layout;
