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
      this.icon = document.createElement("img");
      this.temp = document.createElement("h2");
      this.title = document.createElement("h3");
      this.title.textContent = this.name;
      this.temp.textContent = "some text";
      this.el.append(this.temp, this.title, this.icon);
   }
}