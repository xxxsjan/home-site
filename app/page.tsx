"use client"
import React, { useState, useEffect } from 'react';

import {
  GithubIcon,
} from "@/components/icons";
import { Book, Github, Toolbox } from "lucide-react";

const QUOTES = [
  { text: "博文天下，遍理人间！", author: "网络" },
  { text: "路漫漫其修远兮，吾将上下而求索。", author: "屈原" },
  { text: "不积跬步，无以至千里；不积小流，无以成江海。", author: "荀子" },
  { text: "知之者不如好之者，好之者不如乐之者。", author: "孔子" },
  { text: "业精于勤，荒于嬉；行成于思，毁于随。", author: "韩愈" },
  { text: "天行健，君子以自强不息。", author: "周易" },
  { text: "纸上得来终觉浅，绝知此事要躬行。", author: "陆游" },
  { text: "读万卷书，行万里路。", author: "董其昌" },
  { text: "代码写千行，Bug 藏一处；修得一时稳，方知功夫足。", author: "程序员" },
  { text: "生活不止眼前的 Bug，还有诗和远方。", author: "改编" },
];

const DEFAULT_LOCATION = { latitude: 39.9042, longitude: 116.4074, city: "北京" };

const WEATHER_DESCRIPTIONS: Record<number, string> = {
  0: "晴",
  1: "大部晴朗",
  2: "局部多云",
  3: "阴",
  45: "雾",
  48: "雾凇",
  51: "小毛毛雨",
  53: "毛毛雨",
  55: "大毛毛雨",
  56: "冻毛毛雨",
  57: "冻毛毛雨",
  61: "小雨",
  63: "中雨",
  65: "大雨",
  66: "冻雨",
  67: "冻雨",
  71: "小雪",
  73: "中雪",
  75: "大雪",
  77: "雪粒",
  80: "小阵雨",
  81: "阵雨",
  82: "大阵雨",
  85: "小阵雪",
  86: "阵雪",
  95: "雷暴",
  96: "雷暴伴小冰雹",
  99: "雷暴伴大冰雹",
};

type WeatherInfo = {
  city: string;
  temp: number;
  description: string;
};

async function resolveCity(latitude: number, longitude: number): Promise<string> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=zh`
    );
    if (!res.ok) return "当前位置";

    const data = await res.json();
    return data.city || data.locality || data.principalSubdivision || "当前位置";
  } catch {
    return "当前位置";
  }
}

async function fetchWeather(latitude: number, longitude: number, city?: string) {
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
  );

  if (!weatherRes.ok) {
    throw new Error("weather fetch failed");
  }

  const weatherData = await weatherRes.json();
  const resolvedCity = city ?? await resolveCity(latitude, longitude);

  return {
    city: resolvedCity,
    temp: Math.round(weatherData.current.temperature_2m),
    description: WEATHER_DESCRIPTIONS[weatherData.current.weather_code] ?? "未知",
  } satisfies WeatherInfo;
}

const Homepage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>;

    const timer = setInterval(() => {
      setQuoteVisible(false);
      fadeTimer = setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        setQuoteVisible(true);
      }, 400);
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadWeather = async (latitude: number, longitude: number, city?: string) => {
      try {
        const data = await fetchWeather(latitude, longitude, city);
        if (!cancelled) {
          setWeather(data);
        }
      } catch {
        if (!cancelled) {
          setWeather(null);
          setWeatherStatus("error");
        }
      }
    };

    const loadDefaultWeather = () => loadWeather(
      DEFAULT_LOCATION.latitude,
      DEFAULT_LOCATION.longitude,
      DEFAULT_LOCATION.city
    );

    if (!navigator.geolocation) {
      loadDefaultWeather();
      return () => {
        cancelled = true;
      };
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        loadDefaultWeather();
      },
      { timeout: 8000 }
    );

    return () => {
      cancelled = true;
    };
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
                <p className="text-white/80">Bug 是意外，Feature 是惊喜。</p>
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
            <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-xl w-80 shadow-xl h-full flex flex-col justify-between">
              <p
                className={`text-white text-lg mb-4 transition-opacity duration-300 ${quoteVisible ? "opacity-100" : "opacity-0"
                  }`}
              >
                {QUOTES[quoteIndex].text}
              </p>
              <p
                className={`text-right text-white/60 transition-opacity duration-300 ${quoteVisible ? "opacity-100" : "opacity-0"
                  }`}
              >
                -「{QUOTES[quoteIndex].author}」
              </p>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-xl w-80 shadow-xl text-center">
              <div className="text-white text-lg mb-2">{formatDate(currentTime)}</div>
              <div className="text-white text-5xl font-mono font-bold my-2">{formatTime(currentTime)}</div>
              <div className="text-white/60">
                {weather
                  ? `${weather.city} ${weather.description} ${weather.temp}°C`
                  : weatherStatus === "loading"
                    ? "正在获取天气..."
                    : "天气数据获取失败"}
              </div>
            </div>
          </div>
          <h2 className="text-white text-xl my-6 font-medium text-left">网站列表 </h2>
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
              {
                [
                  { icon: <Book className="text-white" />, label: '博客', link: 'https://github.com/xxxsjan' },
                  { icon: <Toolbox className="text-white" />, label: '工具', link: 'https://tool.odep.shop/' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="transition-all p-6 rounded-xl flex items-center justify-center gap-3 text-white text-lg  rounded-[6px] bg-black/25 backdrop-blur-[10px] cursor-pointer hover:bg-black/40 hover:scale-105 hover:shadow-lg"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full transition duration-250 z-[-1] ">
        <img src="/background7.jpg" alt="" className='w-full h-full' />
      </div>
    </div>
  );
};

export default Homepage;