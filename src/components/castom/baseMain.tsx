import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LoginForm from "./formLogin";
import BaseSidebar from "./baseSidebar";
const LinerImage = "/Linear.png";

const BaseMain = () => {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={25}
          minSize={5}
          maxSize={50}
          collapsible={false}>
          <BaseSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel style={{ backgroundImage: `url(${LinerImage})` }}>
          <div className="h-screen w-full pt-20">
            <center className="h-auto">
              <h1 className="text-white text-[38px] font-bold">Welcome to Spotify</h1>
              <p className="text-white text-[28px] pb-10">Millions of songs. Free on Spotify.</p>
              <LoginForm />
            </center>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default BaseMain;
