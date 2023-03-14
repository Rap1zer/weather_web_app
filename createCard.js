const cardWidth = 300;
const marginWidth = 20;
const weatherGrid = document.getElementById("weather-grid");
let cardCount = 0;
let cardOutline;

function addCard(selectedSuggestion) {
   if (cardCount > 10) { // Do not add a new card if maximum number of cards is already reached.
      return;
   }
   cardCount++;
   removeSuggestions(); // Remove all the search options / suggestions as a suggestion has been chosen

   // Create new card and add it to the DOM
   let card = new Card(document.createElement("div"), selectedSuggestion.name, selectedSuggestion.lat, selectedSuggestion.lon);
   card.el.classList.add("card");
   card.addHTMLmarkup();
   gridContainerEl.appendChild(card.el);
   updateCardSizing();

   // Add weather information into the card
   getWeatherInfo(card);
}

window.addEventListener("resize", updateCardSizing);

// Updates card columns so they are responsive to screen size
function updateCardSizing() {
   const cards = document.getElementsByClassName("card");
   const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
   // This variable stores how many columns of cards there should be depending on viewport width.
   let numOfColumns;
   // This variable stores the maximum number of cards can fit in a row
   const maxColumns = Math.floor(vw / (cardWidth + marginWidth * 2));

   if (cards.length < maxColumns) {
      numOfColumns = cards.length;
      weatherGrid.style.textAlign = "start";
   } else {
      numOfColumns = maxColumns;
      weatherGrid.style.textAlign = "center";
   }

   const width = Math.min(370, (vw / numOfColumns) - (marginWidth * 2)) + "px";
   for (let i = 0; i < cards.length; i++) {
      cards[i].style.width = width;
   }
   if (cardOutline) {
      cardOutline.style.width = width;
   }
}

// Add weather information into the card
async function getWeatherInfo(card) {
   const data = await getWeather(card.lat, card.lon);
   const {main, sys, weather} = data;
   card.el.style.backgroundImage = `url(weather-background-images/${weather[0].icon}.jpg)`;
   // Change colour of text to white if it is nighttime in the place
   if (weather[0].icon.slice(-1) === "n") { // It is night
      card.el.style.color = "#eaeaea";
   }
}

function kelvinToCelsius(kelvin) {
   return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
   return (kelvin - 273.15) * (9/5) + 32;
}