<template>
  <v-container fluid>
    <v-row>
      <v-spacer />
      <v-col cols="8">
        <v-text-field
          label="title"
          v-model="searchTerm"
          solo
          clearable
          rounded
        />
      </v-col>
      <v-spacer />
    </v-row>

    <v-row>
      <v-col>
        <v-btn elevation="4" @click="search()">Search</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <template v-for="item in galleryResult">
        <v-col sm="12" lg="2" justify="space-around" :key="item.id">
          <p>
            {{ item.title }}
          </p>
          <a :href="item.primaryImage">
            <v-img
              contain
              height="400"
              alt="Art"
              :src="item.primaryImage"
            ></v-img>
          </a>
        </v-col>
      </template>
    </v-row>

    <v-row justify="center">
      <v-spacer />
      <v-col sm="3" lg="1">
        <v-btn icon outlined><v-icon>mdi-chevron-left</v-icon></v-btn>
      </v-col>
      <v-col sm="3" lg="1"> {{ collectionIdResults.length }} Results </v-col>
      <v-col sm="3" lg="1">
        <v-btn icon outlined><v-icon>mdi-chevron-right</v-icon></v-btn>
      </v-col>
      <v-spacer />
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
      collectionIdResults: [],
      page: 1,
      itemsPerRequest: 12,
    };
  },
  mounted: {},
  methods: {
    getSmallerArray(array) {
      return array.slice(0, 18);
    },
    async search() {
      this.galleryResult = [];
      this.collectionIdResults = await this.searchByTerm();

      this.pageButtons = Math.round(
        (this.collectionIdResults.length + this.itemsPerRequest) /
          this.itemsPerRequest
      );

      var smallArray = this.getSmallerArray(this.collectionIdResults);
      await this.getArtObjectFromIds(smallArray);
    },
    async searchByTerm() {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=" +
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

