"use client";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NavBar() {

  return (
    <div className="flex fixed w-full z-[99] top-0 justify-between items-center bg-white py-4 px-8 border-b border-b-[#EAEBF0]">
      {/* Left-side content */}
      <div>
        <h1 className="hidden text-xl font-bold text-black font-Manrope md:block">
         Welcome!
        </h1>
      </div>
      {/* Right-side content */}
      <div className="flex items-center md:justify-end">
       <NotificationsIcon/>
      </div>
     
    </div>
  );
}
