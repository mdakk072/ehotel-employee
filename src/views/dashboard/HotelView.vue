<template>
  <div class="container-fluid">
    <h1 class="text-muted">{{ hotelInfos.hotel.nom }}</h1>
    <div class="row justify-content-center align-items-center g-2">
      <div class="col-12 col-md-4 m-2">
        <h2>Informations de l'hôtel</h2>
        <ul class="list-group m-1">
          <li class="list-group-item"><strong>Adresse :</strong> {{ hotelInfos.hotel.rue }}, {{ hotelInfos.hotel.codePostal }}, {{ hotelInfos.hotel.ville }}</li>
          <li class="list-group-item"><strong>Nombre de chambres :</strong> {{ hotelInfos.chambres.length }}</li>
        </ul>
      </div>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ajouterChambreModal">
  Ajouter une chambre
</button>
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
      <li><a class="dropdown-item" href="#" v-on:click="priceSort = ''">Annuler</a></li>
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
      <li><a class="dropdown-item" href="#" v-on:click="capacityFilter = ''">Annuler</a></li>
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
      <li><a class="dropdown-item" href="#" v-on:click="viewFilter = ''">Annuler</a></li>
    </ul>
  </div>
  <!-- Filter by room type -->
  <div class="dropdown ms-3">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="orderByDropdown" data-bs-toggle="dropdown" aria-expanded="false">
    Trier par
  </button>
  <ul class="dropdown-menu" aria-labelledby="orderByDropdown">
    <li><a class="dropdown-item" href="#" v-on:click="orderBy = 'prix'">Prix</a></li>
    <li><a class="dropdown-item" href="#" v-on:click="orderBy = 'capaciteChambre'">Capacité</a></li>
    <li><a class="dropdown-item" href="#" v-on:click="orderBy = 'vue'">Vue</a></li>
  </ul>
</div>

</div>
  
</div>

        <div>
          <div class="overflow-y-auto" :style="{ height: 80 + 'vh' }">



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
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button type="button" class="btn btn-primary" @click="ajouterChambre">Ajouter chambre</button>
      </div>
    </div>
  </div>
</div>

<!-- Ajout de la section employés et rôles -->
<div class="row mt-5">
  <div class="col-12">

    <h2>Employés et rôles</h2>
  </div>
  <div class="col-12">
    <div class="d-flex justify-content-start m-1">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ajouterEmployeModal">Ajouter un employé</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Rôle</th>
          <th>Salaire de début</th>
          <th>Rue</th>
          <th>Code postal</th>
          <th>Ville</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employe, index) in employees" :key="index">
          <td>{{ employe.name }}</td>
          <td>
            <select class="form-select" v-model="employe.role">
              <option :value="employe.role" selected>{{ employe.role }}</option>
              <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
            </select>
          </td>
          <td>{{ employe.salaireDebut }}</td>
          <td><input type="text" v-model="employe.rue" class="form-control" /></td>
          <td><input type="text" v-model="employe.codePostal" class="form-control" /></td>
          <td><input type="text" v-model="employe.ville" class="form-control" /></td>
          <td class="row">
            <button class="btn btn-primary" @click="modifierEmploye(index)">Modifier</button>
            <button class="btn btn-danger" @click="supprimerEmploye(employe.NASemploye)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

  
  </div>
</div>

<!-- Modal pour ajouter un employé -->
<div class="modal fade" ref="ajouterEmployeModal" id="ajouterEmployeModal" tabindex="-1" aria-labelledby="ajouterEmployeModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ajouterEmployeModalLabel">Ajouter un employé</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="ajouterEmploye">
        <div class="modal-body">
          <div class="row mb-3">
            <label for="NASemploye" class="col-sm-4 col-form-label">NAS employé:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="NASemploye" v-model="employe.NASemploye">
            </div>
          </div>
          <div class="row mb-3">
            <label for="prenom" class="col-sm-4 col-form-label">Prénom:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="prenom" v-model="employe.prenom">
            </div>
          </div>
          <div class="row mb-3">
            <label for="nomFamille" class="col-sm-4 col-form-label">Nom de famille:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="nomFamille" v-model="employe.nomFamille">
            </div>
         

          </div>
          <div class="row mb-3">
  <label for="username" class="col-sm-4 col-form-label">Nom d'utilisateur:</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="username" v-model="employe.username">
  </div>
