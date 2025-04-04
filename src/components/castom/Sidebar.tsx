import React, { useEffect, useState } from "react";
import { RiMusic2Line, RiAddLine, RiArrowRightLine, RiSearchLine, RiListUnordered } from "react-icons/ri";
import { Button } from "../ui/button";
import { BASE_URL } from "../../../exports";
import { fetchToken } from "./fetchToken";

const Sidebar: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<number | undefined>(undefined);
  const token = localStorage.getItem("spotify_token") || fetchToken();
  if (!token) {
    console.error("Токен не найден!");
    return;
  }  
  
  // useEffect(() => {
  //   const getPlaylists = async () => {
  //     if (!token) return;

  //     try {
  //       const response = await fetch(`${BASE_URL}/me/playlists`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       if (!response.ok) throw new Error(`Ошибка запроса: ${response.status}`);

  //       const data = await response.json();
  //       setPlaylists(data.items);
  //     } catch (err) {
  //       console.error("Ошибка загрузки плейлистов:", err);
  //     }
  //   };

  //   getPlaylists();
  // }, [token]); 


fetch(`${BASE_URL}/me/playlists`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => setPlaylists(data.items))
    .catch((err) => console.error("Ошибка загрузки плейлистов:", err));



  return (
    <div className="bg-[#121212] text-white h-full w-full p-4 flex flex-col overflow-hidden">
      <>
        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src="./Library_S.png" alt="Library" />
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
                className={`rounded-full px-4 py-2 text-sm font-medium ${selectedTab === i ? "bg-white text-black" : "bg-[#282828]"} hover:bg-[#383838]`}
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
            {playlists.length > 0 ? (
              playlists.map(({ id, name, owner, images }) => (
                <div key={id} className="bg-[#282828] rounded-md p-2 mb-2 flex items-center">
                  {images.length > 0 ? (
                    <img src={images[0].url} alt={name} className="h-10 w-10 mr-2 rounded-md object-cover" />
                  ) : (
                    <RiMusic2Line className="h-8 w-8 mr-2 text-[#1DB954]" />
                  )}
                  <div>
                    <h3 className="text-md font-medium">{name}</h3>
                    <p className="text-xs text-[#b3b3b3]">Плейлист • {owner.display_name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#b3b3b3]">Нет доступных плейлистов</p>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Sidebar;
