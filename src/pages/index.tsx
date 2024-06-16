import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-[1280px] m-auto p-[2rem] text-center">
      <div className="flex justify-center ">
        <a href="https://vitejs.dev" target="_blank" className="">
          <img src={viteLogo} className="h-[6em] p-[1.5em]" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="animate-spin">
          <img
            src={reactLogo}
            className="h-[6em]  p-[1.5em]"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="p-[2rem]">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
