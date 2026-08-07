// script.js
let allRecipes = [];        // all search-matching recipes
let displayedCount = 0;     // how many we've shown so far
const batchSize = 10;       // change to 20 if you prefer

// allow Enter key to trigger search
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("ingredient");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchRecipes();
      }
    });
  }
});

async function searchRecipes() {
  const rawInput = (document.getElementById("ingredient")?.value || "").trim();
  const resultsDiv = document.getElementById("results");
  if (!resultsDiv) return;

  // reset UI/state for new search
  resultsDiv.innerHTML = "";
  displayedCount = 0;
  allRecipes = [];

  if (!rawInput) {
    resultsDiv.innerHTML = "<p>Please enter one or more ingredients!</p>";
    return;
  }

  // split input into multiple ingredients (comma or space separated)
  const searchTerms = rawInput
    .toLowerCase()
    .split(/[, ]+/)         // split by comma or spaces
    .map(t => t.trim())
    .filter(t => t.length > 0);

  try {
    const response = await fetch("recipes_cleaned1.json");
    if (!response.ok) throw new Error("Failed to fetch recipes.json: " + response.status);
    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("recipes.json did not return an array:", data);
      resultsDiv.innerHTML = "<p>Recipes file format error.</p>";
      return;
    }

    // filter recipes: must include ALL search terms
    allRecipes = data.filter(r => {
      const ing = (r["Cleaned-Ingredients"] || r.TranslatedIngredients || r.ingredients || "")
        .toString()
        .toLowerCase();
      return searchTerms.every(term => ing.includes(term));
    });

    if (allRecipes.length === 0) {
      resultsDiv.innerHTML = "<p>No recipes found with those ingredients!</p>";
      return;
    }

    // create containers once per search
    resultsDiv.innerHTML = `
      <div class="grid-container" id="grid-container" aria-live="polite"></div>
      <div id="load-more-container"></div>
    `;

    // render first batch
    // render first batch
renderNextBatch();

// scroll to results section after recipes are loaded
if (resultsDiv) {   // use the previously declared resultsDiv
    resultsDiv.scrollIntoView({ behavior: "smooth" });
}



  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p>Error fetching recipes.</p>";
  }
}

function renderNextBatch() {
  const grid = document.getElementById("grid-container");
  const loadMoreContainer = document.getElementById("load-more-container");
  if (!grid || !loadMoreContainer) return;

  const start = displayedCount;
  const end = Math.min(displayedCount + batchSize, allRecipes.length);

  for (let i = start; i < end; i++) {
    const r = allRecipes[i];
    const card = document.createElement("div");
    card.className = "recipe-card";

    let imageUrl = r.image || r["image-url"] || r["image_url"] || "";
    if (!imageUrl || imageUrl.trim() === "") {
      imageUrl = "https://picsum.photos/600/400?random=" + Math.floor(Math.random() * 10000);
    }

    card.innerHTML = `
      <h2>${escapeHtml(r.TranslatedRecipeName || r.name || "Untitled")}</h2>
      <img src="${imageUrl}" alt="${escapeHtml(r.TranslatedRecipeName || r.name || 'recipe')}"
           onerror="this.onerror=null;this.src='https://picsum.photos/600/400?random=${Math.floor(Math.random()*10000)}';">
      <a href="${escapeAttr(r.URL || r.url || '#')}" target="_blank" rel="noopener">View Full Recipe</a>
    `;

    grid.appendChild(card);
  }

  displayedCount = end;

  // Update Load More / Back to Search button
  if (displayedCount < allRecipes.length) {
    loadMoreContainer.innerHTML = `<button id="load-more-btn" class="load-more-btn">Load More</button>`;
    document.getElementById("load-more-btn").addEventListener("click", renderNextBatch);
} else {
    // show Back to Search button
    loadMoreContainer.innerHTML = `<button id="back-to-search-btn" class="load-more-btn">Back to Search</button>`;
    document.getElementById("back-to-search-btn").addEventListener("click", () => {
        const secondBanner = document.getElementById("second-banner");
        if (secondBanner) {
            secondBanner.scrollIntoView({ behavior: "smooth" });
        }
    });
}

}

document.getElementById("get-started-btn").addEventListener("click", function() {
    const secondBanner = document.getElementById("second-banner");
    secondBanner.scrollIntoView({ behavior: "smooth" });
});

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escapeAttr(str) {
  if (!str) return "#";
  return String(str).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
