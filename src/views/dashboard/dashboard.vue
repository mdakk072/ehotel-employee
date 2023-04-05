<template>

<div class=" container-fluid mt-1 mb-1 p-2 c">
      <!-- ## Infos general ## -->
      <div class="row justify-content-center align-items-center g-2">
        <div class="col">
          <div class="card bg-transparent">
            <div class="card-header">Informations générales</div>
            <div class="card-body container">
      <!-- Infos general hotel - employee -->
 <!-- Infos general hotel - employee -->
<div class="row" v-if="infos">
  <!-- Hotel Info -->
  <div class="col">
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
  <!-- Employee Info -->
  <div class="col">
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

<!-- Informations sur chambres -->
<div class="row justify-content-center align-items-center g-2" v-if="chambreInfo.chambres && chambreInfo.chambres.length">
  <!-- chambres -->
  <div class="col">
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
      <div class="col-md-5"><span>{{ getEquipements() }}</span></div>
    </div>
    <div class="row mb-3" v-if="getVue()">
      <div class="col-md-6"><strong>Vue :</strong></div>
      <div class="col-md-5"><td class="text-truncate" style="max-width: 200px;">{{ getVue() }}</td></div>
    </div>   
    <div class="row mb-3" v-if="getDisponibilite()">
      <div class="col-md-6"><strong>Disponibilité  :</strong></div>
      <div class="col-md-5"><span>{{ getDisponibilite() }}</span></div>
    </div>
  </div>
  <!--  sample chambres -->
</div>


<div class="row">
    <table class="table table-striped table-hover rounded" style="opacity: 0.75;">
      <thead class="table-dark rounded">
        <tr>
          <th>Chambre</th>
          <th>Prix</th>
          <th>Capacité</th>
          <th>Disponible</th>
          <th>Vue</th>
          <th>Équipements</th>
          <th>Problème</th>
        </tr>
      </thead>
      <tbody class="rounded">
        <tr class="table-secondary">
          <td>Chambre la plus chère</td>
          <td>{{ getChambreLaPlusChere().prix }}$</td>
          <td>{{ getChambreLaPlusChere().capaciteChambre }} personnes</td>
          <td>{{ getChambreLaPlusChere().disponible ? 'Oui' : 'Non' }}</td>
          <td class="text-truncate" style="max-width: 150px;">{{ getChambreLaPlusChere().vue }}</td>
          <td>{{ getChambreLaPlusChere().commodites }}</td>
          <td>{{ getChambreLaPlusChere().problemechambre ? 'Oui' : 'Non' }}</td>
        </tr>
        <tr class="table-success">
          <td>Chambre disponible</td>
          <td>{{ getPrixMin() }}$</td>
          <td>1 personne</td>
          <td>Oui</td>
          <td class="text-truncate" style="max-width: 150px;">{{ getVue() }}</td>
          <td>{{ getEquipements() }}</td>
          <td>Non</td>
        </tr>
        <tr class="table-danger">
          <td>Chambre la moins chère</td>
          <td>{{ getPrixMin() }}$</td>
          <td>1 personne</td>
          <td>Non</td>
          <td class="text-truncate" style="max-width: 150px;">{{ getVue() }}</td>
          <td>{{ getEquipements() }}</td>
          <td>Oui</td>
        </tr>
      </tbody>
    </table>
  </div>
              <!-- Informations ChaineHoteliere -->
              <div class="row justify-content-center align-items-center g-2 rounded mb-2">
  <div class="col rounded">
    <div class="accordion accordion-flush rounded" id="accordionFlushExample">
      <div class="accordion-item rounded" style="background-color: rgba(255,255,255,0.4);">
        <h2 class="accordion-header" id="flush-headingOne">
          <button style="background: rgba(0,0,0,0.3);" class="accordion-button collapsed text-white btn btn-outline-dark rounded-top" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Informations sur la chaîne hôtelière
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <!-- Informations ChaineHoteliere -->
          <div class="accordion-body p-4 rounded-bottom" style="background-color: rgba(255,255,255,0.4);">
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
        <!-- Section Chambres -->
        <!-- Fin du contenu -->
      </div>
    </div>
  </div>
