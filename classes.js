class Suggestion {
   constructor(el, name, lat, lon) {
      this.el = el;
      this.name = name;
      this.lat = lat;
      this.lon = lon;
   }
}

class Card {
   constructor(el, name, lat, lon, title, icon, temp) {
      this.el = el;
      this.name = name;
      this.lat = lat;
      this.lon = lon;
      this.title = title;
      this.icon = icon;
      this.temp = temp;
   }

   addHTMLmarkup() {
      const div = this.el;
      this.title = document.createElement("h2");
      this.icon = document.createElement("img");
      this.temp = document.createElement("p");
      this.temp.textContent = "some text";
      this.el.appendChild(this.temp);
      console.log(this.temp);
   }
}