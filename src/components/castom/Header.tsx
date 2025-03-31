import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Clock, Download, Home, Search } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { VscOpenPreview } from "react-icons/vsc";


export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-black">
      <div className="flex items-center space-x-3">
        <a href="/main"><FaSpotify className="w-10 h-10 text-white" /></a>
        <GoHomeFill href="/main" className="w-10 h-10 text-white" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Что хочешь включить?"
            className="bg-neutral-900 text-white pl-14 pr-14 py-6 w-68 rounded-full border-none"
          />
          <VscOpenPreview className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="cursor-pointer bg-white text-black rounded-full px-8 py-5 text-sm">
         <a href="">Узнать больше о Premium</a> 
        </Button>
        <Button variant="ghost" className="cursor-pointer text-white">
        <Download className="w-9 h-9" />
          Установить приложение
        </Button>
        <Bell className="cursor-pointer text-white w-5 h-5" />
        <div className="cursor-pointer w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-white font-semibold">
          R
        </div>
      </div>
    </header>
  );
}
