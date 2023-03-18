class Suggestion {
   constructor(el, name, lat, lon) {
      this.el = el;
      this.name = name;
      this.lat = lat;
      this.lon = lon;
   }
}

class Card {
   constructor(el, name, lat, lon, title, temp, description, humidity, wind, deleteBtn) {
      this.el = el;
      this.name = name;
      this.lat = lat;
      this.lon = lon;
      this.title = title;
      this.tmep = temp;
      this.description = description;
      this.humidity = humidity;
      this.wind = wind;
      this.deleteBtn = deleteBtn;
   }

   addHTMLmarkup() {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card-container");
      const divTop = document.createElement("div");
      const divBottom = document.createElement("div");
      this.deleteBtn = document.createElement("div");
      this.deleteBtn.classList.add("close-btn");
      this.deleteBtn.addEventListener("click", this.closeCard);
      this.temp = document.createElement("h2");
      this.title = document.createElement("h3");
      this.title.textContent = this.name;
      this.description = document.createElement("h4");
      this.wind = document.createElement("h4");
      this.humidity = document.createElement("h4");
      divTop.append(this.temp, this.description);
      divBottom.append(this.wind, this.humidity, this.title);
      cardContainer.append(this.deleteBtn, divTop, divBottom);
      this.el.append(cardContainer);
   }

   closeCard() {
      const card = this.parentElement.parentElement;

      for (let i = 0; i < cards.length; i++) {
         if (cards[i].el === card) {
            cards.splice(i, 1);
         }
      }

      cardCount--;
      updateCardSizing();
      card.remove();
   }
}