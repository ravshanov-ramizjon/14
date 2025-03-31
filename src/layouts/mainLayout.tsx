import Header from "@/components/castom/Header";
import Player from "@/components/castom/Player";
import { Outlet } from "react-router-dom";

const Main = () => {
    return <div>
        <header className="fixed z-999 w-full">
            <Header />
        </header>
        <main className="pt-16 pb-16">
            <Outlet/>
        </main>
        <footer>
            <Player/>
            </footer>
    </div>;
};

export default Main;
