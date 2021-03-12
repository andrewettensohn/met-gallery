<template>
  <v-container fluid>
    <v-row class="text-center" justify="center">
      <v-col class="text-center">
        <div class="subheading font-weight-bold">{{ artwork.title }}</div>
        <div v-if="artwork.artistDisplayName">
          By {{ artwork.artistDisplayName }}
        </div>
        <div v-if="!artwork.artistDisplayName">Unknown Author</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <v-img contain height="800" :src="artwork.primaryImage"></v-img>
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
    },
  },
};
</script>

