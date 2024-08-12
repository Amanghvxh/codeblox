"use client";

import React, { useState } from "react";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center w-full h-full absolute z-10">
      <BackgroundGradientAnimation
        {...{
          gradientBackgroundStart: "#00051B",
          gradientBackgroundEnd: "rgb(0, 12, 61)",
          firstColor: "13, 84, 192",
          secondColor: "165, 56, 192",
          thirdColor: "75, 165, 192",
          fourthColor: "150, 37, 37",
          fifthColor: "#200A26",
          pointerColor: "105, 75, 192",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: "1",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <header
            className="w-full p-4 flex justify-between items-center"
            style={{ height: "fit-content" }}
          >
            <div className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl leading-tight">
              Code
              <br />
              Blox
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-4 text-white font-bold text-sm md:text-base">
                <li>Home</li>
                <li>About Us</li>
                <li>Contact</li>
                <li>
                  <button className="bg-[#001A51] text-white border border-[#2C57FF] px-3 py-1 rounded text-sm">
                    Get Started
                  </button>
                </li>
              </ul>
            </nav>
            <button
              className="md:hidden text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </header>

          {menuOpen && (
            <nav className="md:hidden w-full bg-[#001A51] text-white absolute top-[91px] left-0 z-20">
              <ul className="flex flex-col space-y-4 p-4">
                <li onClick={toggleMenu}>Home</li>
                <li onClick={toggleMenu}>About Us</li>
                <li onClick={toggleMenu}>Contact</li>
                <li>
                  <button
                    onClick={toggleMenu}
                    className="bg-[#001E62] text-white border border-[#2C57FF] px-3 py-1 rounded text-sm"
                  >
                    Get Started
                  </button>
                </li>
              </ul>
            </nav>
          )}

          <main
            className="flex-grow flex flex-col items-center justify-center text-white px-4 text-center gap-[4px]"
            style={{ height: "fit-content" }}
          >
            <h2 className="text-xs xs:text-[14px] sm:text-sm md:text-base lg:text-lg xl:text-xl font-extrabold mb-2">
              World's first AI native IDE
            </h2>
            <h1
              className=" xs:text-[63px]   md:text-[82px] font-extrabold mb-4"
              // style={{ fontSize: "82px" }}
            >
              CodeBlox
            </h1>

            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="relative flex content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit rounded-full"
            >
              <div className="w-auto z-10 rounded-[inherit] bg-[#001E62] text-white border border-[#2C57FF] px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base font-bold">
                Get Started
              </div>
              <div
                className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
                style={{
                  filter: "blur(2px)",
                  background:
                    "radial-gradient(17.4174% 43.5811% at 86.4315% 61.7763%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              ></div>
              <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]"></div>
            </HoverBorderGradient>
          </main>

          <footer className="w-full p-2 text-center">
            <p className="text-xs text-[#4B4B4B]">
              Privacy Policy @2024 Copyright
            </p>
          </footer>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
}
