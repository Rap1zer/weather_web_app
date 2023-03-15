const cardWidth = 300;
const marginWidth = 20;
const weatherGrid = document.getElementById("weather-grid");
let cards = new Array();
let unit = "c";
let cardCount = 0;
let cardOutline;

function addCard(selectedSuggestion) {
   if (cardCount > 10) { // Do not add a new card if maximum number of cards is already reached.
      return;
   }
   // Check if the card that wants to be added already exists.
   for (let i = 0; i < cards.length; i++) {
      // Compare the coordinates of the place with all existing cards
      if (cards[i].lat === selectedSuggestion.lat && cards[i].lon === selectedSuggestion.lon) {
         return; // card already exists, break function.
      }
   }

   cardCount++;
   removeSuggestions(); // Remove all the search options / suggestions as a suggestion has been chosen

   // Create new card and add it to the DOM
   let card = new Card(document.createElement("div"), selectedSuggestion.name, selectedSuggestion.lat, selectedSuggestion.lon);
   card.el.classList.add("card");
   card.addHTMLmarkup();
   gridContainerEl.appendChild(card.el);
   cards.push(card);
   updateCardSizing();

   // Add weather information into the card.
   getWeatherInfo(card);
}

window.addEventListener("resize", updateCardSizing);

// Updates card columns so they are responsive to screen size.
function updateCardSizing() {
   const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
   // This variable stores how many columns of cards there should be depending on viewport width.
   let numOfColumns;
   // This variable stores the maximum number of cards can fit in a row.
   const maxColumns = Math.floor(vw / (cardWidth + marginWidth * 2));

   if (cardCount < maxColumns) {
      numOfColumns = cardCount;
      weatherGrid.style.textAlign = "start";
   } else {
      numOfColumns = maxColumns;
      weatherGrid.style.textAlign = "center";
   }

   const width = Math.min(370, (vw / numOfColumns) - (marginWidth * 2)) + "px";
   for (let i = 0; i < cardCount; i++) {
      cards[i].el.style.width = width;
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
   console.log(data);
   // Change colour of text to white if it is nighttime in the place
   if (weather[0].icon.slice(-1) === "n") { // It is night
      card.el.style.color = "#eaeaea";
   }

   let tempText = convertKelvin(main.temp);
   if (!Number.isInteger(tempText)) {
      const decimalPortion = Math.abs(Math.round(tempText % 1 * 10));
      tempText = `${Math.round(tempText)}<span class="decimal-text">.${decimalPortion}</span>`;
   }
   card.temp.innerHTML = tempText;

   card.description.textContent = weather[0].description;
   card.humidity.textContent = "Humidity: " + main.humidity;
}

function convertKelvin(kelvin) {
   if (unit === "c") { // if the unit is "c", then convert kelvin to celsius
      return kelvin - 273.15;
   } else { // convert kelvin to farenheit
      return (kelvin - 273.15) * (9/5) + 32;
   }
}