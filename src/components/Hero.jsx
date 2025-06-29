import React from "react";
import { useTheme } from "../hooks/useTheme";
import { BackgroundLines } from "./ui/background-lines";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <div className="">
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2
        className={`text-center text-3xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight ${
          theme === "dark" ? "bg-clip-text text-transparent  bg-gradient-to-b from-neutral-600 to-white" : "bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700"
        }`}>
        Al-Qurani Digital, <br /> Quran, Doa Harian, Al-Matsurat
      </h2>
      <p
        className={`max-w-xl mx-auto text-sm md:text-lg text-neutral-700  text-center ${
          theme === "dark" ? "bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-white" : "bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700"
        }`}>
        Aplikasi Quran Digital yang menyediakan berbagai fitur seperti Quran, Doa Harian, Al-Matsurat, dan masih banyak lagi.
      </p>
      </BackgroundLines>
    </div>
  )
}

export default Hero