</div>
<div class="row mb-3">
  <label for="password" class="col-sm-4 col-form-label">Mot de passe:</label>
  <div class="col-sm-8">
    <input type="password" class="form-control" id="password" v-model="employe.password">
  </div>
</div>
          <div class="row mb-3">
            <label for="rue" class="col-sm-4 col-form-label">Rue:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="rue" v-model="employe.rue">
            </div>
          </div>
          <div class="row mb-3">
            <label for="codePostal" class="col-sm-4 col-form-label">Code postal:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="codePostal" v-model="employe.codePostal">
            </div>
          </div>
          <div class="row mb-3">
            <label for="ville" class="col-sm-4 col-form-label">Ville:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="ville" v-model="employe.ville">
            </div>
          </div>
          <div class="row mb-3">
            <label for="idhotel" class="col-sm-4 col-form-label">ID hôtel:</label>

            <div class="col-sm-8">
              <input type="number" class="form-control" id="idhotel" v-model="employe.idhotel" >

            </div>
          </div>
          <div class="row mb-3">
            <label for="nomRole" class="col-sm-4 col-form-label">Nom du rôle:</label>
            <div class="col-sm-8">
              <select class="form-control" id="nomRole" v-model="employe.nomRole">
<option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
</select>
</div>
</div>
<div class="row mb-3">
<label for="salaireDebut" class="col-sm-4 col-form-label">Salaire de début:</label>
<div class="col-sm-8">
<input type="number" class="form-control" id="salaireDebut" v-model="employe.salaireDebut">
</div>
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
<button type="submit" class="btn btn-primary" @click="addEmployee">Ajouter l'employé</button>
</div>
</form>
</div>

  </div>
</div>



</template>

