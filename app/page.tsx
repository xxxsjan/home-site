"use client"
import React, { useState, useEffect } from 'react';

import {
  GithubIcon,
  SearchIcon,
} from "@/components/icons";

const Homepage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[date.getDay()];
    return `${year} 年 ${month} 月 ${day} 日 ${weekday}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
      <div className=" mx-auto px-4 py-8  flex justify-between gap-20 ">

        <div className="flex justify-between items-start flex-col gap-10 ">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-white/50 overflow-hidden shadow-lg">
              <img
                src="https://avatars.githubusercontent.com/u/60548971?v=4"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white/90 font-bold text-5xl italic tracking-wide">
              xxxsjan
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-xl w-96 shadow-xl mb-6">
            <div className="flex items-start gap-2">
              <span className="text-white/40 text-4xl -mt-2">“</span>
              <div>
                <p className="text-white italic text-xl mb-2">Hello Stranger!</p>
                <p className="text-white/80">It's not a bug, it's a feature, works on my machine.</p>
              </div>
              <span className="text-white/40 text-4xl -mb-2 self-end">”</span>
            </div>
          </div>
          <div className="flex flex-col items-start">

            <div className="flex gap-6">
              <a href="https://github.com/xxxsjan" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-all">
                <GithubIcon className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className='right'>

          <div className="flex gap-4 items-end h-[165px]">
            <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-xl w-80 shadow-xl h-full">
              <p className="text-white text-lg mb-4">博文天下，遍理人间！</p>
              <p className="text-right text-white/60">-「网络」</p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-xl w-80 shadow-xl text-center">
              <div className="text-white text-lg mb-2">{formatDate(currentTime)}</div>
              <div className="text-white text-5xl font-mono font-bold my-2">{formatTime(currentTime)}</div>
              <div className="text-white/60">天气数据获取失败</div>
            </div>
          </div>
          <h2 className="text-white text-xl my-6 font-medium text-left">网站列表 </h2>
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
              {
                [
                  { icon: <GithubIcon className="text-white" />, label: '博客', link: 'https://github.com/xxxsjan' },
                  { icon: <GithubIcon className="text-white" />, label: '工具', link: 'https://tool.odep.shop/' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="transition-all p-6 rounded-xl flex items-center justify-center gap-3 text-white text-lg  rounded-[6px] bg-black/25 backdrop-blur-[10px] cursor-pointer hover:bg-black/40 hover:scale-105 hover:shadow-lg"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    {/* {item.icon} */}
                    <span>{item.label}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

      </div>
      <div className="absolute top-0 left-0 w-full h-full transition duration-250 z-[-1] ">
        <img src="/background7.jpg" alt="" />
      </div>
    </div>
  );
};

export default Homepage;