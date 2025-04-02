import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { TbMicrophone2, TbVolume3 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { TbDevicesMinus } from "react-icons/tb";
import { LuLaptopMinimal } from "react-icons/lu";
import { MdOpenInFull } from "react-icons/md";

const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (!audioRef.current) return;

        const updateProgress = () => {
            setProgress(audioRef.current ? (audioRef.current.currentTime / audioRef.current.duration) * 100 : 0);
        };

        audioRef.current.addEventListener("timeupdate", updateProgress);
        return () => audioRef.current?.removeEventListener("timeupdate", updateProgress);
    }, []);

    const savedTrack = localStorage.getItem("savedTracks") ? JSON.parse(localStorage.getItem("savedTracks")!) : null;

    // return (
    //     <div className="fixed bottom-0 left-0 w-full bg-[#181818] text-white p-3 pr-0 flex items-center justify-between">
    //         <div className="flex items-center space-x-3">
    //             <img src={savedTrack.image} alt="Track img" className="w-12 h-12 rounded-md object-cover" />
    //             <div>
    //                 <h4 className="text-sm font-medium">{savedTrack.name}</h4>
    //                 <p className="text-xs text-gray-400">{savedTrack.artist}</p>
    //             </div>
    //         </div>

    //         <div className="flex flex-col items-center w-1/3">
    //             <div className="flex items-center space-x-4 mb-2">
    //                 <button className="text-gray-400 hover:text-white">
    //                     <Shuffle size={20} />
    //                 </button>
    //                 <button className="text-gray-400 hover:text-white">
    //                     <SkipBack size={20} />
    //                 </button>
    //                 <button
    //                     className="p-2 bg-white text-black rounded-full flex items-center justify-center"
    //                     onClick={togglePlay}
    //                 >
    //                     {isPlaying ? <Pause size={20} /> : <Play size={20} />}
    //                 </button>
    //                 <button className="text-gray-400 hover:text-white">
    //                     <SkipForward size={20} />
    //                 </button>
    //                 <button className="text-gray-400 hover:text-white">
    //                     <Repeat size={20} />
    //                 </button>
    //             </div>
    //             <Slider value={[progress]} className="w-full max-w-xs" />
    //         </div>

    //         <div className="flex items-center space-x-2">
    //             <button className="text-gray-400 hover:text-white">
    //                 <TbMicrophone2 size={20} />
    //             </button>
    //             <button className="text-gray-400 hover:text-white">
    //                 <HiOutlineQueueList size={20} />
    //             </button>
    //             <button className="text-gray-400 hover:text-white">
    //                 <LuLaptopMinimal size={20} />
    //             </button>
    //             <Volume2 size={20} className="text-gray-400 hover:text-white" />
    //             <Slider className="revers w-25 mr-2" dir="rtl" />
    //             <button className="text-gray-400 hover:text-white">
    //                 <TbDevicesMinus size={20} />
    //             </button>
    //             <button className="text-gray-400 hover:text-white">
    //                 <MdOpenInFull size={20} />
    //             </button>
    //         </div>

    //         <audio ref={audioRef} src="/music.mp3" />
    //     </div>
    // );
};

export default Player;
