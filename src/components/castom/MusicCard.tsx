import { Card, CardContent } from "@/components/ui/card";
import { FaPlay } from "react-icons/fa";

interface MusicCardProps {
  id: string;
  name: string;
  imageUrl: string;
  artists: string;
  onClick: () => void;
}

const MusicCard: React.FC<MusicCardProps> = ({ id, name, imageUrl, artists, onClick }) => {
  return (
    <Card
      key={id}
      onClick={onClick}
      className=" border-none bg-white-[0/0] hover:bg-[#383838] rounded-lg shadow-md transition duration-300 group cursor-pointer w-[180px] sm:w-[160px] flex-shrink-0"
    >
      <CardContent className="relative p-3 sm:p-4 ">
        <img src={imageUrl || "/placeholder.png"} alt={name} className=" w-full h-auto rounded-lg" />

        <h3 className="text-white text-sm sm:text-lg font-semibold mt-2 sm:mt-3 truncate">
          {name}
        </h3>

        <p className="text-gray-400 text-xs sm:text-sm truncate">
          {artists}
        </p>

        <div className="absolute z-999 top-24 sm:bottom-4 right-3 sm:right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="z-999 bg-green-500 p-2 sm:p-3 rounded-full shadow-lg">
            <FaPlay className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicCard;
