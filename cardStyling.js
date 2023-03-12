const cardWidth = 300;
const marginWidth = 20;

function addCard(selectedSuggestion) {
   if (cardCount < 20) {
      let card = new Card(document.createElement("div"), selectedSuggestion.name, selectedSuggestion.lat, selectedSuggestion.lon);
      card.el.classList.add("card");
   
      gridContainerEl.appendChild(card.el);
      cardCount++;

      updateCardSizing();
      getWeatherInfo();
   }
}

window.addEventListener("resize", updateCardSizing);

// Updates card columns so they are responsive to screen size
function updateCardSizing() {
   const cards = document.getElementsByClassName("card");
   const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
   // This variable stores how many columns of cards there should be depending on viewport width.
   let numOfColumns = Math.min(cards.length, Math.floor(vw / (cardWidth + marginWidth * 2)));

   for (let i = 0; i < cards.length; i++) {
      cards[i].style.width = Math.min(370, (vw / numOfColumns) - (marginWidth * 2)) + "px";
   }
}

// call weather api
async function getWeatherInfo() {
   let result = await getWeather(lat, lon);
   console.log(weatherData);
}