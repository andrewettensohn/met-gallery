<template>
  <v-app>
    <v-app-bar app light>
      <div class="d-flex align-center">
        <p>The MET Gallery</p>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <RandomArtwork />
    </v-main>
  </v-app>
</template>

<script>
import RandomArtwork from "./components/RandomArtwork";

export default {
  name: "App",

  components: {
    RandomArtwork,
  },

  data: () => ({
    //
  }),
};
</script>
