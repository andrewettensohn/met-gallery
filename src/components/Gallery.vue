<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          label="title"
          v-model="searchTerm"
          solo
          clearable
          rounded
        />
        <v-btn elevation="4" @click="search()">Search</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <template v-for="item in galleryResult">
        <v-row class="text-center" justify="center" :key="item">
          <h1 class="mb-3">
            {{ item.title }}
          </h1>
        </v-row>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Gallery",
  data() {
    return {
      searchTerm: "",
      galleryResult: [],
    };
  },
  methods: {
    async search() {
      var collectionResults = await this.searchByTerm();
      await this.getArtObjectFromIds(collectionResults);
    },
    async searchByTerm() {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=true&title=" +
          this.searchTerm
      );
      const collectionInfo = await response.json();
      const collectionIds = collectionInfo["objectIDs"];
      return collectionIds;
    },
    async getArtObjectFromIds(collectionResults) {
      collectionResults.forEach(async (id) => {
        var response = await fetch(
          "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
            id
        );
        var artworkObject = await response.json();
        this.galleryResult.push(artworkObject);
      });
    },
  },
};
</script>

