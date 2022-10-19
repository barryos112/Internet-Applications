const Search = {
  template: `
    <div class="search-container">
      <div class="search-input-container">
        <input id="search-field" onfocus="this.placeholder=''" onblur="this.placeholder='Search a city! 🏙'" class="search-input" type="text" placeholder="Search a city! 🏙"/>
        <button class="search-button" v-on:click="registerCity()"> Go </button>
      </div>
    </div>
  `,
  methods: {
    registerCity() {
      console.log(document.querySelector("#search-field").value)
    }
  }
};
