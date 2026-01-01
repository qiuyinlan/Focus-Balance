
import React from 'react';

interface MoneyTreeProps {
  growthScale: number; // 0 to 1+
}

const MoneyTree: React.FC<MoneyTreeProps> = ({ growthScale }) => {
  // Static scale for stability
  const baseScale = 1.2;
  
  // Calculate counts based on growth, ensuring a rich look even at early stages
  const hangingCoinCount = Math.min(Math.floor(growthScale * 60) + 15, 120);

  return (
    <div className="relative flex flex-col items-center origin-bottom" style={{ transform: `scale(${baseScale})` }}>
      
      {/* Lush Green Canopy */}
      <div className="relative z-20">
        {/* Main large rounded leaf blobs to form a classic centered tree shape */}
        {/* Left Side */}
        <div className="absolute -top-64 -left-36 w-72 h-72 bg-[#2E7D32] rounded-full border-4 border-[#1B5E20] shadow-xl"></div>
        {/* Center Side */}
        <div className="absolute -top-72 -left-12 w-64 h-64 bg-[#388E3C] rounded-full border-4 border-[#1B5E20] shadow-xl"></div>
        {/* Small Far-Left Accent */}
        <div className="absolute -top-48 -left-52 w-48 h-48 bg-[#1B5E20] rounded-full border-4 border-[#0D3B0D] shadow-lg"></div>
        
        {/* Removed right foliage circles (left-20 and left-36) as requested */}
        
        {/* Dense Hanging Coins with Chains */}
        {Array.from({ length: hangingCoinCount }).map((_, i) => {
          // Constrained placement to stay within the foliage boundaries (-60 to +40 left, -200 to -40 top)
          // This prevents coins from appearing 'floating' on the top left
          const leftOffset = -70 + (i * 31) % 130;
          const topOffset = -180 + (i * 47) % 120;
          const chainHeight = 25 + (i * 19) % 70;
          
          return (
            <div 
              key={`static-hanging-coin-${i}`}
              className="absolute flex flex-col items-center"
              style={{
                top: `${topOffset}px`,
                left: `${leftOffset}px`,
                zIndex: 25
              }}
            >
              {/* Thin Golden Chain */}
              <div className="w-[1px] bg-yellow-600/50" style={{ height: `${chainHeight}px` }}></div>
              {/* Shiny Gold Coin */}
              <div className="w-5 h-5 bg-gradient-to-tr from-yellow-600 to-yellow-300 border-2 border-yellow-700 rounded-full flex items-center justify-center text-[10px] font-bold text-yellow-900 shadow-md ring-1 ring-yellow-200">
                ₿
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Simple, Solid Tree Trunk */}
      <div className="relative z-10">
        <div className="w-16 h-40 bg-gradient-to-r from-[#5D4037] to-[#3E2723] rounded-b-lg border-x-4 border-[#2D1B18]">
          {/* Bark Details */}
          <div className="absolute top-4 left-4 w-1 h-20 bg-black/10 rounded-full"></div>
          <div className="absolute top-10 right-4 w-1 h-24 bg-black/10 rounded-full"></div>
        </div>
        
        {/* Roots and Gold at the base */}
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-48 h-10 flex justify-center items-end gap-[-5px]">
            <div className="w-16 h-10 bg-[#5D4037] rounded-full -translate-x-4"></div>
            <div className="w-16 h-10 bg-[#3E2723] rounded-full translate-x-4"></div>
            {/* Base Gold Piles */}
            <div className="absolute bottom-0 w-24 h-8 bg-yellow-500 rounded-t-full border-t-2 border-yellow-600 z-30 shadow-lg"></div>
        </div>
      </div>
      
      {/* Tree Shadow */}
      <div className="w-80 h-10 bg-black/5 rounded-full blur-xl -mt-2"></div>
    </div>
  );
};

export default MoneyTree;
