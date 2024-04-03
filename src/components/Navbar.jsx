import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{ color }} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />
        {icon}
    </button>
  </TooltipComponent>
)

//TODo move this in hooks folder
const getWinDimensions = hasWindow => {
  return {
      width: hasWindow ? window.innerWidth : 0,
      height: hasWindow ? window.innerHeight : 0,
  };
};

export const useWindowSize = () => {
  const hasWindow = typeof window !== 'undefined';
  const [winDimensions, setWinDimensions] = useState(getWinDimensions(hasWindow));

  useEffect(() => {
      const handleResize = () => setWinDimensions(getWinDimensions(hasWindow));

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
  }, [hasWindow]);

  return winDimensions;
};



const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize } = useStateContext();
  
  const { width } = useWindowSize();
  console.log("Width from Navbar",width);
  // useEffect(() => {
  //   const handleResize = () => setScreenSize(window.innerWidth);

  //   window.addEventListener('resize', handleResize);

  //   handleResize();

  //   return () => window.removeEventListener('resize', handleResize)
  // }, []);

  // useEffect(() => {
    if(width <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  // }, [screenSize]);

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton
        title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color="blue" icon={<AiOutlineMenu />}
      />
      <div className='flex'>
        <NavButton
          title="cart" customFunc={() => handleClick('cart')} color="blue" icon={<FiShoppingCart />}
        />
        <NavButton
          title="chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color="blue" icon={<BsChatLeft />}
        />
        <NavButton
          title="notifications" dotColor="#03C9D7" customFunc={() => handleClick('notification')} color="blue" icon={<RiNotification3Line />}
        />
        <TooltipComponent content="profile" position='BottomCenter'
        >
          <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
          onClick={() => handleClick('userProfile')}>
            <img className='rounded-full w-8 h-8' src={avatar} />
            <p>
              <span className='text-grey-400 text-14'>Hi, </span> {' '}
              <span className='text-grey-400 font-bold ml-1 text-14'>Michael</span>
            </p>
            <MdKeyboardArrowDown className='text-grey-400 text-14' />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar