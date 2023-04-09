<template>
    <div class="container-fluid">
      <h1>{{ hotelInfos.hotel.nom }}</h1>
      <div class="row justify-content-center align-items-center g-2">
        <div class="col-12 col-md-4 m-2">
          <h2>Informations de l'hôtel</h2>
          <ul class="list-group m-1">
            <li class="list-group-item"><strong>Adresse :</strong> {{ hotelInfos.hotel.rue }}, {{ hotelInfos.hotel.codePostal }}, {{ hotelInfos.hotel.ville }}</li>
            <!-- <li class="list-group-item"><strong>Nombre de chambres :</strong> {{ hotelInfos.hotel.nombrechambres }}</li> -->
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
      <h2>Liste des chambres disponibles</h2>
    </div>
   
  
    <div class="col-md-6 d-flex justify-content-end">
    <div class="form-check form-switch me-3">
      <input class="form-check-input" type="checkbox" id="problemFilter" v-model="problemFilter">
      <label class="form-check-label" for="problemFilter">Filter Maybe</label>
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
            <div class="overflow-y-auto" :style="{ height: 80 + 'vh' }">
  
  
  
            <table class="table">
        <thead>
          <tr>
            <th>Numéro Chambre</th>
            <th>Prix</th>
            <th>Capacité</th>
            <th>Vue</th>
            <th>Etendue</th>
            <th>Commodités</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chambre in filteredChambres" :key="chambre.idChambre" :class="{ 'table-light': chambre.disponible, 'table-danger': chambre.problemechambre && chambre.disponible, 'table-secondary': !chambre.disponible }" v-on:click="showDetails(chambre)">
            <td>{{ chambre.idChambre }}</td>
            <td>{{ chambre.prix }} $</td>
            <td>{{ chambre.capaciteChambre }}</td>
            <td>{{ chambre.vue }}</td>
            <td>{{ chambre.etendue }}</td>
            <td>{{ chambre.commodites}}</td>
            <td>
              <button class="btn btn-primary" @click="addReservation(chambre)">Réserver</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <!-- Add Reservation Modal -->
    <div class="modal fade" id="editReservationModal" tabindex="-1" aria-labelledby="editReservationModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editReservationModalLabel">Créer une réservation</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <!-- <div class="mb-3" v-if="currentReservation">
            <label for="roomSelect" class="form-label">Chambre</label>
            <select class="form-select form-select-sm" id="roomSelect" v-model="currentReservation.idChambre">
              <option v-for="chambre in chambres" :key="chambre.idChambre" :value="chambre.idChambre">{{ chambre.idChambre }}</option>
            </select>
          </div> -->

          <div class="mb-3">
            <div class="col-md-9">Chambre: {{ selectedChambre ? selectedChambre.idChambre : '' }}</div>
          </div>

          <div class="mb-3">
            <div class="col-md-9">NAS client : {{ infos.client.NAS }}</div>
          </div>

          <div class="mb-3">
            <label for="checkInInput" class="form-label">Date d'arrivée</label>
            <input type="date" class="form-control form-control-lg" id="checkInInput" v-model="newReservation.checkInDate">
          </div>
          <div class="mb-3">
            <label for="checkOutInput" class="form-label">Date de départ</label>
            <input type="date" class="form-control form-control-lg" id="checkOutInput" v-model="newReservation.checkOutDate">
          </div>

        </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
        <button type="button" class="btn btn-primary" @click="updateReservation(selectedChambre.idChambre)">Confirmer Réservation</button>
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
    name: 'ChambresClientView',
    data() {
      return {
        newReservation:{},
        infos: {},
        newChambre: {
        prix: null,
        capaciteChambre: null,
        disponibilite: true,
        vue: 'Vue sur la ville',
        etendue: 'Petite',
        probleme: ''
      },
        problemFilter: false,
        priceSort: 'asc',
        capacityFilter: null,
        viewFilter: null,
        typeFilter: null,
        hotelInfos: {},
        selectedChambre: null,
        searchQuery: '',
        newCommodite: '',
  
      }
    },
    created() {
      const idhotel = this.$route.params.idhotel;
      console.log(idhotel);
      this.getData(idhotel);
  
       // Envoyer une requête GET au serveur avec le token de l'utilisateur pour récupérer les informations générales
  fetch('http://localhost:3000/mainProfileInfosClient', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${this.$route.params.token}`
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
        this.infos = data;
      });
    } else {
      // Afficher un message d'erreur
      console.error('Erreur de connexion')
    }
  })
  .catch(error => {
    console.error(error)
  });
     

  
      },
      computed: {
      filteredChambres() {
        let chambres = this.hotelInfos.chambres;
  
        // Search by query
        if (this.searchQuery) {
          const searchQuery = this.searchQuery.toLowerCase();
          chambres = chambres.filter(chambre => chambre.idChambre.includes(searchQuery) || chambre.description.toLowerCase().includes(searchQuery));
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
        //  this.getData()
        // Filtrer par type
        if (this.typeFilter) {
          chambres = chambres.filter(chambre => chambre.type === this.typeFilter);
        }
  
        return chambres;
      }
    },
      methods: {    
    getData(idhotel) {

  // Envoyer une requête GET
  fetch('http://localhost:3000/chambreinfosForClient/'+idhotel, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${this.$root.token}`
          },
        })
          .then(response => {
            // Vérifier le code de statut de la réponse
            if (response.status === 200) {
              // Convertir la réponse en JSON
              response.json().then(data => {
                // Afficher le JSON reçu dans la console
                console.log(data);
                // Mettre à jour les informations de l'utilisateur
                data.chambres.forEach(chambre => {
        if (chambre.commodites) {
          chambre.commodites = chambre.commodites.split(',');
        }
      });
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
      showDetails(chambre) {
        this.selectedChambre = chambre;
        console.log(chambre)
      }, 
      
      hideDetails() {
        this.selectedChambre = null;
      },

addReservation(chambre) {
  this.currentChambre = {
    ...chambre,
    checkInDate: new Date(),
    checkOutDate: new Date(),
  };
  $('#editReservationModal').modal('show');
},

updateReservation(idChambre) {
  const NASclient = this.infos.client.NAS;
  const {checkInDate, checkOutDate } = this.newReservation;
  const url = 'http://localhost:3000/reservations';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ idChambre, NASclient, checkInDate, checkOutDate })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    this.newReservation = {};
    // Fermer la fenêtre modale
    $('#editReservationModal').modal('hide');
  })
  .catch(error => console.error('Error adding reservation:', error));
}

    },mounted() {
    //TODO maybe
  },
    }
  </script>
  
  <style scoped>  
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
    color: #070707;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
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
  
  #editReservationModal .modal-dialog {
    max-width: 500px;
  }

  #editReservationModal .modal-title {
    font-size: 1.5rem;
    font-weight: 500;
  }
  
  
  
  
  </style>
  
  