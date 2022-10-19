const app = Vue.createApp({
  template: `
  <Header/>
  <div id="content">
    <Search/>
  </div>
  `,
  components: {
    Header,
    Search,
  }
});

app.mount("#app")
