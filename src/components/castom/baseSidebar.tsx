import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FaPlus } from "react-icons/fa";

function BaseSidebar() {
    return (
        <div className="space-y-4 bg-black h-screen relative pt-20">
            <ScrollArea className="h-55 w-full rounded-md">
                <div className="p-4">
                    <div className="flex justify-between">
                        <h1 className="mb-4 font-bold leading-none text-white">Моя медиатека</h1>
                        <Button className="bg-n">
                            <FaPlus />
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Card className="bg-black-100 text-white border-none">
                            <CardHeader>
                                <CardTitle className="text-lg">Создай свой первый плейлист</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-400">Это совсем не сложно! Мы поможем.</p>
                                <Button variant="outline" className="mt-4 text-black hover:bg-white hover:text-black hover:p-5">
                                    Создать плейлист
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-black text-white border-none">
                            <CardHeader>
                                <CardTitle className="text-lg">Подпишись на интересные подкасты</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-400">Ты будешь узнавать о новых выпусках.</p>
                                <Button variant="outline" className="mt-4 text-black hover:bg-white hover:text-black hover:p-5">
                                    Обзор
                                </Button>
                            </CardContent>
                        </Card>
                        <Separator className="my-2" />
                    </div>
                </div>
            </ScrollArea>

            <div className="bg-black text-white p-4 text-sm absolute bottom-15 left-0 w-75">
                <div className="space-y-2 text-gray-500 cursor-pointer">
                    <a href="https://www.spotify.com/uz/legal/end-user-agreement/">Юридическая информация</a>
                    <span className="m-1"> </span>
                    <a href="https://www.spotify.com/uz/safetyandprivacy">Центр безопасности и конфиденциальности</a>
                    <span className="m-1"> </span>
                    <a href="https://www.spotify.com/uz/legal/privacy-policy/">Политика конфиденциальности</a>
                    <span className="m-1"> </span>
                    <a href="https://www.spotify.com/uz/legal/cookies-policy/">Файлы cookie</a>
                    <span className="m-1"> </span>
                    <a href="https://www.spotify.com/uz/legal/privacy-policy/#s3">О рекламе</a>
                    <span className="m-1"> </span>
                    <a href="https://www.spotify.com/uz/accessibility">Специальные возможности</a>
                    <br />
                    <a className="hover:underline font-bold text-white">Файлы cookie</a>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="mt-4 flex items-center gap-2 bg-black hover:p-5 hover:bg-black hover:text-white">
                            🌐 Русский
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                        <p className="cursor-pointer hover:bg-gray-100 p-2 rounded">Русский</p>
                        <p className="cursor-pointer hover:bg-gray-100 p-2 rounded">English</p>
                        <p className="cursor-pointer hover:bg-gray-100 p-2 rounded">UZB</p>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
export default BaseSidebar;