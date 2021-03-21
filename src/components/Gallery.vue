<template>
  <v-container fluid>
    <v-row>
      <v-spacer />
      <v-col cols="10" lg="4">
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
        <v-col lg="2" justify="space-around" :key="item.id">
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

    <v-row justify="center" v-if="galleryResult.length > 0">
      <v-spacer />
      <v-col cols="3" lg="1">
        <v-btn icon outlined><v-icon>mdi-chevron-left</v-icon></v-btn>
      </v-col>
      <v-col cols="4" lg="1">
        {{ itemsPerRequest * currentPage }} /
        {{ collectionIdResults.length }}
      </v-col>
      <v-col cols="3" lg="1">
        <v-btn icon outlined @click="onNextPage()"
          ><v-icon>mdi-chevron-right</v-icon></v-btn
        >
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
      currentPage: 1,
      totalPages: 0,
      itemsPerRequest: 12,
    };
  },
  mounted: {},
  methods: {
    getPageIds(array, startIndex, endIndex) {
      try {
        return array.slice(startIndex, endIndex);
      } catch (ex) {
        console.log(ex);
      }
    },
    async search() {
      this.galleryResult = [];
      this.collectionIdResults = await this.searchByTerm();

      this.totalPages = Math.round(
        (this.collectionIdResults.length + this.itemsPerRequest) /
          this.itemsPerRequest
      );

      var pageIds = this.getPageIds(
        this.collectionIdResults,
        0,
        this.itemsPerRequest
      );
      await this.getArtObjectFromIds(pageIds);
    },
    async onNextPage() {
      try {
        this.galleryResult = [];
        var startIndex = this.currentPage * this.itemsPerRequest;
        var endIndex = startIndex + this.itemsPerRequest;

        var pageIds = this.getPageIds(
          this.collectionIdResults,
          startIndex,
          endIndex
        );

        await this.getArtObjectFromIds(pageIds);
        this.currentPage += 1;
      } catch (ex) {
        console.log(ex);
      }
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

