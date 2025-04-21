<template>
  <div>
    <h2>Welcome to the Anime App</h2>
    <router-link to="/AniList">Go to Anime List</router-link>
    <br />
    <router-link to="/">Go HOME</router-link>
    <br />
    <router-link to="/about">Go about</router-link>

    <hr />

    <router-view />
  </div>
</template>
