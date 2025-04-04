import { useEffect, useState, useCallback } from "react";
import MusicCard from "./MusicCard";
import AlbumDetail from "./AlbumDetail";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Artist {
  name: string;
}

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  artists: Artist[];
}

interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
}

interface Category {
  id: string;
  name: string;
}

const MusicDashboard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);

  const fetchData = useCallback(
    async <T,>(endpoint: string, setter: React.Dispatch<React.SetStateAction<T>>, path: string) => {
      const token = localStorage.getItem("spotify_token");
      if (!token) {
        console.error("Токен не найден!");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`);

        const data = await res.json();
        setter(path.split(".").reduce((acc: any, key) => acc?.[key], data));
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    []
  );

  useEffect(() => {
    fetchData("browse/categories", setCategories, "categories.items");
    fetchData("browse/new-releases", setAlbums, "albums.items");
    fetchData(
      "tracks?market=UZ&ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B",
      setTopTracks,
      "tracks"
    );
  }, [fetchData]);

  const handleItemClick = async (album: Album, track?: Track) => {
    const token = localStorage.getItem("spotify_token");
    if (!token) {
      console.error("Токен не найден!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/albums/${album.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`Ошибка загрузки альбома: ${res.status}`);

      const albumData = await res.json();
      localStorage.setItem(`album_${album.id}`, JSON.stringify(albumData));

      if (track) {
        localStorage.setItem("current_track", JSON.stringify(track));
      }

      setSelectedAlbumId(album.id);
    } catch (error) {
      console.error("Ошибка при загрузке альбома:", error);
    }
  };

  if (selectedAlbumId) {
    return <AlbumDetail albumId={selectedAlbumId} onClose={() => setSelectedAlbumId(null)} />;
  }
  const categorieses = [
    { id: "1", name: "Музыка" },
    { id: "5", name: "Альбомы" },
    { id: "2", name: "Подкасты" },
    { id: "4", name: "Плейлисты" }
  ];

  return (
    <div className="bg-[#121212] min-h-screen p-4 md:p-6 w-full">
      <h1 className="text-white text-xl md:text-2xl font-bold mb-4">Категории</h1>

      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide flex-nowrap">
        {categorieses.map((category) => (
          <div
            key={category.id}
            className="bg-[#282828] px-4 py-2 rounded-lg text-white text-sm md:text-base cursor-pointer hover:bg-[#383838] transition"
          >
            {category.name}
          </div>
        ))}
      </div>


      <div className="space-y-6">
        {categories.map((category) => (
          <>
            <h2 key={category.id}
              className="text-white text-xl md:text-2xl font-bold mt-6 mb-4">{category.name}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide flex-nowrap">
              {albums.map((album) => (
                <MusicCard
                  key={album.id}
                  id={album.id}
                  name={album.name}
                  imageUrl={album.images[0]?.url || ""}
                  artists={album.artists.map((artist) => artist.name).join(", ")}
                  onClick={() => handleItemClick(album)}
                />
              ))}
            </div>
          </>
        ))}


        <h2 className="text-white text-xl md:text-2xl font-bold mt-6 mb-4">Новые релизы для тебя</h2>

        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide flex-nowrap">
          {topTracks.map((track) => (
            <MusicCard
              key={track.id}
              id={track.id}
              name={track.name}
              imageUrl={track.album.images[0]?.url || ""}
              artists={track.artists.map((artist) => artist.name).join(", ")}
              onClick={() => handleItemClick(track.album, track)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicDashboard;
