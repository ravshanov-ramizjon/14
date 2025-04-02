import { Outlet } from "react-router-dom";
import Header from "../components/castom/baseHeader";
import { createContext } from "react";

export const tokenCTX = createContext<string>("");
const BaseLayout: React.FC = () => {
  const token: string = localStorage.getItem("token") || "";
  return (
    <tokenCTX.Provider value={token}>
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </tokenCTX.Provider>
  );
};

export default BaseLayout;
