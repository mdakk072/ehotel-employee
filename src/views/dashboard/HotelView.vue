<template>
  <div class="container-fluid">
    <h1>{{ hotelInfos.hotel.nom }}</h1>
    <div class="row justify-content-center align-items-center g-2">
      <div class="col-12 col-md-4 m-2">
        <h2>Informations de l'hôtel</h2>
        <ul class="list-group m-1">
          <li class="list-group-item"><strong>Adresse :</strong> {{ hotelInfos.hotel.rue }}, {{ hotelInfos.hotel.codePostal }}, {{ hotelInfos.hotel.ville }}</li>
          <li class="list-group-item"><strong>Nombre de chambres :</strong> {{ hotelInfos.hotel.nombrechambres }}</li>
        </ul>
      </div>
    </div>
    <div class="row justify-content-center align-items-center g-2">
      <div class="col-md-4 input-group mb-3">
  <span class="input-group-text" id="search-addon">
    <i class="bi bi-search"></i>
  </span>
  <input type="text" class="form-control" placeholder="Rechercher" aria-label="Search" aria-describedby="search-addon" v-model="searchQuery">
</div>
    </div>
    <div class="row p-1">
      
      <div class="col p-1 m-1">
        <div class="row align-items-center mb-3">
  <div class="col-md-6">
    <h2>Liste des chambres</h2>
  </div>
 

  <div class="col-md-6 d-flex justify-content-end">
  <div class="form-check form-switch me-3">
    <input class="form-check-input" type="checkbox" id="availabilityFilter" v-model="availabilityFilter">
    <label class="form-check-label" for="availabilityFilter">Disponibles seulement</label>
  </div>
  <div class="form-check form-switch me-3">
    <input class="form-check-input" type="checkbox" id="problemFilter" v-model="problemFilter">
    <label class="form-check-label" for="problemFilter">Avec problème</label>
  </div>
  

  
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="priceSortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
      Trier par prix
    </button>
    <ul class="dropdown-menu" aria-labelledby="priceSortDropdown">
      <li><a class="dropdown-item" href="#" v-on:click="priceSort = 'asc'">Prix croissant</a></li>
      <li><a class="dropdown-item" href="#" v-on:click="priceSort = 'desc'">Prix décroissant</a></li>
    </ul>
  </div>
  <!-- Filter by room capacity -->
  <div class="dropdown ms-3">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="capacityFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
      Capacité de la chambre
    </button>
    <ul class="dropdown-menu" aria-labelledby="capacityFilterDropdown">
      <li><a class="dropdown-item" href="#" v-on:click="capacityFilter = 1">1 personne</a></li>
      <li><a class="dropdown-item" href="#" v-on:click="capacityFilter = 2">2 personnes</a></li>
      <li><a class="dropdown-item" href="#" v-on:click="capacityFilter = 3">3 personnes ou plus</a></li>
    </ul>
  </div>
  <!-- Filter by room view -->
  <div class="dropdown ms-3">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="viewFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
      Vue de la chambre
    </button>
    <ul class="dropdown-menu" aria-labelledby="viewFilterDropdown">
      <li><a class="dropdown-item" href="#" v-on:click="viewFilter = 'Vue sur la ville'">Vue sur la ville</a></li>
      <li><a class="dropdown-item" href="#" v-on:click="viewFilter = 'Vue sur la mer'">Vue sur la mer</a></li>
      <li><a class="dropdown-item" href="#" v-on:click="viewFilter = 'Vue sur le jardin'">Vue sur le jardin</a></li>
    </ul>
  </div>
  <!-- Filter by room type -->
  <div class="dropdown ms-3">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="typeFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
      Type de chambre
    </button>
    <ul class="dropdown-menu" aria-labelledby="typeFilterDropdown">
      <li><a class="dropdown-item" href="#" v-on:click="typeFilter = 'Standard'">Standard</a></li>
      <li><a class="dropdown-item" href="#" v-on:click="typeFilter = 'Deluxe'">Deluxe</a></li>
      <li><a class="dropdown-item" href="#" v-on:click="typeFilter = 'Suite'">Suite</a></li>
    </ul>
  </div>
</div>
  
