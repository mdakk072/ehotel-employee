<template>
    <div class="container-fluid rounded">
      <h1>Mes réservations</h1>  
      <div class="row justify-content-start m-1">
        <div class="col-auto">
          <label for="orderBySelect" class="form-label">Trier par :</label>
          <select class="form-select form-select-sm" id="orderBySelect" v-model="orderBy">
            <option value="idReservation">ID de réservation</option>
            <option value="nomHotel">Hotel</option>
            <option value="idChambre">Numéro de chambre</option>
            <option value="checkInDate">Arrivée</option>
            <option value="checkOutDate">Départ</option>
          </select>
        </div>
      </div>
  
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID de réservation</th>
            <th>Hotel</th>
            <th>Numéro de chambre</th>
            <th>Arrivée</th>
            <th>Départ</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    <tr v-for="reservationClient in myReservations" :key="reservationClient.idReservation">
      <td>{{ reservationClient.idReservation }}</td>
      <td>{{ reservationClient.nom }}</td>
      <td>{{ reservationClient.idChambre }}</td>
      <td>{{ new Date(reservationClient.checkInDate).toLocaleDateString() }}</td>
      <td>{{ new Date(reservationClient.checkOutDate).toLocaleDateString() }}</td>
      <td>
        <button class="btn btn-primary btn-sm me-2" @click="editReservation(reservationClient)">Modifier</button>
        <button class="btn btn-danger btn-sm" @click="deleteReservation(reservationClient.idReservation)">Supprimer</button>  
      </td>
    </tr>
  </tbody>
  
      </table>
  
  <!-- Edit Reservation Modal -->
  <div class="modal fade" id="editReservationModal" tabindex="-1" aria-labelledby="editReservationModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editReservationModalLabel">Modifier la réservation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <!-- <div class="mb-3" v-if="currentReservation">
                <div class="col-md-9">Chambre: {{currentReservation.idChambre}}</div>
            </div> -->
  
            <div class="mb-3">
                <div class="col-md-9">NAS client : {{nas}}</div>
            </div>
            <div class="mb-3">
              <label for="checkInInput" class="form-label">Date d'arrivée</label>
              <input type="date" class="form-control form-control-lg" id="checkInInput" v-model="currentReservation.checkInDate">
            </div>
            <div class="mb-3">
              <label for="checkOutInput" class="form-label">Date de départ</label>
              <input type="date" class="form-control form-control-lg" id="checkOutInput" v-model="currentReservation.checkOutDate">
            </div>
          </form>
  
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-primary" @click="updateReservation()">Enregistrer les modifications</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  </template>
  
  
  <script>
  export default {
    name: "MyReservations",
    data() { 
      return {
        nas: '',
        reservationClient: {
            idReservation: '',
            idChambre: '',
            nom: '',
            checkInDate: '',
            checkOutDate: '',
    },
    selectedChambre: null,
    myReservations:[],
        nas:{},
        infos: {},
        reservations: [],
        chambres: [],
        employes: [],
        newReservation:{},
        currentReservation: {},
        loading: true,
        orderBy: 'checkInDate', // default order by column
  
      };
    },
    created() {

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
        this.nas = data.client.NAS;
        console.log("Naaaaas "+ this.nas);
        this.fetchReservations(data.client.NAS);
        // Mettre à jour les informations de l'utilisateur
        this.infos = data;
        //console.log("INNFFOOO" + this.infos)
      });
    } else {
      // Afficher un message d'erreur
      console.error('Erreur de connexion')
    }
  })
  .catch(error => {
    console.error(error)
  });

    //const NAS = this.infos;
    //console.log(nas);
    //this.fetchReservations();


    },
    methods: {



        async fetchReservations(nas) {
        try {
    // Remplacez 'http://localhost:3000' par l'URL de votre API si elle est différente
    const response = await fetch('http://localhost:3000/reservationInfosSpecificClient/'+nas, {
          headers: {
            authorization: this.$route.params.token,
          },
          //body: JSON.stringify(nas)
        });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reservatioooons = await response.json();
    console.log(reservatioooons)
    this.myReservations = reservatioooons.map(reservationClient => ({
                idReservation: reservationClient.idReservation,
                idChambre:reservationClient.idChambre,
                nom:reservationClient.nom,
                checkInDate: reservationClient.checkInDate,
                checkOutDate: reservationClient.checkOutDate,
            }));
  } catch (error) {
    console.error('Error fetching employees:', error);
    // Gérer l'erreur comme vous le souhaitez, par exemple en affichant un message d'erreur à l'utilisateur
  }
      },
      editReservation(reservation) {
    this.currentReservation = {
      ...reservation,
      idChambre: reservation.idChambre,
      idReservation : reservation.idReservation,
      checkInDate: new Date(reservation.checkInDate).toISOString().substr(0, 10),
      checkOutDate: new Date(reservation.checkOutDate).toISOString().substr(0, 10),
    };
    $('#editReservationModal').modal('show');
  },
  
  updateReservation() {
    const { idReservation, idChambre, checkInDate, checkOutDate } = this.currentReservation;
    const NASclient = this.nas
    const url = `http://localhost:3000/reservations/${idReservation}`;
  
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idChambre, NASclient, checkInDate, checkOutDate })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      // Mettre à jour la liste des réservations
      this.fetchReservations(this.nas);
      // Fermer la fenêtre modale
      $('#editReservationModal').modal('hide');
    })
    .catch(error => console.error('Error updating reservation:', error));
  }
  ,
      deleteReservation(idReservation) {
        console.log("iddd"+ idReservation);
        console.log(this.nas);
        fetch(`http://localhost:3000/reservations/${idReservation}`, {
          method: 'DELETE'
        })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          this.fetchReservations(this.nas);
        })
        .catch(error => console.error('Error deleting reservation:', error));
      },  
    },
    computed: {
      orderedReservations() {
        return this.reservations.slice().sort((a, b) => {
          if (a[this.orderBy] > b[this.orderBy]) return -1;
          if (a[this.orderBy] < b[this.orderBy]) return 1;
          return 0;
        });
      },
    },
  };
  </script>
  
  <style scoped>
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
    }
  
    .form-label {
      font-size: 1.25rem;
      font-weight: 500;
    }
  
    .form-control {
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      border: 1px solid #ced4da;
    }
  
    .form-control:focus {
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  
    .form-select {
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      border: 1px solid #ced4da;
    }
  
    .form-select:focus {
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  
    .btn-primary {
      font-size: 1rem;
      font-weight: 500;
      padding: 0.5rem 1.5rem;
      border-radius: 0.25rem;
      background-color: #007bff;
      border-color: #007bff;
    }
  
  .btn-success{
      font-size: 1rem;
      font-weight: 500;
      padding: 0.5rem 1.5rem;
      border-radius: 0.25rem;
     
    }
    .btn-primary:hover {
      background-color: #0069d9;
      border-color: #0062cc;
    }
  
    .btn-danger {
      font-size: 1rem;
      font-weight: 500;
      padding: 0.5rem 1.5rem;
      border-radius: 0.25rem;
      background-color: #dc3545;
      border-color: #dc3545;
    }
  
    .btn-danger:hover {
      background-color: #c82333;
      border-color: #bd2130;
    }
  
    table {
      font-size: 0.875rem;
    }
  
    th,
    td {
      padding: 0.75rem;
      vertical-align: middle;
      text-align: center;
    }
  
    th {
      font-size: 1rem;
      font-weight: 500;
      background-color: #f8f9fa;
    }
  
    tbody tr:nth-child(odd) {
      background-color: #f8f9fa;
    }
  
    #editReservationModal .modal-dialog {
      max-width: 500px;
    }
  
    #editReservationModal .modal-title {
      font-size: 1.5rem;
      font-weight: 500;
    }
    .container-fluid {
    background-image: url('https://images.unsplash.com/photo-1640177155742-835de7b2a9a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1854&q=80');
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
  }
  
  </style>