<template>
  <div class="anime-list">
    <div v-for="anime in animeList" :key="anime.id" class="anime-card">
      <img :src="anime.coverImage.large" :alt="anime.title.romaji" />
      <h3>{{ anime.title.romaji }}</h3>
      <p>
        {{
          anime.description
            ? anime.description.substring(0, 100) + '...'
            : 'No description available'
        }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimeList',
  data() {
    return {
      animeList: [],
    }
  },
  created() {
    this.fetchAnimeData()
  },
  methods: {
    async fetchAnimeData() {
      const query = `
          query {
            Page(page: 1, perPage: 10) {
              media(type: ANIME, sort: POPULARITY_DESC) {
                id
                title {
                  romaji
                  english
                }
                coverImage {
                  large
                }
                description
              }
            }
          }
        `

      try {
        const response = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ query }),
        })
        const data = await response.json()
        console.log(data) // Log data to verify
        this.animeList = data.data.Page.media
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
}
</script>

<style scoped>
.anime-list {
  display: flex;
  overflow-x: scroll;
  gap: 20px;
}

.anime-card {
  width: 200px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
}

.anime-card img {
  width: 100%;
  border-radius: 8px;
}

.anime-card h3 {
  font-size: 1.2em;
  margin: 10px 0;
}
</style>
