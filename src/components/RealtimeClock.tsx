import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const RealtimeClock: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(time);

  const formattedTime = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(time);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 font-mono text-xs font-black bg-[#FFFFFF] border-2 border-[#000000] px-2.5 py-1 shadow-[2px_2px_0px_#000000]">
        <Clock className="w-3.5 h-3.5 text-[#000000] animate-pulse" />
        <span>{formattedTime}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border-2 sm:border-3 border-[#000000] px-3 py-1.5 shadow-[2.5px_2.5px_0px_#000000] select-none">
      <div className="w-2.5 h-2.5 bg-emerald-500 border border-black rounded-full animate-ping" />
      <Clock className="w-4 h-4 text-[#000000] stroke-[2.5]" />
      <div className="font-mono text-xs sm:text-sm font-black text-[#000000] flex items-center gap-2">
        <span className="hidden sm:inline">{formattedDate}</span>
        <span className="hidden sm:inline text-gray-400">·</span>
        <span className="bg-[#FDE047] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000000] tracking-wider">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};
