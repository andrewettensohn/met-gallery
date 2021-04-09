<template>
  <v-container fluid fill-height>

    <v-row class="mb-0">
      <v-col class="text-center">
        <i class="font-italic">{{ artwork.title }}</i>
        <p v-if="artwork.artistDisplayName">
          By {{ artwork.artistDisplayName }}
        </p>
        <p v-if="!artwork.artistDisplayName">Unknown Author</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-img
          contain
          height="400"
          alt="Some random art should be here."
          :src="artwork.primaryImage"
        ></v-img>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-spacer />
      <v-col lg="3" cols="10" >
        <v-card 
          class="mx-auto justify-center text-center"
          tile>
          <div v-if="artwork.medium">
           <v-list-item two-line >
            <v-list-item-content>
              <v-list-item-title >Medium</v-list-item-title>
              <v-list-item-subtitle>{{artwork.medium}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>           
          </div>
          <div v-if="artwork.culture">
            <v-divider />
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title >Culture</v-list-item-title>
                <v-list-item-subtitle>{{artwork.culture}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-if="artwork.period">
            <v-divider />
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title >Period</v-list-item-title>
                <v-list-item-subtitle>{{artwork.period}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-if="artwork.artistDisplayName && artwork.artistDisplayBio">
            <v-divider />
            <v-list-item three-line >
              <v-list-item-content>
                <v-list-item-title >Artist</v-list-item-title>
                <v-list-item-subtitle>{{artwork.artistDisplayName}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{artwork.artistDisplayBio}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>
      </v-col>
      <v-spacer />
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

