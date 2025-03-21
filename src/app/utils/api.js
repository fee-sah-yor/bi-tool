export const LoginRequest = async(email, password) => {
  try {
    const response = await fetch( `https://67dc88a1e00db03c40685335.mockapi.io/users/details?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("API request failed with status " + response.status);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Something went wrong. Please try again.");
  }
}

export const RegisterUser = async (userData) => {
  try {
    const response = await fetch(
      "https://67dc88a1e00db03c40685335.mockapi.io/users/details",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("API request failed with status " + response.status);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Something went wrong. Please try again.");
  }
};