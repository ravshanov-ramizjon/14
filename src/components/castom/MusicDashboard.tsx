import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { FaPlay } from "react-icons/fa";


const SEARCH_URL = "https://api.spotify.com/v1/search?q=rock&type=artist&limit=5";
const TOP_TRACKS_URL = (artistId: string) =>
  `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;

interface Track {
  id: string;
  name: string;
  preview_url: string | null;
  artist: string;
  image: string;
}

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
  tracks: Track[];
}

/** Функция для загрузки топ-треков артиста */
const fetchTopTracks = async (artistId: string, token: string): Promise<Track[]> => {
  try {
    const response = await fetch(TOP_TRACKS_URL(artistId), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`Ошибка загрузки треков артиста ${artistId}`);
    }

    const data = await response.json();
    return data.tracks.map((track: any) => ({
      id: track.id,
      name: track.name,
      preview_url: track.preview_url,
      artist: track.artists[0]?.name || "Unknown Artist",
      image: track.album.images[0]?.url || "/placeholder.jpg",
    }));
  } catch (error) {
    console.error(`Ошибка при загрузке треков артиста ${artistId}:`, error);
    return [];
  }
};

function Artist() {
  const [savedTracks, setSavedTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtistsAndTracks = async () => {
      setLoading(true);
      const token = localStorage.getItem("spotify_token");

      if (!token) {
        console.warn("❌ Токен отсутствует, редирект на страницу входа.");
        navigate("/");
        return;
      }

      try {
        /** 1️⃣ Получаем список артистов */
        const response = await fetch(SEARCH_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          throw new Error("❌ Токен истёк!");
        }

        const data = await response.json();
        const foundArtists = data.artists.items as Artist[];

        /** 2️⃣ Для каждого артиста загружаем топ-треки */
        const artistsWithTracks = await Promise.all(
          foundArtists.map(async (artist) => {
            const tracks = await fetchTopTracks(artist.id, token);
            return { ...artist, tracks };
          })
        );

        setArtists(artistsWithTracks);
      } catch (error) {
        console.error("Ошибка:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchArtistsAndTracks();
  }, [navigate]);
useEffect(() => {
  localStorage.setItem("savedTracks", JSON.stringify(savedTracks));
}, [savedTracks]);

  const handlePlayTrack = (track: Track) => {
    console.log("🎵 Полный объект трека:", track);
    setSavedTracks((prev) => [...prev, track]);
  };

  const categories = ["Все", "Музыка", "Подкасты"]
  const [activeCategory, setActiveCategory] = useState("");
  return (
    <div className="bg-gradient-to-b from-purple-900 to-black">
      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="cursor-pointer"
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {artists
            .flatMap((artist) => artist.tracks)
            .slice(0, 8)
            .map((track, index) => (
              <Card key={index} className="relative group flex space-x-3 p-0 h-[84px] bg-white/5 border-none hover:bg-white/10">
                <span className="flex gap-4 h-full">
                  <span className="flex gap-4 text-white">
                    <img
                      src={track.image}
                      alt={track.name}
                      className="w-20 h-full rounded-md object-cover"
                    />
                    <div className="flex items-center">{track.name}</div>
                  </span>
                  <span>
                    {track.preview_url ? (
                      <div className="absolute bottom-2 right-2 z-10 w-12 h-12 bg-green-500 flex items-center justify-center rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          className="w-full h-full flex items-center justify-center bg-green-500 rounded-full"
                          onClick={() => handlePlayTrack(track)}
                        >
                          <FaPlay className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    ) : (
                      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white absolute bottom-2 right-2">Нет превью</p>
                    )}
                  </span>
                </span>
              </Card>
            ))}
        </div>

      </div>

      <div className="text-white p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Только для тебя</h1>

        {loading ? (
          <p className="text-center text-lg">Загрузка...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {artists
              .flatMap((artist) => artist.tracks)
              .map((track) => {
                console.log("🎵 Полный объект трека:", track); // <-- Вставил здесь, перед return

                return (
                  <Card key={track.id} className="bg-white/10 relative group text-white shadow-lg p-4 border-none hover:bg-white/5">
                    {/* Изображение трека */}
                    <img src={track.image} alt={track.name} className="w-full h-40 object-cover rounded-lg" />

                    <CardContent className="text-center mt-2">
                      <h2 className="text-lg font-semibold">
                        {track.name.length >= 8 ? track.name.slice(0, 8) : track.name}
                      </h2>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                    </CardContent>

                    {track.preview_url ? (
                      <div className="absolute bottom-2 right-2 z-10 w-12 h-12 bg-green-500 flex items-center justify-center rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          className="w-full h-full flex items-center justify-center bg-green-500 rounded-full"
                          onClick={() => handlePlayTrack(track)}
                        >
                          <FaPlay className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    ) : (
                      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 absolute bottom-2 right-2">Нет превью</p>
                    )}

                  </Card>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Artist;
