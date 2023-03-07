const apiKey = "5fdd177d8a8e9368bfe110e3e179e65d";
let coord = [114.1577, 114.1577];

async function getWeather(lat, lon) {
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
	const response = await fetch(url);
   return await response.json();
}

async function getCoord(city, limit) {
   if (city != "") {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`;
      const response = await fetch(url);
      return response.json();
   } else {
      return 0;
   }
}