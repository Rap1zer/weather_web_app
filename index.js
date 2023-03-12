const searchBarEl = document.getElementById("input-bar");
const searchBtn = document.getElementById("search-btn");
const searchContainerEl = document.getElementById("search-container");
const gridContainerEl = document.getElementById("weather-grid");
const limit = 5;
let suggestions = [];

let gridColumns = 1;
let gridRows = 1;
let cardCount = 0;

// Show suggestions when something is typed into the search bar
searchBarEl.addEventListener("input", async ()=> {
   // call geocoder API to see whether there are any cities that match the user's search
   let result = await getCoord(searchBarEl.value, limit);
   // styling which changes the border radius of the search bar
   if (result.length > 0) {
      searchBarEl.style.borderRadius = '5px 0 0 0';
   } else {
      searchBarEl.style.borderRadius = '5px 0 0 5px';
   }

   removeSuggestions();

   // add suggestions
   for(let i = 0; i < result.length; i++) {
      const place = result[i];
      let suggestion = new Suggestion(document.createElement("div"), place.name, place.lat, place.lon);
      if (place.state) {
         suggestion.name += ", " + place.state;
      }
      if (place.country) {
         suggestion.name += ", " + place.country;
      }

      addSuggestionToDom(suggestion);
      suggestions.push(suggestion);
   }
});

searchBtn.addEventListener("click", ()=> {
   console.log("clicked btn");
})

function addSuggestionToDom(suggestion) {
   // add the text to the div element
   suggestion.el.textContent = suggestion.name;
   // add styling to the div element
   suggestion.el.classList.add("search");
   suggestion.el.classList.add("suggestion");
   // add the div element to the dom
   searchContainerEl.appendChild(suggestion.el);
   // Add an event listener which adds the suggestion to the grid when clicked
   suggestion.el.addEventListener("click", function() {addCard(suggestion)});
}

// remove any previous suggestions
function removeSuggestions() {
   for (let i = 0; i <suggestions.length; i++) {
      suggestions[i].el.remove();
   }
   suggestions = [];
}