<script>
export default {
  name: 'EmployeeDashboard',
  data() {
    return {
      employe: {
      NASemploye: '',
      prenom: '',
      nomFamille: '',
      rue: '',
      codePostal: '',
      ville: '',
      username: '',
      password: '',
      idhotel: null,
      nomRole: '',
      salaireDebut: null
    },

      newChambre: {
      prix: null,
      capaciteChambre: null,
      disponibilite: true,
      vue: 'Vue sur la ville',
      etendue: 'Petite',
      probleme: ''
    },
      availabilityFilter: false,
      problemFilter: false,
      priceSort: 'asc',
      capacityFilter: null,
      viewFilter: null,
      typeFilter: null,
      hotelInfos: {},
      selectedChambre: null,
      searchQuery: '',
      newCommodite: '',
      employeeQuery: '',
      orderBy:'',
    newEmployee: {
      name: '',
      role: '',
     
    },
    employees: [], // Liste des employés
    roles: ['Manager','Réceptionniste', 'Gérant', 'Serveur', 'Cuisinier', 'Femme de chambre'], // Liste des rôles
  


    }
  },
  created() {
    this.getData()

   // this.employe.idhotel = 

    },
    computed: {
      filteredChambres() {
  let chambres = this.hotelInfos.chambres;

  // Search by query
  if (this.searchQuery) {
  const searchQuery = this.searchQuery.toLowerCase();
  chambres = chambres.filter(chambre => {
    return Object.values(chambre).some(value =>
      Array.isArray(value)
        ? value.some(commodite => commodite.toLowerCase().includes(searchQuery))
        : String(value).toLowerCase().includes(searchQuery)
    );
  });
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

  // Trier par attribut sélectionné
  if (this.orderBy) {
    chambres = chambres.sort((a, b) => {
      if (a[this.orderBy] < b[this.orderBy]) {
        return -1;
      } else if (a[this.orderBy] > b[this.orderBy]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  return chambres;
}

  },
    methods: {
      ajouterChambre() {
  const { prix, capaciteChambre, disponibilite, vue, etendue, probleme } = this.newChambre;
  const idHotel = this.hotelInfos.hotel.idhotel; // assuming idhotel is already defined in the component
  this.hotelInfos
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prix,
      capaciteChambre,
      disponible: disponibilite,
      vue,
      etendue,
      problemechambre: probleme
    })
  };

  fetch(`http://localhost:3000/hotels/${idHotel}/chambres`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.getData();
      $('#ajouterChambreModal').modal('hide');
      return response.text();
    })
    .then(data => {
      console.log(data);
      // clear form after successful submission
      this.newChambre.prix = null;
      this.newChambre.capaciteChambre = null;
      this.newChambre.disponibilite = true;
      this.newChambre.vue = 'Vue sur la ville';
      this.newChambre.etendue = 'Petite';
      this.newChambre.probleme = '';
    })
    .catch(error => {
      console.error('Error adding chambre:', error);
      // handle error
    });
},    
  getData() {
// Envoyer une requête GET au serveur avec le token de l'utilisateur
fetch('http://localhost:3000/chambreinfos', {
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
              data.chambres.forEach(chambre => {
      if (chambre.commodites) {
        chambre.commodites = chambre.commodites.split(',');
      }
    });
    this.hotelInfos = data;
    this.employe.idhotel = this.hotelInfos.hotel.idhotel;
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
      updateChambre() {
  const { prix, capaciteChambre, disponible, vue, etendue, problemechambre } = this.selectedChambre;
  const idhotel = this.hotelInfos.hotel.idhotel; // assuming idhotel is already defined in the component

  const idChambre = this.selectedChambre.idChambre;

  fetch(`http://localhost:3000/hotels/${idhotel}/chambres/${idChambre}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prix: prix,
      capaciteChambre: capaciteChambre,
      disponible: disponible,
      vue: vue,
      etendue: etendue,
      problemechambre: problemechambre
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error updating chambre');
    }
    return response.text();
  })
  .then(data => {
    console.log(data);
    this.getData
    this.hideDetails();

  })
  .catch(error => {
    console.error(error);
  });
},
    showDetails(chambre) {
      this.selectedChambre = chambre;
      console.log(chambre)
    }, 
    
    hideDetails() {
      this.selectedChambre = null;
    },
    deleteChambre() {
  if (1) {
  const idHotel = this.hotelInfos.hotel.idhotel; // assuming idhotel is already defined in the component

    fetch(`http://localhost:3000/hotels/${idHotel}/chambres/${this.selectedChambre.idChambre}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Chambre non trouvée');
      }
      this.selectedChambre = null;
      this.getData();
    })
    .catch(error => {
      console.error('Error deleting chambre:', error);
      alert('Une erreur est survenue lors de la suppression de la chambre.');
    });
  }
},

addCommodite() {
  if (this.newCommodite.trim() === '') {
    return; // ne rien faire si la commodité est vide
  }

  const jsonData = { nomCommodite: this.newCommodite };

  fetch(`http://localhost:3000/chambres/${this.selectedChambre.idChambre}/commodites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error adding commodite');
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      if (!this.selectedChambre.commodites) {
        this.selectedChambre.commodites = [this.newCommodite];
      } else {
        this.selectedChambre.commodites.push(this.newCommodite); // ajouter la nouvelle commodité à la liste
      }
      this.newCommodite = ''; // réinitialiser le champ d'entrée de texte
      this.getData();
    })
    .catch((error) => {
      console.error('Error adding commodite:', error);
    });
}
,removeCommodite(commodite) {
  const idHotel = this.hotelInfos.hotel.idhotel;

  fetch(`http://localhost:3000/commodite`, {
    method: 'DELETE',
    body: JSON.stringify({ idHotel, idChambre: this.selectedChambre.idChambre, nomCommodite: commodite }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error deleting commodite');
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      if (this.selectedChambre.commodites) {
        this.selectedChambre.commodites = this.selectedChambre.commodites.filter((item) => item !== commodite); // supprimer la commodité de la liste
      }
      console.log(this.selectedChambre.commodites)
      this.getData();
    })
    .catch((error) => {
      console.error('Error deleting commodite:', error);
    });
},//prblm
addEmployee() {

  const { NASemploye, prenom, nomFamille, rue, codePostal, ville, username, password, idhotel, nomRole, salaireDebut } = this.employe;
  console.log ( this.employe ) ;
  
  fetch('http://localhost:3000/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ NASemploye, prenom, nomFamille, rue, codePostal, ville, username, password, idhotel, nomRole, salaireDebut })
  })
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error adding employee');
      }
    })
    .then(data => {
      console.log(data);
      // Vider le formulaire et actualiser la liste des employés
      this.employe = {
        NASemploye: '',
        prenom: '',
        nomFamille: '',
        rue: '',
        codePostal: '',
        ville: '',
        username: '',
        password: '',
        idhotel: '',
        nomRole: '',
        salaireDebut: ''
      };
      this.fetchEmployees();
      // Fermer la modale
      this.$refs.ajouterEmployeModal.hide();
    })
    .catch(error => {
      console.error(error);
    });
}

