
import React from 'react';

interface LittleDiggerProps {
  isDigging: boolean;
}

const LittleDigger: React.FC<LittleDiggerProps> = ({ isDigging }) => {
  return (
    <div className={`relative flex flex-col items-center`}>
      {/* 
          We group the entire character body into one container 
          so the animation and alignment are perfectly synchronized.
      */}
      <div className={`flex flex-col items-center ${isDigging ? 'animate-dig-body' : ''}`}>
        
        {/* Hat - Centered */}
        <div className="relative z-30 flex flex-col items-center">
          <div className="w-16 h-8 bg-[#00428d] rounded-t-full border-b-4 border-[#8b0000]"></div>
          <div className="w-20 h-2 bg-[#00428d] rounded-full -mt-1 shadow-sm"></div>
        </div>

        {/* Head - Centered */}
        <div className="relative -mt-2 z-20 flex flex-col items-center">
          {/* Hair background */}
          <div className="absolute top-0 w-16 h-12 bg-[#6b4226] rounded-t-2xl"></div>
          {/* Face */}
          <div className="relative w-14 h-12 bg-[#ffe4d1] rounded-b-2xl flex flex-col items-center pt-3 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-[#6b4226] rounded-b-lg"></div>
            <div className="flex gap-4 mt-2">
              <div className="w-1.5 h-1.5 bg-[#4a2c16] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#4a2c16] rounded-full"></div>
            </div>
            {/* Blushing cheeks */}
            <div className="absolute top-6 left-1 w-3 h-2 bg-pink-300/60 rounded-full blur-[1px]"></div>
            <div className="absolute top-6 right-1 w-3 h-2 bg-pink-300/60 rounded-full blur-[1px]"></div>
            {/* Smile */}
            <div className="w-3 h-2 border-b-2 border-red-400 rounded-full mt-1"></div>
          </div>
        </div>

        {/* Torso - Shifting slightly right to align with the visual center of the head and legs */}
        <div className="relative w-16 h-16 bg-[#00428d] -mt-1 rounded-t-lg z-10 flex flex-col items-center translate-x-1 shadow-sm">
          {/* Collar */}
          <div className="flex -mt-1">
            <div className="w-6 h-3 bg-white border-b border-gray-200 rotate-[15deg] origin-right"></div>
            <div className="w-6 h-3 bg-white border-b border-gray-200 -rotate-[15deg] origin-left"></div>
          </div>
          {/* Uniform Buttons */}
          <div className="grid grid-cols-1 gap-2 mt-4">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_1px_0_rgba(0,0,0,0.1)]"></div>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_1px_0_rgba(0,0,0,0.1)]"></div>
          </div>
        </div>

        {/* Skirt/Belt - Also shifted right to follow torso */}
        <div className="w-16 h-4 bg-[#2c3e50] border-t-2 border-[#1a252f] shadow-sm z-10 translate-x-1"></div>

        {/* Legs - Perfectly centered below the head */}
        <div className="flex gap-4 mt-0.5 z-10">
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-4 bg-[#002b5c] rounded-b-sm"></div>
            <div className="w-6 h-3 bg-[#ced6e0] rounded-full shadow-sm"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-4 bg-[#002b5c] rounded-b-sm"></div>
            <div className="w-6 h-3 bg-[#ced6e0] rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* 
          Arms and Shovel 
          Positioned relative to the whole character, swinging to the right.
      */}
      <div 
        className={`absolute -right-12 top-20 z-40 origin-top-left ${isDigging ? 'animate-shovel' : ''}`}
      >
        <div className="relative flex items-center translate-x-1">
          {/* Shovel Handle */}
          <div className="w-20 h-2.5 bg-[#5d4037] rounded-full shadow-md"></div>
          {/* Shovel Head (Metal part) */}
          <div className="absolute right-[-10px] top-[-10px] w-14 h-16 bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-gray-700 rounded-b-2xl rounded-t-sm shadow-lg"></div>
          
          {/* Hands holding the shovel handle - smooth integration */}
          <div className="absolute left-3 top-[-3px] w-6.5 h-6.5 bg-[#ffe4d1] rounded-full border border-pink-200 shadow-sm z-10"></div>
          <div className="absolute left-11 top-[-3px] w-6.5 h-6.5 bg-[#ffe4d1] rounded-full border border-pink-200 shadow-sm z-10"></div>
          
          {/* Matching Sleeves */}
          <div className="absolute left-1 top-[-15px] w-10 h-12 bg-[#00428d] rounded-lg -z-10 -rotate-15"></div>
          <div className="absolute left-9 top-[-15px] w-10 h-12 bg-[#00428d] rounded-lg -z-10 rotate-15"></div>
        </div>
      </div>
    </div>
  );
};

export default LittleDigger;