</div>

        <div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Prix</th>
          <th>Capacité</th>
          <th>Disponibilité</th>
          <th>Vue</th>
          <th>Etendue</th>
          <th>Problème</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="chambre in filteredChambres" :key="chambre.idChambre" :class="{ 'table-light': chambre.disponible, 'table-danger': chambre.problemechambre && chambre.disponible, 'table-secondary': !chambre.disponible }" v-on:click="showDetails(chambre)">
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

    <div class="modal fade" tabindex="-1" role="dialog" v-bind:class="{ 'show': selectedChambre, 'd-block': selectedChambre }">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedChambre ? selectedChambre.idChambre : '' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-on:click="hideDetails"></button>
          </div>
          <div class="modal-body">
            <p>Prix: {{ selectedChambre ? selectedChambre.prix : '' }}</p>
            <p>Capacité: {{ selectedChambre ? selectedChambre.capaciteChambre : '' }}</p>
            <p>Disponibilité: {{ selectedChambre ? (selectedChambre.disponible ? 'Disponible' : 'Indisponible') : '' }}</p>
            <p>Vue: {{ selectedChambre ? selectedChambre.vue : '' }}</p>
            <p>Etendue: {{ selectedChambre ? selectedChambre.etendue : '' }}</p>
            <p>Problème: {{ selectedChambre ? (selectedChambre.problemechambre ? 'Oui' : 'Non') : '' }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" v-on:click="hideDetails">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'EmployeeDashboard',
  data() {
    return {
      availabilityFilter: false,
      problemFilter: false,
      priceSort: 'asc',
      capacityFilter: null,
      viewFilter: null,
      typeFilter: null,
      hotelInfos: {},
      selectedChambre: null,
      searchQuery: '',

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
    },
    computed: {
    filteredChambres() {
      let chambres = this.hotelInfos.chambres;

      // Search by query
      if (this.searchQuery) {
        const searchQuery = this.searchQuery.toLowerCase();
        chambres = chambres.filter(chambre => chambre.nom.toLowerCase().includes(searchQuery) || chambre.description.toLowerCase().includes(searchQuery));
      }

      // Filtrer par disponibilité
      if (this.availabilityFilter) {
        chambres = chambres.filter(chambre => chambre.disponible);
      }

      // Filtrer par problème
      if (this.problemFilter) {
        chambres = chambres.filter(chambre => chambre.problemechambre);
      }

      // Trier par prix
      if (this.priceSort === 'asc') {
        chambres = chambres.sort((a, b) => a.prix - b.prix);
      } else {
        chambres = chambres.sort((a, b) => b.prix - a.prix);
      }

      // Filtrer par capacité
      if (this.capacityFilter) {
        chambres = chambres.filter(chambre => {
          if (this.capacityFilter === 1) return chambre.capaciteChambre === 1;
          if (this.capacityFilter === 2) return chambre.capaciteChambre === 2;
          if (this.capacityFilter === 3) return chambre.capaciteChambre >= 3;
        });
      }

      // Filtrer par vue
      if (this.viewFilter) {
        chambres = chambres.filter(chambre => chambre.vue === this.viewFilter);
      }

      // Filtrer par type
      if (this.typeFilter) {
        chambres = chambres.filter(chambre => chambre.type === this.typeFilter);
      }

      return chambres;
    }
  },
    methods: {
    showDetails(chambre) {
      this.selectedChambre = chambre;
      console.log(chambre)
    }, hideDetails() {
      this.selectedChambre = null;
    },


  },
  }
</script>

<style scoped>
  /* Ajoutez ici vos styles personnalisés pour le tableau de bord de l'employé */
  .table-light td {
    background-color: #e7f5ff;
  }
  .table-danger td {
    background-color: #f8d7da;
  }
  .table-secondary td {
    background-color: #f5f5f5;
  }

  .container-fluid {
  background-image: url('https://images.unsplash.com/photo-1594145070100-c771df5152fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');
  background-size: cover;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.list-group-item {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  margin-bottom: 5px;
  padding: 10px;
}

.table {
  background-color: #fff;
  border-radius: 10px;
}

.table th, .table td {
  padding: 10px;
}

.table-light {
  background-color: rgba(255, 255, 255, 0.5);
}

.table-danger {
  background-color: #f8d7da;
}

.table-secondary {
  background-color: #e2e3e5;
}

.modal-title {
  font-weight: bold;
  font-size: 24px;
}

.modal-body p {
  margin-bottom: 5px;
}

.modal-footer button {
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
}

.modal-footer button:hover {
  cursor: pointer;
  background-color: #5a6268;
}


</style>