</div>     
      <!-- Tâches et événements du jour -->    
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
        const equipements = chambres.map(chambre => chambre.commodites);
        const uniqueEquipements = [...new Set(equipements)];
        return uniqueEquipements.join(', ');
      },
      getVue() {
  const chambres = this.chambreInfo.chambres;
  const vues = chambres
    .map(chambre => chambre.vue)
    .filter(vue => vue && vue.trim() !== ""); // Filter out undefined, null, and empty string values
  const uniqueVues = [...new Set(vues)];

  if (uniqueVues.length === 0) {
    return "N/A"; // Return "N/A" (or any placeholder) if there are no valid views available
  }

  return uniqueVues.join(', ');
      },

      getDisponibilite() {
        const chambres = this.chambreInfo.chambres;
        const nbDisponibles = chambres.filter(chambre => chambre.disponible === 1).length;
        const total = chambres.length;
        return `${nbDisponibles} chambres / ${total}`;
      },
      getChambreLaPlusChere() {
        const chambres = this.chambreInfo.chambres;
        const chambreLaPlusChere = chambres.reduce((prev, current) => {
          return (prev.prix > current.prix) ? prev : current
        });
        return chambreLaPlusChere;
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
.sidebar {
  background-color: #f8f9fa;
  height: 100vh;
}

.nav-link {
  color: #343a40 !important;
}


/* Modifier la couleur de fond du body */
body {
  background-color: #f2f3f4;
}

/* Modifier la police de caractère de la navbar */
.navbar-brand,
.navbar-nav .nav-link {
  font-family: 'Montserrat', sans-serif;
}

/* Ajouter de l'espace entre les liens de la navbar */
.navbar-nav .nav-link {
  margin-right: 15px;
}

/* Ajouter de l'espace entre les cartes */
.card {
  margin-bottom: 30px;
}

/* Modifier la couleur du texte des cartes */
.card-header,
.card-body {
  color: #495057;
}

/* Modifier la couleur de fond des boutons */
.btn-primary {
  background-color: #6c757d;
  border-color: #6c757d;
}
.btn-primary:hover {
  background-color: #495057;
  border-color: #495057;
}
.btn:hover {
  transform: translateY(-2px);
  transition: all 0.5s ease;
}
/* Ajouter des ombres aux cartes */
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Ajouter une animation de survol aux cartes */
.card:hover {
  transform: translateY(-1px);
  transition: all 0.3s ease;
}

/* Ajouter une animation de chargement */
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: none;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Ajouter une animation de fond */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom right, #5b86e5, #36d1dc);
  animation: bgAnimation 10s ease-in-out infinite alternate;
  z-index: -1;
}

@keyframes bgAnimation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
.c {
  background-image: url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(3px);
}

/* Style for Hotel Chain Information Section */

/* Accordion */
.accordion-button {
  background-color: #007bff;
  color: #fff;
  border-color: transparent;
}

.accordion-button:hover {
  background-color: #0069d9;
}

/* Section background */
.accordion-item {
  background-color: #f8f9fa;
}

/* Section heading */
.accordion-header {
  background-color: #e9ecef;
  color: #212529;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

/* Office list */
ul {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

ul li {
  margin-bottom: 1rem;
}

ul li strong {
  font-weight: 600;
}

/* Office details */
ul li ul {
  margin-top: 0.5rem;
  margin-bottom: 0;
}

ul li ul li {
  margin-bottom: 0.25rem;
}

/* Make the heading and subheading larger */
h3 {
  font-size: 1.5rem;
  font-weight: bold;
}

h4 {
  font-size: 1.25rem;
  font-weight: bold;
}


</style>
