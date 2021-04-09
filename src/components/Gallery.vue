<template>
  <v-container fluid>
    <v-row>
      <v-spacer />
      <v-col cols="10" lg="4">
        <v-text-field
          label="Search"
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
          <p class="font-weight-medium">
            {{ item.title }}
          </p>
          <div v-if="item.artistDisplayName">
            By {{ item.artistDisplayName }}
          </div>
          <div v-if="!item.artistDisplayName">Unknown Author</div>
          <a :href="item.primaryImage" target="_blank">
            <v-img
              contain
              height="400"
              alt="Art"
              :src="item.primaryImage"
            ></v-img>
          </a>
          <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Info
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-if="item.medium">
                    <v-list-item two-line >
                      <v-list-item-content>
                        <v-list-item-title >Medium</v-list-item-title>
                        <v-list-item-subtitle>{{item.medium}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>           
                    </div>
                    <div v-if="item.culture">
                      <v-divider />
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title >Culture</v-list-item-title>
                          <v-list-item-subtitle>{{item.culture}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                    <div v-if="item.period">
                      <v-divider />
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title >Period</v-list-item-title>
                          <v-list-item-subtitle>{{item.period}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                    <div v-if="item.artistDisplayName && item.artistDisplayBio">
                      <v-divider />
                      <v-list-item three-line >
                        <v-list-item-content>
                          <v-list-item-title >Artist</v-list-item-title>
                          <v-list-item-subtitle>{{item.artistDisplayName}}</v-list-item-subtitle>
                          <v-list-item-subtitle>{{item.artistDisplayBio}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>          
        </v-col>
      </template>
    </v-row>

    <v-row justify="center" v-if="galleryResult.length > 0">
      <v-spacer />
      <v-col cols="3" lg="1">
        <v-btn icon outlined @click="onPreviousPage()"
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
      </v-col>
      <v-col cols="4" lg="1">
        {{displayCountMessage}}
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
      currentPage: 0,
      totalPages: 0,
      itemsPerRequest: 12,
      displayCountMessage: "",
    };
  },
  methods: {
    getPageIds(array, startIndex, endIndex) {
      return array.slice(startIndex, endIndex);
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
      this.currentPage = 0;
    },
    async onNextPage() {
      if (this.currentPage + 1 >= this.totalPages) return;

      this.currentPage += 1;
      var startIndex = this.currentPage * this.itemsPerRequest;
      var endIndex = startIndex + this.itemsPerRequest;
      this.galleryResult = [];

      var pageIds = this.getPageIds(
        this.collectionIdResults,
        startIndex,
        endIndex
      );

      await this.getArtObjectFromIds(pageIds);
    },
    async onPreviousPage() {
      if (this.currentPage <= 0) return;

      this.currentPage -= 1;
      var startIndex = this.currentPage * this.itemsPerRequest;
      var endIndex = startIndex + this.itemsPerRequest;
      this.galleryResult = [];

      var pageIds = this.getPageIds(
        this.collectionIdResults,
        startIndex,
        endIndex
      );

      await this.getArtObjectFromIds(pageIds);
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
        this.getPageDisplayCountMessage();
      });
    },
    getPageDisplayCountMessage()
    {
      var message = "";
      var displayedCount = 0;

      if(this.galleryResult.length >= this.itemsPerRequest)
      {
        displayedCount = this.itemsPerRequest * this.currentPage + this.itemsPerRequest;
        message = displayedCount +  " / " + this.collectionIdResults.length;
      }
      else
      {
        displayedCount = this.collectionIdResults.length;
        message = displayedCount + " / " + this.collectionIdResults.length;
      }
      this.displayCountMessage = message;
    },
  },
};
</script>

