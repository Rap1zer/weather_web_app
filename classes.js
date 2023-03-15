class Suggestion {
   constructor(el, name, lat, lon) {
      this.el = el;
      this.name = name;
      this.lat = lat;
      this.lon = lon;
   }
}

class Card {
   constructor(el, name, lat, lon, title, temp, description, humidity) {
      this.el = el;
      this.name = name;
      this.lat = lat;
      this.lon = lon;
   }

   addHTMLmarkup() {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card-container");
      const divTop = document.createElement("div");
      const divBottom = document.createElement("div");
      this.temp = document.createElement("h2");
      this.title = document.createElement("h3");
      this.title.textContent = this.name;
      this.description = document.createElement("h4");
      this.humidity = document.createElement("h4");
      divTop.append(this.temp, this.description);
      divBottom.append(this.humidity, this.title);
      cardContainer.append(divTop, divBottom);
      this.el.append(cardContainer);
   }
}