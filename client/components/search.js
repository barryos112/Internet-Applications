const Search = {
  template: `
  <div id="wrap">
  <form action="" autocomplete="on">
    <input id="search" name="search" type="text" placeholder="Search for a city"/>
    <input id="search_submit" value="Rechercher" type="submit" v-on:click="registerCity()"/>
  </form>
  </div>


  <div class="information-container">
    <div class="information-table-wrapper">
        <table class="information-table">
          <tr class="information-table-row">
            <th class="information-table-header">Temperature</th>
            <td class="information-table-data">20</td>
          </tr>
          <tr class="information-table-row">
            <th class="information-table-header">Rainfall</th>
            <td class="information-table-data">2mm</td>
          </tr>
          <tr class="information-table-row">
            <th class="information-table-header">Wind Speed</th>
            <td class="information-table-data">20 km/h</td>
          </tr>
          <tr class="information-table-row">
            <th class="information-table-header">Air Pollution</th>
            <td class="information-table-data">20</td>
          </tr>
        </table>
    </div>
  </div>
  `,

  data() {
    return {
      message: "Test",
      currCity: "Dublin",
    };
  },

  methods: {
    async registerCity() {
      let city = document.querySelector("search_submit").value;
      await fetch(`http://127.0.0.1:3000/weather?city=${city}`)
        .then((res) => {
          const data = res.text();
          return data;
        })
        .then((data) => {
          console.log(data);
          this.message = data;
          this.currCity = city;
        });
    },
  },
};
