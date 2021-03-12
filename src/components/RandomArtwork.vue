<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <p>Random Art</p>
        <v-img
          max-height="150"
          max-width="250"
          :src="artwork.primaryImage"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RandomArtwork",
  data() {
    return {
      artwork: null,
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchRandomArtwork();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchRandomArtwork",
  },
  methods: {
    getRandomElementFromArray(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    async fetchCollectionIds() {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=true"
      );
      const collectionInfo = await response.json();
      const collectionIds = collectionInfo["objectIDs"];
      return collectionIds;
    },
    async fetchArtworkObjectById(id) {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id
      );
      const artworkObject = await response.json();
      return artworkObject;
    },
    async fetchRandomArtwork() {
      var collectionIds = await this.fetchCollectionIds();
      var id = this.getRandomElementFromArray(collectionIds);
      this.artwork = await this.fetchArtworkObjectById(id);
      console.log(this.artwork);
    },
  },
};
</script>

