import React from "react";
import { RiMusic2Line, RiAddLine, RiArrowRightLine, RiSearchLine, RiListUnordered } from "react-icons/ri";
import { Button } from "../ui/button";

const playlists = [
  { id: 1, name: "Любимые треки", type: "Плейлист", desc: "9 треков", image: "/icons/heart-icon.svg" },
  { id: 2, name: "Мой плейлист № 1", type: "Плейлист", desc: "Ramiz", image: "https://i.scdn.co/image/ab67706c0000da843311c92190b60e9d09828e5f" },
];

const Sidebar: React.FC = () => {
    const [selectedTab, setSelectedTab] = React.useState<number | undefined>(undefined);
  return (
    <div className="bg-[#121212] text-white h-full w-full p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src="./Library_S.png" alt="Library"/>
          <h1 className="text-lg font-semibold">Моя медиатека</h1>
        </div>
        <div className="flex items-center">
          {[RiAddLine, RiArrowRightLine].map((Icon, i) => (
            <Button key={i} className="mr-2">
              <Icon className="h-5 w-5" />
            </Button>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        {["Плейлисты", "Альбомы"].map((tab, i) => (
          <Button
            key={i}
            className={`rounded-full px-4 py-2 text-sm font-medium hover:bg- ${
                selectedTab === i ? "bg-white text-black" : "bg-[#282828]"
            }`}
            onClick={() => setSelectedTab(i)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <RiSearchLine className="h-5 w-5 text-[#b3b3b3]" />
        <div className="flex items-center">
          <span className="text-sm text-[#b3b3b3] mr-2">Недавно прослушано</span>
          <RiListUnordered className="h-5 w-5 text-[#b3b3b3]" />
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        {playlists.map(({ id, name, type, desc, image }) => (
          <div key={id} className="bg-[#282828] rounded-md p-2 mb-2 flex items-center">
            {image.includes("/icons/") ? (
              <RiMusic2Line className="h-8 w-8 mr-2 text-[#1DB954]" />
            ) : (
              <img src={image} alt={name} className="h-10 w-10 mr-2 rounded-md object-cover" />
            )}
            <div>
              <h3 className="text-md font-medium">{name}</h3>
              <p className="text-xs text-[#b3b3b3]">{type} • {desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
