import { useState } from "react";
import { fetchToken } from "./fetchToken";
import { useNavigate } from "react-router-dom"; 
import { Button } from "../ui/button";

const UpdateTokenButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleClick = async () => {
    setLoading(true);
    const newToken = await fetchToken();
    localStorage.setItem("spotify_token", newToken); 
    setLoading(false);
    navigate("/main"); 
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? "Выполняется вход..." : "Войти"}
    </Button>
  );
};

export default UpdateTokenButton;
