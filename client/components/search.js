const Search = {
  template: `
  <div class="information-container">
    <div>
      <h1> {{ currCity }} </h1>
      <input id="search-input" placeholder="Search a city"/>
      <button v-on:click="searchCity()"> Go </button>
    </div>

    <div class="information-table-wrapper">
        <table class="information-table">
          <tr class="information-table-row">
            <th class="information-table-header">Temperature</th>
            <td class="information-table-data"> {{ temperature }}°C</td>
          </tr>
          <tr class="information-table-row">
          <th class="information-table-header">Weather <span v-if="isRaining" style="font-weight: 300"> <br/> Bring an umbrella! </span> </th>
          <td class="information-table-data">{{ weather }} </td>
          </tr>
          <tr class="information-table-row">
            <th class="information-table-header">Wind Speed</th>
            <td class="information-table-data">{{ wind_speed }} km/h</td>
          </tr>
          <tr class="information-table-row">
          <th class="information-table-header">Air Pollution <span v-if="needMask" style="font-weight: 300"> <br/>You should wear a mask! </span> </th>
            <td class="information-table-data">{{airPollution}}</td>
          </tr>
        </table>
    </div>
  </div>
  `,

  data() {
    return {
      currCity: "Dublin",
      wind_speed: 5,
      temperature: 8,
      weather: "Clouds",
      isRaining: false,
      needMask: false,
    };
  },

  methods: {
    async searchCity() {
      let city = document.querySelector("#search-input").value;

      await fetch(`http://127.0.0.1:3000/data?city=${city}`)
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((data) => {
          console.log(data);
          this.currCity = city;
          this.wind_speed = data.main_data.wind.speed;
          this.temperature = data.main_data.main.temp;
          this.weather = data.main_data.weather[0].main;
          this.airPollution = data.pollution_data.list[0].components.pm2_5;

          if (this.weather == "Rain") {
            this.isRaining = true;
          } else {
            this.isRaining = false;
          }

          if (this.airPollution > 10) {
            this.needMask = true;
          } else {
            this.needMask = false;
          }
        });
    },
  },
};
