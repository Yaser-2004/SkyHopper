import axios from "axios";

export async function getAmadeusToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", import.meta.env.VITE_API_KEY);       
  params.append("client_secret", import.meta.env.VITE_CLIENT_SECRET); 

  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Amadeus token:", error);
    throw error;
  }
}
