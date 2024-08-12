import React, { useEffect } from "react";
import DynamicComponentRenderer from "../classes/DynamicComponentRenderer";

const Renderor = (codeString) => {
  useEffect(() => {
    const renderer = new DynamicComponentRenderer("dynamicRoot");
    renderer.render(codeString);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        Dynamic React Component Renderer
      </h1>
      <div id="dynamicRoot"></div>
      <div className="max-w-xl mx-auto my-4"></div>
      <div id="dynamicRoot" className="max-w-xl mx-auto mt-8"></div>
    </div>
  );
};

export default Renderor;
