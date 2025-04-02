import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UpdateTokenButton from "./updateToken";

const LoginForm: React.FC = () => {
    return (
        <div className="flex justify-center items-center">
            <Dialog>
                <DialogTrigger className="px-6 py-2 text-sm font-semibold bg-white text-black rounded-full hover:bg-gray-200">
                Login
                </DialogTrigger>
                <DialogContent className="max-w-md" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle className="text-center">Вход в аккаунт</DialogTitle>
                    </DialogHeader>
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div>
                                    <Label htmlFor="email" className="pb-2">Email</Label>
                                    <Input id="email" type="email" placeholder="Введите email" required />
                                </div>
                                <div>
                                    <Label htmlFor="password" className="pb-2">Пароль</Label>
                                    <Input id="password" type="password" placeholder="Введите пароль" required />
                                </div>
                                    <UpdateTokenButton />
                            </form>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </div >
    );
}
export default LoginForm;