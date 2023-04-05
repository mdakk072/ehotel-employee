<template>
  <div class="container-fluid rounded">
    <h1>Gestion des réservations</h1>
    <div class="row mb-4">
      <div class="col-md-3">
        <label for="roomSelect" class="form-label">ID de chambre :</label>
        <select class="form-select" id="roomSelect" v-model="newReservation.idChambre">
          <option v-for="chambre in chambres" :key="chambre.idChambre" :value="chambre.idChambre">{{ chambre.idChambre }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="nasInput" class="form-label">NAS client :</label>
        <input type="text" class="form-control form-control-lg" id="nasInput" v-model="newReservation.NASclient">
      </div>
      <div class="col-md-2">
        <label for="checkInInput" class="form-label">Arrivée :</label>
        <input type="date" class="form-control form-control-lg" id="checkInInput" v-model="newReservation.checkInDate">
      </div>
      <div class="col-md-2">
        <label for="checkOutInput" class="form-label">Départ :</label>
        <input type="date" class="form-control form-control-lg" id="checkOutInput" v-model="newReservation.checkOutDate">
      </div>
      <div class="col-md-2 d-flex align-items-end">
        <button type="submit" class="btn btn-success w-100" @click.prevent="addReservation">Ajouter</button>
      </div>
    </div>

    <div class="row justify-content-start m-1">
      <div class="col-auto">
        <label for="orderBySelect" class="form-label">Trier par :</label>
        <select class="form-select form-select-sm" id="orderBySelect" v-model="orderBy">
          <option value="idReservation">ID</option>
          <option value="idChambre">ID de chambre</option>
          <option value="NASclient">NAS client</option>
          <option value="checkInDate">Arrivée</option>
          <option value="checkOutDate">Départ</option>
        </select>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>ID de chambre</th>
          <th>NAS client</th>
          <th>Arrivée</th>
          <th>Départ</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in orderedReservations" :key="reservation.idReservation">
          <td>{{ reservation.idReservation }}</td>
          <td>{{ reservation.idChambre }}</td>
          <td>{{ reservation.NASclient }}</td>
          <td>{{ new Date(reservation.checkInDate).toLocaleDateString() }}</td>
          <td>{{ new Date(reservation.checkOutDate).toLocaleDateString() }}</td>
          <td>
            <button class="btn btn-primary btn-sm me-2" @click="editReservation(reservation)">Modifier</button>
            <button class="btn btn-danger btn-sm" @click="deleteReservation(reservation.idReservation)">Supprimer</button>
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
          <div class="mb-3" v-if="currentReservation">
            <label for="roomSelect" class="form-label">Chambre</label>
            <select class="form-select form-select-sm" id="roomSelect" v-model="currentReservation.idChambre">
              <option v-for="chambre in chambres" :key="chambre.idChambre" :value="chambre.idChambre">{{ chambre.idChambre }}</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="nasInput" class="form-label">NAS client</label>
            <input type="text" class="form-control form-control-lg" id="nasInput" v-model="currentReservation.NASclient">
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
  name: "Reservations",
  data() {
    return {
      reservations: [],
      chambres: [],
      employes: [],
      newReservation:{},
      currentReservation: {},
      loading: true,
      orderBy: 'idReservation', // default order by column

    };
  },
  methods: {
    fetchReservations() {
      fetch('http://localhost:3000/reservationInfos', {
        headers: {
          authorization: this.$root.token,
        },
      })
      .then(response => response.json())
      .then(data => {
        this.chambres = data.chambres;
        this.employes = data.employes;
        this.reservations = data.reservations;
        this.loading = false;
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching reservation information:', error);
        this.loading = false;
      });
    },
    editReservation(reservation) {
  this.currentReservation = {
    ...reservation,
    checkInDate: new Date(reservation.checkInDate).toISOString().substr(0, 10),
    checkOutDate: new Date(reservation.checkOutDate).toISOString().substr(0, 10),
  };
  $('#editReservationModal').modal('show');
},

updateReservation() {
  const { idReservation, idChambre, NASclient, checkInDate, checkOutDate } = this.currentReservation;
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
    this.fetchReservations();
    // Fermer la fenêtre modale
    $('#editReservationModal').modal('hide');
  })
  .catch(error => console.error('Error updating reservation:', error));
}
,
    deleteReservation(idReservation) {
      fetch(`http://localhost:3000/reservations/${idReservation}`, {
        method: 'DELETE'
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        this.fetchReservations();
      })
      .catch(error => console.error('Error deleting reservation:', error));
    },
    addReservation() {
  const { idChambre, NASclient, checkInDate, checkOutDate } = this.newReservation;
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
    this.fetchReservations();
  })
  .catch(error => console.error('Error adding reservation:', error));
}

  },
  created() {
    this.fetchReservations();
  },
  computed: {
    orderedReservations() {
      return this.reservations.slice().sort((a, b) => {
        if (a[this.orderBy] < b[this.orderBy]) return -1;
        if (a[this.orderBy] > b[this.orderBy]) return 1;
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