let weather = {
  apiKey: "f058fe1cad2afe8e2ddc5d063a64cecb",
  unsplashApiKey: "nss1Aw6orpKcSL0M5lWGPOvFSFQGKZOu3CthHbmI2Z0",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  fetchBackgroundImage: function (city) {
    const pageVal = 1;
    fetch(
      `https://api.unsplash.com/search/photos?page=${pageVal}&query=${city}&client_id=${this.unsplashApiKey}&per_page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
           // Välj en slumpmässig bild från resultatet
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const imageUrl = data.results[randomIndex].urls.regular;
        } else {
          // Fallback om ingen bild hittas
          document.body.style.backgroundImage = "url('/path/to/default-background.jpg')";
        }
      })
      .catch((error) => {
        console.error("Error fetching background image: ", error);
        // Fallback vid fel
        document.body.style.backgroundImage = "url('/path/to/default-background.jpg')";
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Vädret i " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    
    // Fetch background image for the city
    this.fetchBackgroundImage(name);
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Malmö");