,
  removeEmployee(index) {
    this.employees.splice(index, 1);
  },
  // Pour récupérer les informations des employés à partir de la fonction getEmployeeInfos()
  async fetchEmployees() {
  try {
    // Remplacez 'http://localhost:3000' par l'URL de votre API si elle est différente
    const response = await fetch('http://localhost:3000/employeinfos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.$root.token}`, // Utilisez le token de l'utilisateur pour l'autorisation
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const employes = await response.json();
    console.log(employes)
    this.employees = employes.map(employe => ({
      NASemploye: employe.NASemploye,
      prenom:employe.prenom,
      nomFamille:employe.nomFamille,
      name: `${employe.prenom} ${employe.nomFamille}`,
      rue: employe.rue,
      codePostal: employe.codePostal,
      ville: employe.ville,
      role: employe.role,
      salaireDebut: employe.salaireDebut,
    }));
  } catch (error) {
    console.error('Error fetching employees:', error);
    // Gérer l'erreur comme vous le souhaitez, par exemple en affichant un message d'erreur à l'utilisateur
  }
}, modifierEmploye(index) {
  const NASemploye = this.employees[index].NASemploye;
  console.log(this.employees[index])
  const { prenom, nomFamille, rue, codePostal, role, ville, salaireDebut } = this.employees[index];
  const nomRole =  role;
  const idhotel = this.hotelInfos.hotel.idhotel
  console.log(prenom, nomFamille, rue, codePostal, ville, idhotel, nomRole, salaireDebut)
  fetch(`http://localhost:3000/employees/${NASemploye}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prenom, nomFamille, rue, codePostal, ville, idhotel, nomRole, salaireDebut })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.data);
      // Update the employees array in the component with the updated employee data
    })
    .catch(error => {
      console.error(error);
    });
}
,async supprimerEmploye(NASemploye) {
      try {
        const response = await fetch(`http://localhost:3000/employees/${NASemploye}`, {
          method: 'DELETE',
        });

        if (response.status === 200) {
          // Suppression réussie, effectuez des actions supplémentaires si nécessaire
          // par exemple: rafraîchir la liste des employés
          console.log('Employee and role deleted successfully');
        } else {
          // Gérer l'erreur de suppression
          console.error('Error deleting employee and role');
        }
      } catch (error) {
        // Gérer l'erreur de requête
        console.error('Error deleting employee and role:', error);
      }
      this.getData();

    },

  




  },mounted() {
  this.fetchEmployees(); // Appeler la fonction fetchEmployees() lorsque le composant est monté
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

