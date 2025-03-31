import { Outlet } from "react-router-dom";
import Header from "../components/castom/baseHeader";

const BaseLayout: React.FC = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
