const app = Vue.createApp({
  template: `
  <Header/>
  <div id="content">
    <Search/>
    <Information/>
  </div>
  `,
  components: {
    Header,
    Search,
    Information
  }
});

app.mount("#app")
