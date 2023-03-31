<template>
    <div class="container-fluid">
  
  
  
  <div class="row justify-content-center align-items-center g-2">
    <div class="col-md-12 text-center">
      <strong class="mt-4 mb-3">Sélectionnez un hôtel parmi les differentes chaînes hôtelières pour voir la disponibilité des chambres</strong>
    </div>
  
    <div class="accordion" id="chainesAccordion">
      <div class="accordion-item" v-for="chaine in chainesHotels" :key="chaine.idchaine">
        <h2 class="accordion-header" :id="'heading' + chaine.idchaine">
          <div class="d-flex justify-content-between align-items-center">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + chaine.idchaine" aria-expanded="false" :aria-controls="'collapse' + chaine.idchaine">
      {{ chaine.nom }}
    </button>
   
  </div>
  
          
        </h2>
        <div :id="'collapse' + chaine.idchaine" class="accordion-collapse collapse" :aria-labelledby="'heading' + chaine.idchaine" data-bs-parent="#chainesAccordion">
          <div class="accordion-body">
            <div class="row">
  <div class="col-md-6">
    <h5>Bureaux</h5>
    <div class="list-group" style="max-height: 200px; overflow-y: scroll;">
      <div v-for="bureau in chaine.bureaux" :key="bureau.idBureau" class="list-group-item list-group-item-action py-3">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ bureau.ville }}</h5>
    </div>
    <small class="text-muted">
      <strong>Rue :</strong> {{ bureau.rue }}<br>
      <strong>Code postal :</strong> {{ bureau.codePostal }}<br>
      <strong>Email :</strong> {{ bureau.email }}<br>
      <strong>Numéro de téléphone :</strong> {{ bureau.numeroDeTelephone }}
    </small>
  </div>
  
  </div>
  
  
  
  </div>
  
  <div class="col-md-6">
    <h5 class="mt-4">Hôtels</h5>
    
    <ul class="list-group" style="max-height: 200px; overflow-y: scroll;">
      <li v-for="hotel in chaine.hotels" :key="hotel.idhotel" class="list-group-item">
        <strong>Nom: </strong>{{ hotel.nom }}, 
        <strong>Rue: </strong>{{ hotel.rue }}, 
        <strong>Ville: </strong>{{ hotel.ville }}
        <div class="btn-group btn-group-sm mt-2 float-end" role="group">
          <!-- <button class="btn btn-primary" @click="selectedHotel = hotel" data-bs-toggle="modal" data-bs-target="#modifierHotelModal">Modifier</button> -->
          <router-link :to="'/chambresClient/' + $root.token +'/'+ hotel.idhotel">
            <button class="btn btn-primary">Voir chambres disponibles</button>
            </router-link>
        </div>
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

  </template>
  
  
  <script>
  export default {
    name: 'BookRoomView',
    props: {
      token: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        currentChaineId: -1,
  
        newHotel: {},
        nouvelleChaine: {
          nom: '',
          nombrehotel: '',
        },
        nouveauBureau: {
          rue: '',
          codePostal: '',
          ville: '',
          email: '',
          numeroTel: '',
        },
        newBureau: {
        rue: '',
        codePostal: '',
        ville: '',
        email: '',
        numeroTel: '',
      },
      selectedChaine: null,
  
        selectedBureau: null,
        selectedHotel:null,
        hotelInfos: {
          chaineHoteliere: {},
          bureaux: [],
          hotels: [],
        },
        chainesHotels: [], // Les données des chaînes hôtelières seront stockées ici
      };
    },
    async created() {
      await this.fetchChaineHotels();
      try {
        
    const token=    this.$root.token ;
  const response = await fetch('http://localhost:3000/hotelInfo', {
  headers: {
  Authorization: token,
  },
  });
  const data = await response.json();
  this.hotelInfos = data;
  console.log(this.hotelInfos)
  } catch (error) {
  console.error('Error fetching hotel information:', error);
  }
    },
    methods: {       
      async getHotelInfos() {
    try {
      const token = this.$root.token;
      const response = await fetch('http://localhost:3000/hotelInfo', {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      this.hotelInfos = data;
      console.log(this.hotelInfos);
    } catch (error) {
      console.error('Error fetching hotel information:', error);
    }
  }
  ,
      async fetchChaineHotels() {
        try {
          // Remplacez cette URL par l'URL de votre API
          const response = await fetch("http://localhost:3000/chaines-hotels");
          const data = await response.json();
          this.chainesHotels = data;
          console.log(data)
        } catch (error) {
          console.error("Erreur lors de la récupération des données des chaînes hôtelières :", error);
        }
      },
    },
  };
  </script>
  <style scoped>
  .container-fluid {
    background-image: url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80');
    background-size: cover;
    background-blur: 10px;
  }
  
  .row {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  h2, h3 {
    color: #36393f;
  }
  
  p, small {
    color: #72767d;
  }
  
  .btn-primary {
    background-color: #7289da;
    border-color: #7289da;
  }
  
  .btn-primary:hover {
    background-color: #677bc4;
    border-color: #677bc4;
  }
  
  .btn-success {
    background-color: #43b581;
    border-color: #43b581;
  }
  
  .btn-success:hover {
    background-color: #3ca374;
    border-color: #3ca374;
  }
  
  .btn-danger {
    background-color: #f04747;
    border-color: #f04747;
  }
  
  .btn-danger:hover {
    background-color: #e13232;
    border-color: #e13232;
  }
  
  .list-group-item {
    border-radius: 5px;
  }
  
  .list-group-item:hover {
    background-color: rgba(242, 245, 250, 0.5);
  }
  
  .modal-content {
    background-color: rgba(255, 255, 255, 0.9);
  }
  
  .btn-close {
    color: #36393f;
  }
  
  .btn-close:hover {
    color: #72767d;
  }
  </style>