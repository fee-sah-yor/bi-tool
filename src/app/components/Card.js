"use client";
import { useRef, useState, useEffect } from "react";
import Chip from '@mui/material/Chip';

export default function Card() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardData = [
    {
      title: "Total Users",
      number: "24",
      subText: "Last 30 days",
      badge: "+14%",
    },
    {
      title: "Active Sessions",
      number: "13,277",
      subText: "Sessions per day for the last 30 days",
      badge: "+24%",
    },
    {
      title: "Sales Revenue",
      number: "325",
      subText: "Last 30 days",
      badge: "-20%",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.7;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#262626] mb-4">Metrics Summary</h3>

      <div
        ref={containerRef}
        className="relative overflow-auto max-sm:flex grid grid-cols-3 gap-4"
      >
        {cardData.map((data, index) => (
          <div
            key={index}
            className="flex max-sm:w-[70%] max-sm:flex-shrink-0 justify-between gap-4 bg-white rounded-[10px] py-4 px-5 border border-[#EAEBF0]"
          >
            <div className="font-Manrope text-left flex flex-col gap-4">
              <h4 className="text-[#262626] text-base font-medium">
                {data.title}
              </h4>
              <h2 className="text-[28px] text-[#262626] font-bold font-Manrope">
                {data.number}
              </h2>
              <p className="font-medium text-[#262626] text-sm">{data.subText}</p>
            </div>
            <Chip label={data.badge} color="success" variant="outlined" />
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute left-[35%] flex justify-center items-center p-2 bg-[#FF0044] rounded-full w-fit mt-4 max-sm:flex sm:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <span
            key={index}
            className={`relative h-2 mx-[2px] rounded-full bg-white transition-all duration-300 ${
              activeIndex === index ? "w-6" : "w-2"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
