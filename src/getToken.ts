import axios from "axios";

export async function getAmadeusToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", "UdZ5hCIn9yCIxMogEQhkevOdj9IwqKT6");       // ⚠️ Replace with your real key
  params.append("client_secret", "5iIhdkL0AHaGxXgk"); // ⚠️ Replace with your real secret

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

    console.log("Amadeus token response:", response.data.access_token); // Log the response data
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Amadeus token:", error);
    throw error;
  }
}
