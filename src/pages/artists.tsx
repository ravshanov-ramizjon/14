import React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/castom/Sidebar";
import NewReleases from "@/components/castom/MusicDashboard";

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {

    return (
        <div>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel className="overflow-hidden"
                    defaultSize={25}
                    minSize={4}
                    maxSize={50}
                    collapsible={false}
                >
                    <Sidebar />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="overflow-auto">
                    <NewReleases/>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
export default Home