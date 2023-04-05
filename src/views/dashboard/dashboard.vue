<template>
    <div class="container-fluid mt-3">
      <div class="row p-2">
        <!-- Informations sur la chaîne hôtelière -->
        <div class="col-md-4 bg-overlay">
          <div class="card">
            <div class="card-header bg-overlay">
              Chaîne hôtelière
            </div>
            <div class="card-body bg-overlay">
        <h5>{{ infos.chainehoteliere.nom }}</h5>
        <hr>
        <div class="row mb-2">
          <div class="col mb-2">
            <strong>Hotel {{ infos.hotel.nom }}</strong>
          </div>
        </div>
        <div class="row mb-1">
          <div class="col"><strong>Adresse :</strong></div>
          <div class="col-md-9">{{ infos.hotel.rue }}, {{ infos.hotel.codePostal }}, {{ infos.hotel.ville }}</div>
        </div>
        <div class="row mb-1">
          <div class="col-md-3"><strong>Téléphone :</strong></div>
          <div class="col-md-9">{{ infos.hotel.numeroTel }}</div>
        </div>
        <div class="row mb-1">
          <div class="col-md-3"><strong>E-mail :</strong></div>
          <div class="col-md-9">{{ infos.hotel.email }}</div>
        </div>
        <div class="row mb-1">
          <div class="col-md-3"><strong>Classement :</strong></div>
          <div class="col-md-9">{{ infos.hotel.classement }} étoiles</div>
        </div>
            </div>
          </div>
        </div>

        <!-- Informations sur l'employé -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              Employé
            </div>
            <div class="card-body">
             
        <div class="row mb-3">
          <div class="col-12">
            <h4>{{ infos.employe.prenom }} {{ infos.employe.nomFamille }}</h4>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-3"><strong>Adresse :</strong></div>
          <div class="col-md-9">{{ infos.employe.rue }}, {{ infos.employe.codePostal }}, {{ infos.employe.ville }}</div>
        </div>
        <div class="row mb-2">
          <div class="col-md-3"><strong> NAS :</strong></div>
          <div class="col-md-9">{{ infos.employe.NASemploye }}</div>
        </div>
        <div class="row mb-2">
          <div class="col-md-3"><strong>Rôle :</strong></div>
          <div class="col-md-9">Réceptionniste</div>
        </div>
        <div class="row mb-2">
          <div class="col m-3">
            <button type="button" class="btn btn-outline-dark m-1" data-bs-toggle="modal" data-bs-target="#modifyEmployeeModal">Modifier</button>
    
          </div>
        </div>
      </div>       
          </div>
        </div>

        <!-- Informations sur les chambres de l'hôtel -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              Chambres de l'hôtel
            </div>
            <div class="card-body">
        <div class="col-12">
          <h4>Chambres</h4>
        </div>
        <hr>
        <div class="row mb-3">
          <div class="col-md-6"><strong>Nombre de chambres :</strong></div>
          <div class="col-md-5"><span>{{ chambreInfo.chambres.length }}</span></div>
        </div>
        <div class="row mb-3" v-if="getCapaciteChambres()">
          <div class="col-md-6"><strong>Capacité chambres:</strong></div>
          <div class="col-md-5"><span>{{ getCapaciteChambres() }}</span></div>
        </div>
        <div class="row mb-3" v-if="getPrixMin()">
          <div class="col-md-6"><strong>Prix :</strong></div>
          <div class="col-md-5"><span>À partir de {{ getPrixMin() }}$ par nuit</span></div>
        </div>
        <div class="row mb-3" v-if="getEquipements()">
  <div class="col-md-6"><strong>Équipements :</strong></div>
  <div class="col-md-5">
    <div class="list-group" style="max-height: 200px; overflow-y: auto;">
      <a href="#" class="list-group-item" v-for="(equipement, index) in getEquipements()" :key="equipement" v-if="index < 3">{{ equipement }}</a>
      <a href="#" class="list-group-item" data-bs-toggle="modal" data-bs-target="#equipementsModal" v-else>...</a>
    </div>
  </div>
</div>

<div class="modal fade" id="equipementsModal" tabindex="-1" aria-labelledby="equipementsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="equipementsModalLabel">Équipements</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group">
          <li class="list-group-item" v-for="equipement in getEquipements()" :key="equipement">{{ equipement }}</li>
        </ul>
      </div>
    </div>
  </div>
</div>



<div class="row mb-3" v-if="getVue().length > 0">
  <div class="col-md-6"><strong>Vue :</strong></div>
  <div class="col-md-5">
    <ul>
      <li v-for="(vue, index) in getVue()" :key="index">{{ vue }}</li>
    </ul>
  </div>
