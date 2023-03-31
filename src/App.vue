<template>
  <div>
    <Navbar :is-client="isClient" :is-connected="isConnected" @deconnexion="deconnexion"/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Footer,
    Navbar,
  },
  data() {
    return {
      isConnected: false,
      isClient: false,
      token:null,
    }
  },
  methods: {
    deconnexion() {
      this.isConnected = false;
      this.isClient = false;
      this.token=null,
      this.$router.push('/');
      
      // code pour la déconnexion
    }
  }
}
</script>

<style>
/* Ajoutez vos styles personnalisés ici */
</style>
