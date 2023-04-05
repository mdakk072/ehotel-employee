<template>
  <div class="container-fluid mt-2 mb-2 cbg">
    <header class="d-flex flex-wrap align-items-center justify-content-center py-3 mb-4 border-bottom mt-1">
      <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
        <img src="../assets/logo.png" alt="Logo" width="40" height="32" />
        <span class="fs-4">eHotel</span>
      </a>
    </header>

    <section class="text-center mt-5 mb-4">
      <h1 class="display-4 text-light">Application de réservation d'hôtels</h1>
    </section>

    <section>
      <h2 class="mb-3 text-light">À propos de l'application</h2>
      <p class="text-light">
        Cinq des chaînes hôtelières les plus connues ont collaboré pour développer une application permettant aux clients de réserver facilement des chambres dans leurs hôtels. L'application doit stocker des informations sur les chaînes hôtelières, les hôtels, les chambres, les clients et les employés, ainsi que l'historique des réservations et des locations.
      </p>
    </section>

    <section class="rounded">
      <h2 class="mb-3 text-light">Fonctionnalités de l'application</h2>

      <ul class="list-group list-group-flush rounded  ">
        <li class="list-group-item bg-opacity-50 bg-success bg-light bg-gradient">Recherche et réservation de chambres dans les hôtels partenaires</li>
        <li class="list-group-item bg-opacity-50 bg-success bg-light bg-gradient">Disponibilité en temps réel des chambres</li>
        <li class="list-group-item bg-opacity-50 bg-success bg-light bg-gradient">Informations sur les chaînes hôtelières (adresse, nombre d'hôtels, contact)</li>
        <li class="list-group-item bg-opacity-50 bg-success bg-light bg-gradient">Informations sur les hôtels (adresse, nombre de chambres, contact)</li>
        <li class="list-group-item bg-opacity-50 bg-success bg-light bg-gradient">Informations sur les chambres (prix, commodités, capacité, vue, possibilité d'ajouter un lit supplémentaire, problèmes/dommages)</li>
        <li class="list-group-item bg-opacity-50 bg-success bg-light bg-gradient">Stockage de l'historique des réservations et locations de chambres</li>
        <li class="list-group-item bg-opacity-50 bg-success bg-light bg-gradient">Enregistrement des clients (nom, adresse, numéro de sécurité sociale/NAS)</li>
        <li class="list-group-item bg-opacity-50 bg-success bg-light bg-gradient">Enregistrement des employés (nom, adresse, numéro de sécurité sociale/NAS, rôle/poste)</li>
        <li class="list-group-item bg-opacity-50 bg-success bg-light bg-gradient">Transformation de la réservation en location lors de l'enregistrement du client</li>
        <li class="list-group-item bg-opacity-50 bg-success bg-light bg-gradient">Paiement en ligne pour la location</li>
      </ul>
    </section>



  </div>
</template>
<script>
export default {
  name: 'ReservationApp',
  data() {
    return {
   
    };
  },
  // Les méthodes et propriétés de l'application
};
</script>
<style scoped>
  /* Importer la police "Roboto" pour le texte */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  /* Appliquer la police "Roboto" sur tout le document */
  .cbg {
    font-family: 'Roboto', sans-serif;
    background-image: url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  /* Ajouter un effet de flou à l'arrière-plan */
  ::before {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: inherit;
    filter: blur(5px);
  }

  /* Conteneur principal */
  .container {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  /* En-tête */
  header {
    background-color: transparent;
    border-bottom: none;
  }

  header a {
    color: #333;
  }

  /* Sections */
  section {
    margin-bottom: 2rem;
    background-color: rgba(0, 0, 0, 0.1); /* make section semi-transparent */
    border-radius: 10px;
    padding: 2rem;
  }

  /* Listes */

  /* Pied de page */
</style>



