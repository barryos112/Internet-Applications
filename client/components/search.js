const Search = {
  template: `
  <div class="information-container">
    <div>
      <h1> {{ currCity }} </h1>
      <input id="search-input" placeholder="Search for a city"/>
      <button v-on:click="getWeather()"> Go </button>
  
    </div>

    <div class="information-container-data">
          <table class="information-table">
            <tr class="information-table-header">
              <th></th>
              <th scope="col"> Today </th>
              <th scope="col"> Tomorrow </th>
              <th scope="col"> in 2 Days </th>
              <th scope="col"> in 3 Days </th>
              <th scope="col"> in 4 Days </th>
              <th scope="col"> in 5 Days </th>
            </tr>
            
            <tr class="information-table-row">
              <th class="information-table-header" scope="row"> Temperature </th>
              <td class="information-table-data" v-for="day in forecast"> {{ day.weather.temperature }}°C </td>
            </tr>
            <tr class="information-table-row">
              <th class="information-table-header" scope="row"> Wind Speed </th>
              <td class="information-table-data" v-for="day in forecast"> {{ day.weather.wind_speed }}km/h </td>
            </tr>
            <tr class="information-table-row">
              <th class="information-table-header" scope="row"> Rainfall Level </th>
              <td class="information-table-data" v-for="day in forecast"> {{ day.weather.rain_level }}mm </td>
            </tr>
            <tr class="information-table-row">
            <th class="information-table-header" scope="row"> Pollution </th>
            <td class="information-table-data" v-for="day in forecast"> {{ day.weather.air_pollution }}µg/m3 </td>
            </tr>
          </table>
        </div>
        <span v-if="needMask" style="font-size: 40px; font-weight: 300; color: var(--text-accent-color);"> High Air Pollution. Wear a mask! </span> <br>
        <span v-if="needUmbrella" style="font-size: 40px; font-weight: 300; color: var(--text-accent-color);"> It's going to rain, bring an umbrella! </span>
      </div>
    </div>
  `,

  data() {
    return {
      needUmbrella: false,
      needMask: false,

      location: {
        city: "Dublin",
        countryCode: "IE",
        coordinates: {
          longitude: 19.32213,
          latitude: 34.321447,
        },
      },
      time: {
        currDate: new Date(),
        currTime: {
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
        },
        solar: {
          sunrise: "",
          sunset: "",
        },
      },
      forecast: [],
    };
  },

  methods: {
    async getWeather() {
      let city = document.querySelector("#search-input").value;

      await fetch(`http://127.0.0.1:3000/weather?city=${city}`)
        .then((res) => {
          return (data = res.json());
        })
        .then((data) => {
          this.location = {
            city: data.city,
            countryCode: data.country,
            coordinates: {
              longitude: data.coord.lon,
              latitude: data.coord.lat,
            },
          };

          this.needMask = false;
          this.needUmbrella = false;

          for (let i = 0; i < data.forecast.length; i++) {
            this.forecast[i] = data.forecast[i];

            if (data.forecast[i].weather.main == "Rain") {
              this.needUmbrella = true;
            } else {
              this.forecast[i].weather["rain_level"] = 0;
            }
            if (data.forecast[i].weather.air_pollution > 10) {
              this.needMask = true;
            }
          }
        });
    },
  },
};
