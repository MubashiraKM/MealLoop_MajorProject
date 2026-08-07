// Get DOM elements
const itemInput = document.getElementById("itemInput");
const askBtn = document.getElementById("askBtn");
const outputDiv = document.getElementById("output");

document.getElementById("scrollBtn").addEventListener("click", function() {
  document.getElementById("compost-box").scrollIntoView({ 
    behavior: "smooth" 
  });
});
// Event listener for button click
askBtn.addEventListener("click", async () => {
  const item = itemInput.value.trim();
  if (!item) {
    outputDiv.innerHTML = "<p class='hint'>Please enter a food item.</p>";
    return;
  }

  outputDiv.innerHTML = "<p class='hint'>Searching for compost ideas...</p>";

  try {
    const response = await fetch("http://localhost:3000/compost-ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item })
    });

    const data = await response.json();

    // Extract text from Gemini AI response
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No compost ideas found.";

    // Optional: split and format into simple sections
    const formattedResponse = textResponse
      .split("\n\n")
      .map((section) => `<div class="card p-4 mb-4 border rounded bg-white shadow-sm">${section}</div>`)
      .join("");

    outputDiv.innerHTML = formattedResponse;

  } catch (error) {
    console.error(error);
    outputDiv.innerHTML = "<p class='hint'>Error fetching compost ideas. Please try again.</p>";
  }
});
