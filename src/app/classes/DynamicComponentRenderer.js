export default class DynamicComponentRenderer {
  constructor(rootElementId) {
    this.rootElementId = rootElementId;
  }

  loadScript(src, globalName) {
    return new Promise((resolve, reject) => {
      if (typeof window[globalName] !== "undefined") {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.crossOrigin = "anonymous";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error(`Failed to load ${globalName} script`));
      document.head.appendChild(script);
    });
  }

  loadBabelScript() {
    return this.loadScript(
      "https://unpkg.com/@babel/standalone/babel.min.js",
      "Babel"
    );
  }

  loadReactScript() {
    return this.loadScript(
      "https://unpkg.com/react@17/umd/react.development.js",
      "React"
    );
  }

  loadReactDOMScript() {
    return this.loadScript(
      "https://unpkg.com/react-dom@17/umd/react-dom.development.js",
      "ReactDOM"
    );
  }

  async render(componentString) {
    try {
      if (!componentString) {
        throw new Error("Component string cannot be empty.");
      }

      // Ensure React, ReactDOM, and Babel are loaded
      await this.loadReactScript();
      await this.loadReactDOMScript();
      await this.loadBabelScript();

      // Transform the component string into executable code
      const transformedCode = Babel.transform(componentString, {
        presets: ["react"],
      }).code;

      // Create a function to evaluate the transformed code and return the component
      const componentFunction = new Function(
        "React",
        "ReactDOM",
        `${transformedCode}; return App;`
      );

      // Get the component definition
      const Component = componentFunction(React, ReactDOM);

      // Render the component to the DOM
      // eslint-disable-next-line react/no-deprecated
      ReactDOM.render(
        React.createElement(Component),
        document.getElementById(this.rootElementId)
      );
    } catch (error) {
      console.error("Error rendering component:", error);
      alert(
        "There was an error rendering the component. Please check your code and try again."
      );
    }
  }
}
