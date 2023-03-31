<template>
    <div class="login-container" style="background-image: url('https://i0.wp.com/demishia.com/wp-content/uploads/2018/04/admin-login-background-images-8.jpg?ssl=1')">
      <form class="form-signin" @submit.prevent="submitForm">
        <h1 class="h1 mb-5 font-weight-normal text-center">eHotel</h1>
  
        <h1 class="h4 mb-3 font-weight-normal text-center">Connexion Client</h1>
        <label for="inputEmail" class="sr-only">Username</label>
        <input type="text" id="inputEmail" style="background: rgba(255,255,255,0.1);" class="form-control mb-3" placeholder="Username" required autofocus v-model="email">
  
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" style="background: rgba(255,255,255,0.1);" class="form-control mb-3" placeholder="Mot de passe" required v-model="password">
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Se souvenir de moi
          </label>
        </div>
        <button class="btn  btn-outline-light m-2" type="submit">Se connecter</button>
        <button class="btn  btn-outline-light m-2" @click="getRandomAccClient"  type="button">Compte Random</button>
        <button type="button" class="btn  btn-dark m-2 " data-bs-toggle="modal" data-bs-target="#exampleModal">S'inscrire</button>
      </form>
      <!-- Button trigger modal -->
  
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-scrollable">
      <div class="modal-content p-2 h-75">
        <div class="modal-header m-1">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Inscription</h1>
  
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
       
      <form @submit.prevent="createClient" id="registerForm">
        <div class="form-group">
          <label for="nas">NAS :</label>
          <input  style="background: rgba(255,255,255,0.8);" type="number" class="form-control m-1" id="nas" v-model="nas" required>
        </div>
        <div class="form-group">
          <label for="prenom">Prénom :</label>
          <input style="background: rgba(255,255,255,0.8);" type="text" class="form-control m-1" id="prenom" v-model="prenom" required>
        </div>
        <div class="form-group">
          <label for="nomFamille">Nom de famille :</label>
          <input style="background: rgba(255,255,255,0.8);" type="text" class="form-control m-1" id="nomFamille" v-model="nomFamille" required>
        </div>
        <div class="form-group">
          <label for="rue">Rue :</label>
          <input style="background: rgba(255,255,255,0.8);" type="text" class="form-control m-1" id="rue" v-model="rue" required>
        </div>
        <div class="form-group">
          <label for="codePostal">Code postal :</label>
          <input style="background: rgba(255,255,255,0.8);" type="text" class="form-control m-1" id="codePostal" v-model="codePostal" required>
        </div>
        <div class="form-group">
          <label for="ville">Ville :</label>
          <input style="background: rgba(255,255,255,0.8);" type="text" class="form-control m-1" id="ville" v-model="ville" required>
        </div>
        <div class="form-group">
          <label for="username">Nom d'utilisateur :</label>
          <input style="background: rgba(255,255,255,0.8);" type="text" class="form-control m-1" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="passwordInscription">Mot de passe :</label>
          <input style="background: rgba(255,255,255,0.8);" type="password" class="form-control m-1" id="passwordInscription" v-model="passwordInscription" required>
        </div>
  
      </form>
    </div>
        <div class="modal-footer">
          <button type="submit" class="btn  btn-outline-light" form="registerForm">S'inscrire</button>
  
        </div>
      </div>
    </div>
  </div>
    </div>
    
  </template>
  <script>

const currentDate = new Date(); // create a new Date object with the current date and time

const year = currentDate.getFullYear(); // get the current year (e.g. 2023)
const month = currentDate.getMonth(); // get the current month (0-11, where 0 = January)
const day = currentDate.getDate(); // get the current day of the month (1-31)

// create a formatted date string in the format YYYY-MM-DD
const todayDateFormatted = `${year}-${month + 1}-${day}`;

  export default {
    name: 'LoginClient',
    data() {
      return {
        email: '',
        password: '',
        nas: '',
        prenom: '',
        nomFamille: '',
        rue: '',
        codePostal: '',
        ville: '',
        dateEnregistrement: '',
        username: '',
        passwordInscription: '',
        chainehotelieres:[],
        idhotel: '',
        selectedChaine:'',
          }
    },
    mounted() {
    
        //this.chainehotelieres = data;
        //console.log(this.chainehotelieres)
    
  }
  
    ,
    methods: {
      submitForm() {
    // Créer un objet avec les données du formulaire
    const formData = {
      username: this.email,
      password: this.password
    }
  
    // Envoyer une requête POST à localhost:3000/login
    fetch('http://localhost:3000/loginClient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      // Vérifier le code de statut de la réponse
      if (response.status === 200) {
        // Convertir la réponse en JSON
        response.json().then(data => {
          // Enregistrer le jeton d'accès dans le stockage local
          localStorage.setItem('accessToken', data.token);
          // Rediriger l'utilisateur vers la page suivante
          this.$root.isConnected=true;
          this.$root.isClient=true;
          this.$root.token=data.token;
          this.$router.push('/bookRoom/'+data.token);
        });
  
      } else {
        // Afficher un message d'erreur
        console.error('Erreur de connexion');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  ,
  getRandomAccClient() {
    fetch('http://localhost:3000/randomClient')
      .then(response => response.json())
      .then(data => {
        this.email = data.username;
        this.password = data.password;
        console.log(this.$root.isConnected);
  
        
  
      })
      .catch(error => console.error(error));
  },

  createClient() {
        const client = {
          nas: this.nas,
          prenom: this.prenom,
          nomFamille: this.nomFamille,
          rue: this.rue,
          codePostal: this.codePostal,
          ville: this.ville,
          username: this.username,
          password: this.passwordInscription,
          dateEnregistrement: todayDateFormatted
        };
        console.log(client)
        // Ajouter le code pour insérer le client dans la base de données ici
      }
  
    }
  }
  </script>
  <style scoped>
  .login-container {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Style the modal window */
  .modal-content {
    background-color: rgba(128, 128, 128, 0.9); /* Black with 50% opacity */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Add shadow */
    color: #fff; /* Text color */
    padding: 2rem;
    border-radius: 10px;
  }
  
  /* Style the form button */
  .form-signin button[type="submit"] {
  
    transition: all 1s ease-in-out !important;
  }
  
  
  
  /* Add animation to modal */
  .modal {
    animation-name: fadeIn;
    animation-duration: 0.5s;
  }
  
  @keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  
  ::-webkit-scrollbar {
      width: 12px;
  }
  
  ::-webkit-scrollbar-track {
      background-color: #f5f5f5;
  }
  
  ::-webkit-scrollbar-thumb {
      background-color: #dadada;
      border-radius: 10px;
      border: 2px solid #f5f5f5;
  }
  
  ::-webkit-scrollbar-thumb:hover {
      background-color: #b3b3b3;
  }
  
  scrollbar {
      width: 12px;
  }
  
  scrollbar-track {
      background-color: #f5f5f5;
  }
  
  scrollbar-thumb {
      background-color: #dadada;
      border-radius: 10px;
      border: 2px solid #f5f5f5;
  }
  
  scrollbar-thumb:hover {
      background-color: #b3b3b3;
  }
  
  </style>
  
  
  
  