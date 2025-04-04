import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

interface Artist {
  name: string;
}

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  artists: Artist[];
  release_date: string;
  total_tracks: number;
  tracks: {
    items: Track[];
  };
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  duration_ms: number;
}

interface AlbumDetailProps {
  albumId: string;
  onClose: () => void;
}

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, "0")}`;
};

const AlbumDetail = ({ albumId, onClose }: AlbumDetailProps) => {
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    const storedAlbum = localStorage.getItem(`album_${albumId}`);
    if (storedAlbum) {
      setAlbum(JSON.parse(storedAlbum));
    }
  }, [albumId]);

  if (!album) return <div className="text-white p-6">Загрузка...</div>;

  return (
    <div className="bg-[#121212] min-h-screen text-white p-6 w-full">
      <div className="flex items-center mb-6">
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <FaArrowLeft size={24} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <img src={album.images[0]?.url || "/placeholder.png"} alt={album.name} className="w-48 h-48 rounded-lg shadow-lg" />
        <div>
          <p className="text-sm text-gray-400 uppercase">Альбом</p>
          <h1 className="text-4xl font-bold">{album.name}</h1>
          <p className="text-gray-400">
            {album.artists.map((artist) => artist.name).join(", ")} • {album.release_date.split("-")[0]} • {album.total_tracks} треков
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex text-center items-center w-full justify-between">
        <p className="text-2 text-[#777] font-medium mb-4">#Название</p>
        <p><IoMdTime className="text-[#777] w-5 h-6" /></p>
        </div>
        <hr className="w-full text-[#777]" />
        <div className="space-y-3">
          {album.tracks?.items.map((track, index) => (
            <div key={track.id} className="flex items-center justify-between p-2 hover:bg-[#282828] rounded-lg transition">
              <div className="flex items-center gap-3">
                <p className="text-gray-400">{index + 1}</p>
                <div>
                  <h3 className="text-white">{track.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
              <p className="text-gray-400">{formatDuration(track.duration_ms)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
