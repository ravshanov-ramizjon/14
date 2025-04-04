const CLIENT_ID = "802deca6241743b89e0a6d0dabeca6b9";
const CLIENT_SECRET = "0fb7e37941ba4002aad7b64fdf0cd57e";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function fetchToken(): Promise<string> {
  try {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка при получении токена: ${response.statusText}`);
    }

    const data: TokenResponse = await response.json();
    return data.access_token; 
  } catch (err) {
    console.error("Ошибка получения токена:", err);
    throw err; 
  }
}
