import React from "react";
import { ArrowUpTrayIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

function PromptInput() {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload here
      console.log("File uploaded:", file.name);
    }
  };

  const handleOpenWhiteboard = () => {
    // Implement whiteboard opening functionality here
    console.log("Whiteboard opened");
  };

  return (
    <div className="w-full max-w-3xl relative">
      <div className="absolute right-2 top-2 flex gap-2 z-10">
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={handleFileUpload}
        />
        <button
          className="flex items-center justify-center gap-2 p-2 bg-[#2C57FF] text-white font-semibold rounded-full shadow-lg hover:bg-[#1a3dbf] transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2C57FF]"
          onClick={() => document.getElementById("fileUpload").click()}
        >
          <ArrowUpTrayIcon className="h-5 w-5" />
        </button>
        <button
          className="flex items-center justify-center gap-2 p-2 bg-[#2C57FF] text-white font-semibold rounded-full shadow-lg hover:bg-[#1a3dbf] transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2C57FF]"
          onClick={handleOpenWhiteboard}
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
      </div>
      <textarea
        className="w-full h-28 bg-[#000622] text-white border border-[#2C57FF] rounded-lg p-4 pt-10 focus:ring-2 focus:ring-[#2C57FF] focus:outline-none resize-none"
        placeholder="Type something..."
      ></textarea>
    </div>
  );
}

export default PromptInput;
