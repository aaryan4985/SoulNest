// Quick test script for Gemini API
// Run this in browser console to test your API key

const testGeminiAPI = async () => {
  const apiKey = "AIzaSyA8uYtQyob8dUJ9_Bqe_adsdSKzu2M0Al8"; // Replace with your actual key

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Hello, can you respond with a simple greeting?",
                },
              ],
            },
          ],
        }),
      }
    );

    console.log("Response status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("Success! API is working:", data);
      return data;
    } else {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      return null;
    }
  } catch (error) {
    console.error("Network Error:", error);
    return null;
  }
};

// Run the test
console.log("Testing Gemini API...");
testGeminiAPI();
