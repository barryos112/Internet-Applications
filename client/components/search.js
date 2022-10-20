const Search = {
  template: `
  <div id="wrap">
  <form action="" autocomplete="on">
    <input id="search" name="search" type="text" placeholder="Search for a city"/>
    <input id="search_submit" value="Rechercher" type="submit" v-on:click="registerCity()"/>
  </form>
  </div>


  <div class="information-container">
  <div class="information-container-inner">
    <div class="information-hero-container">
      <div class="weather-emoji-container">
        🌤
      </div>
      <div class="weather-text-container">
        It is currently <span style="font-weight: bold;"> cloudy </span> in Dublin. 

      </div>
    </div>
  </div>
  </div>
  `,

  data(){
    return{
      message:"Test",
      currCity: "Dublin",
    }
  },

  methods: {
    async registerCity() {
      let city = document.querySelector("search_submit").value;
      await fetch(`http://127.0.0.1:3000/weather?city=${city}`)
      .then((res) => {
        const data = res.text();
        return data
      })
      .then((data) => {
        console.log(data);
        this.message = data
        this.currCity = city;
      })
    }
  }
}