</div>

        <div class="row mb-3" v-if="getDisponibilite()">
          <div class="col-md-6"><strong>Disponibilité  :</strong></div>
          <div class="col-md-5"><span>{{ getDisponibilite() }}</span></div>
        </div>
      </div>        
          </div>
        </div>
      </div>

      <!-- Tableau -->
      <div class="row mt-3">
  <div class="col-md-12">
    <div class="card">
      <div class="card-header bg-primary text-light">
        Tableau
      </div>
      <div class="card-body">
        <table class="table table-hover table-bordered opacity-75">
          <thead class="table-dark">
            <tr>
              <th>Chambre</th>
              <th>Prix</th>
              <th>Capacité</th>
              <th>Disponibilité</th>
              <th>Vue</th>
              <th>Commodités</th>
              <th>Étendue de la capacité de la chambre</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-secondary">
              <td class="fw-bold">La plus chère</td>
              <td>{{ getChambreLaPlusChere.prix }}$</td>
              <td>{{ getChambreLaPlusChere.capaciteChambre }} personne(s)</td>
              <td>{{ getChambreLaPlusChere.disponible ? 'Oui' : 'Non' }}</td>
              <td>{{ getChambreLaPlusChere.vue }}</td>
              <td>{{ getChambreLaPlusChere.commodites }}</td>
              <td>{{ getChambreLaPlusChere.etendue }}</td>
            </tr>
            <tr class="table-success">
              <td class="fw-bold">Disponible</td>
              <td>{{ getChambreDisponible.prix }}$</td>
              <td>{{ getChambreDisponible.capaciteChambre }} personne(s)</td>
              <td>{{ getChambreDisponible.disponible ? 'Oui' : 'Non' }}</td>
              <td>{{ getChambreDisponible.vue }}</td>
              <td>{{ getChambreDisponible.commodites }}</td>
              <td>{{ getChambreDisponible.etendue }}</td>
            </tr>
            <tr class="table-danger">
              <td class="fw-bold">La moins chère</td>
              <td>{{ getChambreLaMoinsChere.prix }}$</td>
              <td>{{ getChambreLaMoinsChere.capaciteChambre }} personne(s)</td>
              <td>{{ getChambreLaMoinsChere.disponible ? 'Oui' : 'Non' }}</td>
              <td>{{ getChambreLaMoinsChere.vue }}</td>
              <td>{{ getChambreLaMoinsChere.commodites }}</td>
              <td>{{ getChambreLaMoinsChere.etendue }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>



      <!-- Informations sur la chaîne hôtelière -->
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              Informations sur la chaîne hôtelière
            </div>
            <div class="card-body">
                <!-- Infos de la chaîne hôtelière -->
                <div class="row mb-4">
                  <div class="col">
                    <h3>{{ infos.chainehoteliere.nom }}</h3>
                    <p>{{ infos.chainehoteliere.nombrehotel }} hôtels</p>
                  </div>
                </div>
                <!-- Liste des bureaux -->
                <div class="row">
                  <div class="col">
                    <h4>Bureaux</h4>
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Ville</th>
                          <th>Adresse</th>
                          <th>Téléphone</th>
                          <th>E-mail</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="bureau in infos.bureaux" :key="bureau.idBureau">
                          <td><strong>{{ bureau.ville }}</strong></td>
                          <td>{{ bureau.rue }}, {{ bureau.codePostal }}</td>
                          <td>{{ bureau.numeroTel }}</td>
                          <td>{{ bureau.email }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>          
          </div>
        </div>
      </div>
    </div>

  <div class="modal fade" id="modifyEmployeeModal" tabindex="-1" aria-labelledby="modifyEmployeeModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifyEmployeeModalLabel">Modifier les informations de l'employé</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <div class="col-6">
                  <label for="prenom" class="form-label">Prénom :</label>
                  <input type="text" class="form-control" id="prenom" v-model="infos.employe.prenom">
                </div>
                <div class="col-6">
                  <label for="nomFamille" class="form-label">Nom :</label>
                  <input type="text" class="form-control" id="nomFamille" v-model="infos.employe.nomFamille">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <label for="rue" class="form-label">Rue :</label>
                  <input type="text" class="form-control" id="rue" v-model="infos.employe.rue">
                </div>
                <div class="col-6">
                  <label for="codePostal" class="form-label">Code postal :</label>
                  <input type="text" class="form-control" id="codePostal" v-model="infos.employe.codePostal">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <label for="ville" class="form-label">Ville :</label>
                  <input type="text" class="form-control" id="ville" v-model="infos.employe.ville">
                </div>
                <div class="col-6">
                  <label for="NASemploye" class="form-label">NAS :</label>
                  <input type="text" class="form-control" id="NASemploye" v-model="infos.employe.NASemploye">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <label for="password" class="form-label">Mot de passe :</label>
                  <input type="password" class="form-control" id="password" v-model="infos.employe.password">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            <button type="button" class="btn btn-primary" @click="editEmployee">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
    
</template>


<script>
  import axios from 'axios';

  export default {
    name: 'Dashboard',
    props: {
      token: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        infos: {},
        chambreInfo: {},
        
      };
    },
    created() {
  // Envoyer une requête GET au serveur avec le token de l'utilisateur pour récupérer les informations générales
  fetch('http://localhost:3000/mainProfileInfos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
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

  // Envoyer une requête GET au serveur avec le token de l'utilisateur pour récupérer les informations sur les chambres
  fetch('http://localhost:3000/chambreinfos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    }
  })
  .then(response => {
    // Vérifier le code de statut de la réponse
    if (response.status === 200) {
      // Convertir la réponse en JSON
      response.json().then(data => {
        // Afficher le JSON reçu dans la console
        console.log(data);
        // Mettre à jour les informations sur les chambres
        this.chambreInfo = data;
      });
    } else {
      // Afficher un message d'erreur
      console.error('Erreur de connexion')
    }
  })
  .catch(error => {
    console.error(error)
  });
}, computed: {
    chambres() {
      return this.chambreInfo.chambres;
    },
    getChambreLaPlusChere() {
      return this.chambres.reduce((prev, current) => (prev.prix > current.prix ? prev : current));
    },
    getChambreDisponible() {
      return this.chambres.find(chambre => chambre.disponible);
    },
    getChambreLaMoinsChere() {
      return this.chambres.reduce((prev, current) => (prev.prix < current.prix ? prev : current));
    },
  },

    methods: {
      getCapaciteChambres() {
        const chambres = this.chambreInfo.chambres;
        const capacites = chambres.map(chambre => chambre.capaciteChambre);
        const uniqueCapacites = [...new Set(capacites)];
        return uniqueCapacites.join(', ');
      },
      getPrixMin() {
        const chambres = this.chambreInfo.chambres;
        const prixList = chambres.map(chambre => chambre.prix);
        const prixMin = Math.min(...prixList);
        return prixMin;
      },
      getPrixMax() {
        const chambres = this.chambreInfo.chambres;
        const prixList = chambres.map(chambre => chambre.prix);
        const prixMax = Math.max(...prixList);
        return prixMax;
      },
      getEquipements() {
  const chambres = this.chambreInfo.chambres;
  const equipements = chambres.flatMap(chambre => chambre.commodites.split(', '));
  const uniqueEquipements = [...new Set(equipements)];
  return uniqueEquipements;
}


,
getVue() {
  // Get the chambres array from the chambreInfo object
  const chambres = this.chambreInfo.chambres;

  // Extract the vue property for each chambre, and filter out undefined, null, and empty string values
  const vues = chambres
    .map(chambre => chambre.vue)
    .filter(vue => vue && vue.trim() !== "");

  // Get the unique values of vues using the Set object and the spread operator
  const uniqueVues = [...new Set(vues)];

  // Return the array of unique vues
  return uniqueVues;
},

      getDisponibilite() {
        const chambres = this.chambreInfo.chambres;
        const nbDisponibles = chambres.filter(chambre => chambre.disponible === 1).length;
        const total = chambres.length;
        return `${nbDisponibles}  / ${total} chambres`;
      },
 getChambreLaPlusChere() {
  const chambres = this.chambreInfo.chambres;
  a= chambres.reduce((prev, current) => {
    return (prev.prix > current.prix) ? prev : current;
  });
},
 getChambresDisponibles() {
  const chambres = this.chambreInfo.chambres;
  return chambres.filter(chambre => chambre.disponible);
},

 getChambreLaMoinsChere() {
  const chambres = this.chambreInfo.chambres;
  return chambres.reduce((prev, current) => {
    return (prev.prix < current.prix) ? prev : current;
  });
},

      editEmployee() {
  const NASemploye = this.infos.employe.NASemploye;
  const { prenom, nomFamille, rue, codePostal, ville, idhotel } = this.infos.employe;

  fetch(`http://localhost:3000/employees/${NASemploye}/update-info`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    },
    body: JSON.stringify({ prenom, nomFamille, rue, codePostal, ville, idhotel })
  })
  .then(response => {
    if (response.status === 200) {
      console.log('Employee updated successfully');
      $('#modifyEmployeeModal').modal('hide');

    } else {
      console.error('Error updating employee');
      throw new Error('Error updating employee');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


    },
  };
</script>


<style scoped>
.container-fluid  {
  background-image: url('https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1854&q=80');
  background-size: cover;
  background-position: center;
}

.card {
  margin-bottom: 2rem;
}

.card-header {
  background-color: #f8f9fa;
  font-weight: bold;
}

.card-body {
  padding: 1.25rem;
}

.row {
  margin-bottom: 1.5rem;
}

.col {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}

.list-group-item {
  border: none;
  border-bottom: 1px solid #dee2e6;
}

.list-group-item:last-of-type {
  border-bottom: none;
}

.table {
  border: 1px solid #dee2e6;
  font-size: 0.875rem;
}

.table th, .table td {
  padding: 0.75rem;
}

.table thead th {
  border-bottom: 2px solid #dee2e6;
  background-color: #343a40;
  color: #fff;
}

.table-secondary {
  background-color: #f8f9fa;
}

.table-success {
  background-color: #d4edda;
}

.table-danger {
  background-color: #f8d7da;
}

.fw-bold {
  font-weight: bold;
}
</style>
