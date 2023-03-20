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
            <router-link :to="'/dashboard/hotel/' + $root.token" class="nav-link">Hotel</router-link>
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
  },
  mounted() {
  const currentLink = window.location.pathname;
  if (currentLink.startsWith("/dashboard/") && currentLink.split("/").pop().length > 0) {
    const token = currentLink.split("/").pop();
    this.$root.isConnected = true;
    this.$root.token = token;
  }
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
    /* Police de caractère et couleurs */
    .navbar-brand,
  .navbar-nav .nav-link {
    font-family: 'Roboto', sans-serif;
    color: #333;
  }
  .navbar-nav .nav-link:hover {
    color: #666;
  }
  .navbar-nav .active > .nav-link {
    color: #007bff;
  }
  
  /* Ajout d'une bordure inférieure sur les liens */
  .navbar-nav .nav-link {
    border-bottom: 2px solid transparent;
    transition: border-bottom-color 0.2s ease-in-out;
  }
  .navbar-nav .nav-link:hover,
  .navbar-nav .active > .nav-link {
    border-bottom-color: #007bff;
  }
  
  /* Animation du hamburger menu */
  .navbar-toggler-icon {
    width: 24px;
    height: 17px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }
  .navbar-toggler-icon:hover {
    transform: scale(1.1);
  }
  .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
    transform: rotate(90deg);
  }
  
  /* Animation du dropdown menu */
  .dropdown-menu {
    opacity: 0;
    transform: translate(0, -10px);
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
  .dropdown-menu.show {
    opacity: 1;
    transform: translate(0, 0);
  }
</style>




