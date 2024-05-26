import { Outlet } from 'react-router-dom';

const Layout = (props) => {
  return (
    <div className='flex h-screen justify-center bg-colorBg'>
      <Outlet />
    </div>
  );
};

export default Layout;
