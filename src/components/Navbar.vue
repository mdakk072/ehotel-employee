<template>





  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">eHotel</router-link>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto" id="">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item" v-if="isConnected">
            <router-link :to="'/dashboard/' + $root.token" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="isConnected">
            <router-link to="/dashboard" class="nav-link">Hotel</router-link>
          </li>
          <li class="nav-item" v-if="isConnected">
            <router-link to="/dashboard" class="nav-link">Chambres</router-link>
          </li>
          <li class="nav-item" v-if="isConnected">
            <router-link to="/dashboard" class="nav-link">Clients</router-link>
          </li>
          <li class="nav-item" v-if="isConnected">
            <router-link to="/dashboard" class="nav-link">Réservation</router-link>
          </li>
          <li class="nav-item" v-if="isConnected">
            <router-link to="/dashboard" class="nav-link">Location</router-link>
          </li>
          
          <li class="nav-item" v-if="!isConnected">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
        </ul>
        <div v-if="isConnected" class="d-flex">
          <a class="btn btn-outline-danger m-2" @click="$emit('deconnexion')">Déconnexion</a>
        </div>
    </div>
    
  </div>
</nav>

</template>

<script>
export default {
  name: 'Navbar',
  props: {
    isConnected: Boolean
  }
}
</script>

<style scoped>
 /* Modifier la police de caractère de la navbar */
  .navbar-brand,
  .navbar-nav .nav-link {
    font-family: 'Helvetica Neue', sans-serif;
  }
  
  /* Ajouter de l'espace entre les liens de la navbar */
  .navbar-nav .nav-link {
    margin-right: 10px;
  }
  
</style>>




