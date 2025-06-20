import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/ui/draggable-card";
import { Button } from "../components/ui/moving-border";

import { useTheme } from "../hooks/useTheme";


const ReadingQuran = () => {
  const { theme } = useTheme();

    const items = [
    {
      title: "الكتاب",
      image:
        "https://images.unsplash.com/photo-1591202812044-246db6e6e68d?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "الفرقان",
      image:
        "https://images.unsplash.com/photo-1644374544063-78b5cd18ba79?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "الذِّكر",
      image:
        "https://images.unsplash.com/photo-1649297711865-3d7c4de3610f?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "التنزيل",
      image:
        "https://images.unsplash.com/photo-1627337867898-2380f79050ee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "الرحمة",
      image:
        "https://images.unsplash.com/photo-1644461561575-646221bef671?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "الهدى",
      image:
        "https://images.unsplash.com/photo-1637721958581-be9cc2dcc753?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "النور",
      image:
        "https://images.unsplash.com/photo-1591203421291-d6e519899673?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className={`absolute top-1/2 mx-auto max-w-sm sm:max-w-xl -translate-y-3/4 text-center text-2xl font-black  md:text-4xl ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-800'}`}>
        Bacalah Al-Qur’an karena pada hari kiamat, ia akan datang sebagai syafaat untuk para pembacanya.” (HR. Muslim) [HR. Muslim, no. 804]
      </p>

      <div className="absolute top-[58%] left-1/2 -translate-x-1/2">
        <a href="/quran">
          <Button
          borderRadius="2.75rem"
          className={`${theme === 'dark' ? 'border-slate-800 text-white bg-slate-900' : 'bg-white text-black border-neutral-200'}`}
        >
          Mulai Membaca
        </Button>
        </a>
      </div>
      {items.map((item, idx) => (
        <DraggableCardBody key={idx} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className={`mt-4 text-center text-2xl font-bold text-neutral-300`}>
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  )
}

export default ReadingQuran

