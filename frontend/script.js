/* 
  OLD JAVASCRIPT FILE - NOT USED IN REACT BUILD
  
  This file is deprecated. The new React frontend uses:
  - src/components/RecipeChat.jsx (main component with all logic)
  - src/api/apiClient.js (API client utility)
  
  To develop the frontend:
  1. Navigate to the frontend directory
  2. Run: npm install
  3. Run: npm run dev
  
  The React dev server will start on http://localhost:3000
*/


// -----------------------------
// FORMAT FUNCTION (FIXED)
// -----------------------------
function format(text, userQuery) {

    function section(name) {
        let regex = new RegExp(name + ":(.*?)(?=\\n[A-Z]|$)", "s");
        let m = text.match(regex);
        return m ? m[1].trim() : "";
    }

    let name = section("Recipe Name");
    let ing = section("Ingredients");
    let steps = section("Steps");
    let miss = section("Missing Ingredients");

    // -----------------------------
    // INGREDIENT LIST
    // -----------------------------
    let ingList = ing.split("\n")
        .filter(i => i.trim())
        .map(i => `<li>${i.replace("-", "").trim()}</li>`)
        .join("");

    // -----------------------------
    // STEP LIST
    // -----------------------------
    let stepList = steps.split("\n")
        .filter(s => s.trim())
        .map(s => `<li>${s.replace(/^\d+\./, "").trim()}</li>`)
        .join("");

    // -----------------------------
    // CHECK IF DISH QUERY
    // -----------------------------
    let isDishQuery =
        userQuery.toLowerCase().includes("how to") ||
        userQuery.toLowerCase().includes("recipe") ||
        userQuery.toLowerCase().includes("procedure") ||
        userQuery.toLowerCase().includes("prepare");

    // -----------------------------
    // MISSING INGREDIENTS
    // -----------------------------
    let missList = "";

    if (!isDishQuery && miss && miss.trim() !== "" && miss !== "None") {
        missList = `
            <h4>Missing Ingredients</h4>
            <ul>
                ${miss.split(",").map(m => `<li>${m.trim()}</li>`).join("")}
            </ul>
        `;
    }

    // -----------------------------
    // FINAL HTML
    // -----------------------------
    return `
        <div class="card">
            <h3>${name}</h3>

            <h4>Ingredients</h4>
            <ul>${ingList}</ul>

            <h4>Steps</h4>
            <ol>${stepList}</ol>

            ${missList}
        </div>
    `;
}