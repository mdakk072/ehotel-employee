<template>
    <div class="container-fluid">
      <h1>{{ hotelInfos.hotel.nom }}</h1>
      <div class="row">
        <div class="col-12 col-md-6">
          <h2>Informations de l'hôtel</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Adresse :</strong> {{ hotelInfos.hotel.rue }}, {{ hotelInfos.hotel.codePostal }}, {{ hotelInfos.hotel.ville }}</li>
            <li class="list-group-item"><strong>Nombre de chambres :</strong> {{ hotelInfos.hotel.nombrechambres }}</li>
          </ul>
        </div>
        <div class="col-12 col-md-6">
          <h2>Liste des chambres</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID Chambre</th>
                <th>Prix</th>
                <th>Capacité</th>
                <th>Disponibilité</th>
                <th>Vue</th>
                <th>Etendue</th>
                <th>Problème</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="chambre in hotelInfos.chambres" :key="chambre.idChambre">
                <td>{{ chambre.idChambre }}</td>
                <td>{{ chambre.prix }}</td>
                <td>{{ chambre.capaciteChambre }}</td>
                <td>{{ chambre.disponible ? 'Disponible' : 'Indisponible' }}</td>
                <td>{{ chambre.vue }}</td>
                <td>{{ chambre.etendue }}</td>
                <td>{{ chambre.problemechambre ? 'Oui' : 'Non' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HotelView',
    data() {
    return {
        hotelInfos: {}
    }
  },
    created() {
    // Envoyer une requête GET au serveur avec le token de l'utilisateur
    fetch('http://localhost:3000/api/hotelInfos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.$root.token}`
      }
    })
    .then(response => {
      // Vérifier le code de statut de la réponse
      if (response.status === 200) {
        // Convertir la réponse en JSON
        response.json().then(data => {
          // Afficher le JSON reçu dans la console
          console.log(data);
          // Mettre à jour les informations de l'utilisateur
          this.hotelInfos = data;
        });
      } else {
        // Afficher un message d'erreur
        console.error('Erreur de connexion')
      }
    })
    .catch(error => {
      console.error(error)
    })
  }
  }
  </script>
  
  <style>
  /* Ajoutez ici vos styles personnalisés pour le tableau de bord de l'employé */
  </style>
  