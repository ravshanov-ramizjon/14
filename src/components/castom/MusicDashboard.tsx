import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { FaPlay } from "react-icons/fa";
import { Button } from "../ui/button";

const SEARCH_URL = "https://api.spotify.com/v1/search?q=rock&type=artist&limit=5";
const TOP_TRACKS_URL = (artistId: string) => `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;
interface Track {
  id: string;
  name: string;
  preview_url: string | null;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

const fetchTopTracks = async (artistId: string, token: string): Promise<{ id: string; name: string; preview_url: string | null; artist: string; image: string }[]> => {
  try {
    const response = await fetch(TOP_TRACKS_URL(artistId), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error(`Ошибка загрузки треков артиста ${artistId}`);

    const data = await response.json();
    return data.tracks.map((track: Track) => ({
      id: track.id || "unknown-id",
      name: track.name || "Unknown Track",
      preview_url: track.preview_url || null,
      artist: track.artists?.[0]?.name || "Unknown Artist",
      image: track.album?.images?.[0]?.url || "/placeholder.jpg",
    }));
  } catch {
    return [];
  }
};

function Artist() {
  interface Artist {
    id: string;
    name: string;
    tracks: {
      id: string;
      name: string;
      preview_url: string | null;
      artist: string;
      image: string;
    }[];
  }
  
  const [artists, setArtists] = useState<Artist[]>([]);
  const [savedTracks, setSavedTracks] = useState<{ id: string; name: string; preview_url: string | null; artist: string; image: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("spotify_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchArtistsAndTracks = async () => {
      try {
        setLoading(true);
        const response = await fetch(SEARCH_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error();

        const data = await response.json();
        const foundArtists = data.artists.items;

        const artistsWithTracks = await Promise.all(
          foundArtists.map(async (artist: { id: string; name: string }) => ({
            ...artist,
            tracks: await fetchTopTracks(artist.id, token),
          }))
        );

        setArtists(artistsWithTracks);
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchArtistsAndTracks();
  }, [token, navigate]);

  useEffect(() => {
    localStorage.setItem("savedTracks", JSON.stringify(savedTracks));
  }, [savedTracks]);
  
  const handlePlayTrack = (track: { id: string; name: string; preview_url: string | null; artist: string; image: string }) => {
    setSavedTracks((prev) => [...(prev || []), track]);
  };
  const categories = ["Все", "Музыка", "Подкасты"];
  const [activeCategory, setActiveCategory] = useState("Все");
artists.flatMap((artist) => console.log(artist));
  return (
    <div className="bg-gradient-to-b from-purple-900 to-black p-6 min-h-screen text-white">
       <div className="flex gap-2 p-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "secondary"}
          className={`rounded-full ${
            activeCategory !== category ? "bg-opacity-30 text-white bg-white/10 hover:bg-white/14" : ""
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
      <h1 className="text-2xl font-bold mb-4">Только для тебя</h1>
      {loading ? (
        <p className="text-center text-lg">Загрузка...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {artists.flatMap((artist) => artist.tracks || []).map((track) =>{
          return (
            <Card key={track.id} className="bg-white/0 relative group text-white p-2 border-none hover:bg-white/5">
              <img src={track.image} alt={track.name} className="w-full h-40 object-cover rounded-lg" />
              <CardContent className="text-start mt-2 duration-200">
                <h2 className="text-lg font-semibold">{track.name.substring(0, 10)}</h2>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </CardContent>
              {track.preview_url ? (
                <div className="absolute bottom-2 right-2 z-10 w-12 h-12 bg-green-500 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    className="w-full h-full flex items-center justify-center bg-green-500 rounded-full"
                    onClick={() => track.preview_url && handlePlayTrack(track)}
                  >
                    <FaPlay className="w-6 h-6 text-white" />
                  </button>
                </div>
              ) : (
                <p className="text-end opacity-0 group-hover:opacity-100 text-red-500 transition-opacity duration-200">нет превью</p>
              )}
            </Card>
            )})}
        </div>
      )}
    </div>
  );
}

export default Artist;
