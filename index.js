const searchBarEl = document.getElementById("input-bar");
const searchBtn = document.getElementById("search-btn");
const limit = 5;
let suggestions = [];

searchBarEl.addEventListener("input", ()=> {
   getCoord(searchBarEl.value, limit).then((result) => {
      if (result.length > 0) {
         searchBarEl.style.borderRadius = '5px 0 0 0';
      } else {
         searchBarEl.style.borderRadius = '5px 0 0 5px';
      }

      for (let i = 0; i <suggestions.length; i++) {
         suggestions[i].el.remove();
      }
      suggestions = [];

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
   })
});

searchBtn.addEventListener("click", ()=> {
   console.log("clicked btn");
})

function addSuggestionToDom(suggestion) {
   suggestion.el.textContent = suggestion.name;
   suggestion.el.classList.add("search");
   suggestion.el.classList.add("suggestion");
   document.getElementById("search-container").appendChild(suggestion.el);
}

function getPlaceWeather() {

}