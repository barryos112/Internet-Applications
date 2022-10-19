const Search = {
  template: `
    <div class="search-container">
      <div class="search-input-container">
        <input id="search-field" onfocus="this.placeholder=''" onblur="this.placeholder='Search a city! 🏙'" class="search-input" type="text" placeholder="Search a city! 🏙"/>
        <button class="search-button" v-on:click="registerCity()"> Go </button>
      </div>
    </div>
  
    <div class="information-container">
    <div class="information-container-inner">
      <div class="information-hero-container">
        <div class="weather-emoji-container">
          🌤
        </div>
        <div class="weather-text-container">
          It is currently <span style="font-weight: bold;"> {{ message }} </span> in {{ currCity }}.
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
      let city = document.querySelector("#search-field").value;
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




