"use client";

import { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          clearInterval(interval);
          alert("Mission accomplished! Take a break.");
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="bg-lime-400 border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
      <h3 className="font-black uppercase text-sm mb-2 italic">Focus Mission</h3>
      
      <div className="text-5xl font-black tabular-nums mb-4 bg-white px-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex gap-2 w-full">
        <button
          onClick={toggleTimer}
          className={`flex-1 font-black uppercase py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all ${
            isActive ? "bg-red-500 text-white" : "bg-white text-black"
          }`}
        >
          {isActive ? "Abort" : "Engage"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-pink-500 text-white p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
        >
          🔄
        </button>
      </div>
    </div>
  );
}