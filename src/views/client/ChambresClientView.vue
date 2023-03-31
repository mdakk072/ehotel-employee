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
              <button class="btn btn-primary" @click="reserveChambre(index)">Réserver</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
      <div class="modal fade" tabindex="-1" role="dialog" v-bind:class="{ 'show': selectedChambre, 'd-block': selectedChambre }">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chambre {{ selectedChambre ? selectedChambre.idChambre : '' }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-on:click="hideDetails"></button>
        </div>
        <div class="modal-body" v-if="selectedChambre">
          <form>
    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          <label for="prix" class="form-label">Prix</label>
          <input type="number" class="form-control" id="prix" v-model="selectedChambre.prix">
        </div>
        <div class="mb-3">
          <label for="capaciteChambre" class="form-label">Capacité</label>
          <input type="number" class="form-control" id="capaciteChambre" v-model="selectedChambre.capaciteChambre">
        </div>
        <div class="mb-3">
          <label for="disponibilite" class="form-label">Disponibilité</label>
          <select class="form-select" id="disponibilite" v-model="selectedChambre.disponible">
          <option value="1">Disponible</option>
          <option value="0">Indisponible</option>
          </select>
  
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label for="vue" class="form-label" >Vue</label>
          <select class="form-select" id="vue" v-model="selectedChambre.vue">
            <option value="Vue sur la ville">Vue sur la ville</option>
            <option value="Vue sur la mer">Vue sur la mer</option>
            <option value="Vue sur le jardin">Vue sur le jardin</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="etendue" class="form-label">Etendue</label>
          <select class="form-select" id="etendue" v-model="selectedChambre.etendue">
            <option value="Petite">Petite</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="probleme" class="form-label">Problème</label>
          <textarea class="form-control" id="probleme" placeholder="Aucun problème" v-model="selectedChambre.probleme"></textarea>
        </div>
      </div>
    </div>
  </form>
  
  <div class="mb-3">
    <label for="commodites" class="form-label">Commodités</label>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody  v-if="selectedChambre.commodites">
    <tr v-for="(commodite, index) in selectedChambre.commodites" :key="index">
      <td><input type="text" class="form-control" v-model="selectedChambre.commodites[index]"></td>
      <td>
        <button type="button" class="btn btn-danger btn-sm float-end" v-on:click="removeCommodite(commodite)">Supprimer</button>
      </td>
    </tr>
  </tbody>
  
    </table>
    <div class="input-group mb-3">
      <input type="text" class="form-control" id="commodites" placeholder="Ajouter une commodité" v-model="newCommodite">
    <button type="button" class="btn btn-primary" v-on:click="addCommodite" :disabled="newCommodite === ''">Ajouter</button>
  </div>
  
  
  
  </div>
  
  
  
  
        </div>
        <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" v-on:click="hideDetails">Annuler</button>
    <button type="button" class="btn btn-primary" v-on:click="updateChambre" v-if="selectedChambre">Modifier chambre</button>
    <button type="button" class="btn btn-danger" v-on:click="deleteChambre" v-if="selectedChambre">Supprimer chambre</button>
  </div>
  
      </div>
    </div>
  </div>
  
  
    </div>
        </div>
      </div>
     
    </div>
  
    <!-- Ajouter chambre modale -->
  <div class="modal fade" id="ajouterChambreModal" tabindex="-1" aria-labelledby="ajouterChambreModalLabel" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ajouterChambreModalLabel">Ajouter une chambre</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="prix" class="form-label">Prix</label>
        <input type="number" class="form-control" id="prix" v-model="newChambre.prix">
      </div>
      <div class="col-md-6 mb-3">
        <label for="capaciteChambre" class="form-label">Capacité</label>
        <input type="number" class="form-control" id="capaciteChambre" v-model="newChambre.capaciteChambre">
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="disponibilite" class="form-label">Disponibilité</label>
        <select class="form-select" id="disponibilite" v-model="newChambre.disponibilite">
          <option value="true">Disponible</option>
          <option value="false">Indisponible</option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label for="vue" class="form-label">Vue</label>
        <select class="form-select" id="vue" v-model="newChambre.vue">
          <option value="Vue sur la ville">Vue sur la ville</option>
          <option value="Vue sur la mer">Vue sur la mer</option>
          <option value="Vue sur le jardin">Vue sur le jardin</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="etendue" class="form-label">Etendue</label>
        <select class="form-select" id="etendue" v-model="newChambre.etendue">
          <option value="Petite">Petite</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Grande">Grande</option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label for="probleme" class="form-label">Problème</label>
        <input type="text" class="form-control" id="probleme" placeholder="Aucun problème" v-model="newChambre.probleme">
      </div>
    </div>
  </form>
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
  
     // this.employe.idhotel = 
  
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
  
  
  
  
  
  
  </style>
  
  