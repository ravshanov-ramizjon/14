import ArtistsPage from "@/components/castom/MusicDashboard";
import React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/castom/Sidebar";

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {

    return (
        <div>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel className="overflow-hidden"
                    defaultSize={25}
                    minSize={5}
                    maxSize={50}
                    collapsible={false}
                >
                    <Sidebar />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel  className="overflow-auto">
                    <ArtistsPage />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
export default Home