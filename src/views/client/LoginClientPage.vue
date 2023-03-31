<template>
<LoginClient/>

</template>
<script>
import Footer from '../../components/Footer.vue';
import LoginClient from '../../components/client/LoginClient.vue';

export default {
    name: 'LoginClientPage',
    components: {
    Footer,LoginClient
    
    }
}
</script>

<style>

/* Modifier la couleur de fond du body */
body {
    background-color: #f8f9fa;
  }
  
 
  /* Ajouter de l'espace entre les cartes */
  .card {
    margin-bottom: 20px;
  }
  
  /* Modifier la couleur du texte des cartes */
  .card-header,
  .card-body {
    color: #212529;
  }
  
  /* Modifier la couleur de fond des boutons */
  .btn-outline-dark {
    background-color: #212529;
    color: #fff;
  }
  
  /* Ajouter de l'espace entre les boutons */
  .list-group a,
  .btn {
    margin-bottom: 10px;
  }
  

  .animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    background-image: linear-gradient(45deg, #f3ec78 0%, #af4261 100%);
    opacity: 0.7;
    z-index: -1;
    animation: pulse 3s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0% {
      opacity: 0.85;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0.85;
    }
  }
</style>

