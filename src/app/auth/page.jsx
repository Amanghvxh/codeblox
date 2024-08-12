import React from "react";
import { HeroHighlightDemo } from "./HeroHighlightDemo";
import { SignupFormDemo } from "./SignupFormDemo";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full h-full bg-[#00051B] text-white">
      {/* <HeroHighlightDemo /> */}
      <div className="mt-10 w-full max-w-md mx-auto">
        <SignupFormDemo />
      </div>
    </div>
  );
}
