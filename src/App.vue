<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Random Work</router-link> |
      <router-link to="/browse">Browse</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
 @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
#app {
  font-family: 'Roboto';
  text-align: center;
  justify-content: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

