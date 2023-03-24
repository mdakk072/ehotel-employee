<template>
    <div class="container">
      <h1 class="my-4">Clients</h1>
      <div class="row">
        <div class="col-12">
          <!-- Ici, vous pouvez ajouter des filtres de recherche pour les clients -->
        </div>
        <div class="col-12">
          <table class="table table-striped mt-4">
            <thead>
              <tr>
                <th scope="col">Nom complet</th>
                <th scope="col">Adresse</th>
                <th scope="col">Numéro de sécurité sociale / NAS</th>
                <th scope="col">Date d'enregistrement</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Bouclez sur la liste des clients et affichez les informations -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Clients",
    data() {
      return {
        // Données des clients
      };
    },
    methods: {
      // Méthodes pour gérer les clients
    },
  };
  </script>
  