<template>
    <div class="container">
      <h1 class="my-4">Locations</h1>
      <div class="row">
        <div class="col-12">
          <!-- Ici, vous pouvez ajouter des filtres de recherche pour les locations -->
        </div>
        <div class="col-12">
          <table class="table table-striped mt-4">
            <thead>
              <tr>
                <th scope="col">Client</th>
                <th scope="col">Hôtel</th>
                <th scope="col">Chambre</th>
                <th scope="col">Date d'enregistrement</th>
                <th scope="col">Date de départ prévue</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Bouclez sur la liste des locations et affichez les informations -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Locations",
    data() {
      return {
        // Données des locations
      };
    },
    methods: {
      // Méthodes pour gérer les locations
    },
  };
  </script>
  