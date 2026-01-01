
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Info, Coins, Trophy, Zap } from 'lucide-react';
import MoneyTree from './components/MoneyTree';
import LittleDigger from './components/LittleDigger';
import { calculateRatePerSecond, formatCurrency, formatTimeHighPrecision } from './utils/economy';
import { Coin } from './types';

const App: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [money, setMoney] = useState(0);
  const [hourlyWage, setHourlyWage] = useState(100);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [quote, setQuote] = useState("设定你的时薪，让专注变得有价值。");
  const [isTabVisible, setIsTabVisible] = useState(true);

  const lastUpdateRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const coinIdCounter = useRef(0);
  const lastCoinBurstRef = useRef<number>(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const spawnCoinBurst = () => {
    const numCoins = Math.floor(Math.random() * 6) + 6;
    const newBurst: Coin[] = [];
    for (let i = 0; i < numCoins; i++) {
      const id = coinIdCounter.current++;
      // Toss coins toward the gold pile on the right
      const xFinal = 140 + Math.random() * 160; 
      const yFinal = 10 + Math.random() * 30; 
      const xMid = xFinal * 0.5;
      const yMid = -120 - Math.random() * 50; 

      newBurst.push({ id, x: xFinal, y: yFinal, xMid, yMid });
      setTimeout(() => {
        setCoins(prev => prev.filter(c => c.id !== id));
      }, 700); // Matches CSS animation duration
    }
    setCoins(prev => [...prev, ...newBurst]);
  };

  const update = (time: number) => {
    if (!lastUpdateRef.current) lastUpdateRef.current = time;
    const deltaTime = (time - lastUpdateRef.current) / 1000;
    lastUpdateRef.current = time;

    if (isActive && isTabVisible) {
      setElapsedSeconds(prev => {
        const next = prev + deltaTime;
        
        // Update money based on integrated rate
        setMoney(m => {
          const currentRate = calculateRatePerSecond(next, hourlyWage);
          return m + (currentRate * deltaTime);
        });

        // Trigger burst every 800ms to match the shovel animation cycle
        if (time - lastCoinBurstRef.current > 800) {
          lastCoinBurstRef.current = time;
          spawnCoinBurst();
        }

        return next;
      });
    }

    frameRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    frameRef.current = requestAnimationFrame(update);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isActive, isTabVisible, hourlyWage]);

  const handleToggle = () => {
    const newActive = !isActive;
    setIsActive(newActive);
    if (newActive) {
      lastUpdateRef.current = performance.now();
      lastCoinBurstRef.current = performance.now();
      spawnCoinBurst(); // Instant burst on start
      setQuote("复利引擎已启动！每一秒都在积累你的财富。");
    }
  };

  const handleReset = () => {
    if (window.confirm("确定要重置专注进度吗？")) {
      setIsActive(false);
      setElapsedSeconds(0);
      setMoney(0);
      lastUpdateRef.current = null;
    }
  };

  const growthScale = elapsedSeconds / 1800;
  const mountainScale = 0.35 + Math.min(money / (hourlyWage * 2 || 1), 4.0);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#F7F9F2]">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-400/5 rounded-full blur-[150px]"></div>
      </div>

      {/* ENLARGED HUD - Top Right */}
      <div className="absolute top-6 right-6 flex flex-col space-y-4 z-50 w-full max-w-sm md:max-w-md">
        
        {/* Focus Time Card - ALL GREEN */}
        <div className="bg-emerald-600 px-8 py-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(5,150,105,0.3)] border-b-8 border-emerald-800 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Trophy size={100} color="white" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-emerald-100 uppercase tracking-[0.2em]">专注时长</span>
            </div>
            <div className="text-5xl md:text-7xl font-game font-bold text-white tabular-nums tracking-tight drop-shadow-sm">
              {formatTimeHighPrecision(elapsedSeconds)}
            </div>
          </div>
        </div>

        {/* Wealth Amount Card - GOLDEN */}
        <div className="bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600 px-8 py-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(180,120,0,0.3)] border-b-8 border-amber-800 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:rotate-12 transition-transform">
            <Coins size={80} color="white" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={12} className="text-yellow-100 fill-current" />
              <span className="text-[10px] font-black text-yellow-100 uppercase tracking-[0.2em]">财富金额</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-amber-900">₿</span>
              <span className="text-4xl md:text-6xl font-game font-bold text-white tabular-nums truncate drop-shadow-md">
                {formatCurrency(money)}
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[sweep_3s_infinite] skew-x-12"></div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="absolute top-6 left-6 max-w-xs z-40">
        <div className="bg-white/95 backdrop-blur-md px-6 py-5 rounded-[2rem] shadow-xl border-l-[12px] border-emerald-600">
          <p className="text-sm md:text-base text-gray-700 font-bold leading-relaxed italic">
            "{quote}"
          </p>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="relative flex flex-col items-center justify-end w-full max-w-5xl h-[70vh]">
        <div className="mb-24 z-10">
          <MoneyTree growthScale={growthScale} />
        </div>

        <div className="relative w-full h-40 bg-[#3E2723]/5 rounded-t-[200px] border-t-8 border-[#5D4037]/10 flex justify-center">
          <div className="absolute -top-6 w-64 h-24 bg-[#2D1B18] rounded-full border-4 border-[#1B1110] shadow-inner"></div>
          
          <div className="absolute -top-28 right-[10%] transition-all duration-1000 origin-bottom z-10" style={{ transform: `scale(${mountainScale})` }}>
             <div className="relative gold-shine">
                <div className="w-48 h-32 bg-gradient-to-t from-amber-600 via-yellow-500 to-yellow-300 rounded-t-full border-t-4 border-yellow-200 shadow-2xl"></div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-lg animate-pulse">✨</div>
             </div>
          </div>

          <div className="absolute -top-48 left-1/2 -translate-x-48 z-30">
            <LittleDigger isDigging={isActive && isTabVisible} />
          </div>

          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-4 flex justify-center z-40 pointer-events-none">
            {coins.map(coin => (
              <div key={coin.id} className="absolute coin-particle" style={{ '--tw-translate-x': `${coin.x}px`, '--tw-translate-y': `${coin.y}px` } as any}>
                <div className="w-6 h-6 bg-yellow-400 border-2 border-yellow-600 rounded-full flex items-center justify-center font-bold text-[10px] shadow-lg text-yellow-900 ring-1 ring-yellow-200">₿</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="mt-8 flex flex-col items-center space-y-6 z-50">
        <div className="flex items-center space-x-6">
          <div className="bg-white rounded-[1.5rem] p-5 shadow-2xl border border-gray-100 flex items-center space-x-4 transform transition-hover hover:scale-105">
             <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Coins className="text-yellow-600" size={28} />
             </div>
             <div className="flex flex-col">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">注意力时薪</label>
               <input 
                type="number" 
                value={hourlyWage}
                disabled={isActive}
                onChange={(e) => setHourlyWage(Math.max(1, Number(e.target.value)))}
                className="w-24 bg-transparent text-2xl font-black text-gray-800 focus:outline-none border-b-2 border-transparent focus:border-yellow-400 transition-colors"
               />
             </div>
          </div>

          <button onClick={handleReset} className="p-6 bg-white hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-full shadow-2xl transition-all border border-gray-50 active:scale-90">
            <RefreshCw size={32} />
          </button>
          
          <button 
            onClick={handleToggle} 
            className={`flex items-center space-x-4 px-16 py-8 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all active:scale-95 text-white font-black text-2xl tracking-wide ${isActive ? 'bg-gradient-to-r from-orange-500 to-red-600 ring-4 ring-orange-200' : 'bg-gradient-to-r from-emerald-500 to-green-700 ring-4 ring-emerald-100'}`}
          >
            {isActive ? <><Pause size={36} fill="currentColor" /><span>暂停休息</span></> : <><Play size={36} fill="currentColor" /><span>开始专注</span></>}
          </button>

          <button 
            className="p-6 bg-white text-emerald-700 rounded-full shadow-2xl border border-emerald-50 active:scale-90" 
            onClick={() => alert("系统说明：\n1. 设定的‘时薪’是你认为你专注力的价值。\n2. 前30分钟为积累期，收益低于时薪，随后触发复利爆炸。\n3. 当前显示精度已调整为标准计时与货币格式。")}
          >
            <Info size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
