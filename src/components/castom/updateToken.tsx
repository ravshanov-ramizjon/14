import { useState } from "react";
import { fetchToken } from "./fetchToken";
import { useNavigate } from "react-router-dom"; // Для редиректа
import { Button } from "../ui/button";

const UpdateTokenButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Используем для редиректа

  const handleClick = async () => {
    setLoading(true);
    const newToken = await fetchToken();
    localStorage.setItem("spotify_token", newToken); // Сохраняем токен
    setLoading(false);
    navigate("/main"); // Перенаправляем на страницу с артистами
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? "Выполняется вход..." : "Войти"}
    </Button>
  );
};

export default UpdateTokenButton;
