<template>

<div class=" container-fluid mt-1 mb-1 p-2 c">

      <!-- Raccourcis - STAT -->

  <div class="row ">
      <!-- Raccourcis -->

    <div class="col">

      <!-- Statistiques de l'hôtel -->
      <div class="card bg-transparent">
        <div class="card-header text-white bg-secondary">Raccourcis</div>
        <div class="card-body">
          <div class="list-group" >
            <a href="#" class="btn btn-outline-dark m-1">Accéder à la réservation</a>
            <a href="#" class="btn btn-outline-dark m-1">Créer une réservation</a>
            <a href="#" class="btn btn-outline-dark m-1">Accéder à la location</a>
            <a href="#" class="btn btn-outline-dark m-1">Créer une location</a>
            <a href="#" class="btn btn-outline-dark m-1">Voir les disponibilités de chambres</a>
          </div>
        </div>
      </div>
      
    </div>    
      <!-- STAT -->
      <div class="col-md-6 m-1">
        <div class="card bg-transparent">
          <div class="card-header">Statistiques</div>
          <div class="card-body">
            <h6>Nombre de réservations aujourd'hui</h6>
            <p>3</p>
            <hr>
            <h6>Chambres occupées</h6>
            <p>25</p>
            <hr>
            <h6>Taux d'occupation</h6>
            <p>85%</p>
            <hr>
            <h6>Nombre de réservations annulées</h6>
            <p>2</p>
            <hr>
            <h6>Nombre de clients enregistrés aujourd'hui</h6>
            <p>5</p>
          </div>
        </div>
      </div>
</div>
      <!-- ## Infos general ## -->
      <div class="row justify-content-center align-items-center g-2">
        <div class="col">
          <div class="card bg-transparent">
            <div class="card-header">Informations générales</div>
            <div class="card-body container">

      <!-- Infos general hotel - employee -->
  <div class="row"  v-if="Object.keys(infos).length">
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
          <button type="button" class="btn btn-outline-dark m-1">Modifier</button>
        </div>
      </div>
    </div>
  </div>


              <!-- Informations sur chambres -->
      <div class="row justify-content-center align-items-center g-2">
              <!-- chambres -->

                <div class="col-4">
                  <div class="col-12">
                    <h4>Chambres</h4>
                  </div>
                  <hr>
                  <div class="row mb-3">
                    <div class="col-md-6"><strong>Nombre de chambres :</strong></div>
                    <div class="col-md-5"><span>100</span></div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6"><strong>Capacité chambres:</strong></div>
                    <div class="col-md-5"><span>Simple, Double, Suite</span></div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6"><strong>Prix :</strong></div>
                    <div class="col-md-5"><span>À partir de 100$ par nuit</span></div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6"><strong>Équipements :</strong></div>
                    <div class="col-md-5"><span>TV, climatisation, réfrigérateur, etc.</span></div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6"><strong>Vue :</strong></div>
                    <div class="col-md-5"><span>Mer, Montagne, Ville, Jardin, etc.</span></div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6"><strong>Disponibilité  :</strong></div>
                    <div class="col-md-5"><span> 34 chambres</span></div>
                  </div>
                </div>
              <!--  sample chambres -->
                
              <div class="col-md-8 rounded p-2 ">
                <table class="table table-striped table-hover rounded" style="opacity: 0.75;">
                  <thead class="table-dark rounded">
                    <tr >
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
                      <td>500$</td>
                      <td>2 personnes</td>
                      <td>Non</td>
                      <td>Vue sur la mer</td>
                      <td>TV, climatisation, minibar, etc.</td>
                      <td>Non</td>
                    </tr>
                    <tr class="table-success">
                      <td>Chambre disponible</td>
                      <td>150$</td>
                      <td>1 personne</td>
                      <td>Oui</td>
                      <td>Vue sur la ville</td>
                      <td>TV, climatisation, réfrigérateur, etc.</td>
                      <td>Non</td>
                    </tr>
                    <tr class="table-danger">
                      <td>Chambre la moins chère</td>
                      <td>100$</td>
                      <td>1 personne</td>
                      <td>Non</td>
                      <td>Vue sur le jardin</td>
                      <td>TV, climatisation, réfrigérateur, etc.</td>
                      <td>Oui</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
                
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

<div class="row">
  <div class="col-md-6">
    <div class="card bg-transparent">
      <div class="card-header">Tâches et événements du jour</div>
      <div class="card-body bg-transparent">
        <ul class="list-group">
          <li style="background-color: rgba(255,255,255,0.4);" class=" border-dark list-group-item d-flex justify-content-between align-items-center">
            Réunion avec le directeur marketing
            <span class="badge badge-primary badge-pill text-black-50">10:00</span>
          </li>
          <li style="background-color: rgba(255,255,255,0.4);" class=" border-dark list-group-item d-flex justify-content-between align-items-center">
            Préparer le rapport mensuel
            <span class="badge badge-primary badge-pill text-black-50">13:00</span>
          </li>
          <li style="background-color: rgba(255,255,255,0.4);" class=" border-dark list-group-item d-flex justify-content-between align-items-center">
            Rendez-vous avec le client ABC
            <span class="badge badge-primary badge-pill text-black-50">15:00</span>
          </li>
          <li style="background-color: rgba(255,255,255,0.4);" class=" border-dark list-group-item d-flex justify-content-between align-items-center">
            Ranger la chambre 69
            <span class="badge badge-primary badge-pill text-black-50">11:30</span>
          </li>
          <li style="background-color: rgba(255,255,255,0.4);" class=" border-dark list-group-item d-flex justify-content-between align-items-center">
            Préparer le menu pour la semaine prochaine
            <span class="badge badge-primary badge-pill text-black-50">14:00</span>
          </li>
          <li style="background-color: rgba(255,255,255,0.4);" class=" border-dark list-group-item d-flex justify-content-between align-items-center">
            Confirmer la réservation à venir avec le client XYZ
            <span class="badge badge-primary badge-pill text-black-50">16:00</span>
          </li>
        </ul>
      </div>
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
  name: 'Dashboard',
  props: {
    token: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      infos: {}
    }
  },
  created() {
    // Envoyer une requête GET au serveur avec le token de l'utilisateur
    fetch('http://localhost:3000/api/mainProfileInfos', {
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
    })
  }
}
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
