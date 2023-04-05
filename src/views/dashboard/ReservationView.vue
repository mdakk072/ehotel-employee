<template>
  <div class="container">
    <h1 class="my-5">Reservations</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>idReservation</th>
          <th>Room idReservation</th>
          <th>Client idReservation</th>
          <th>Check-in Date</th>
          <th>Check-out Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" :key="reservation.idReservation">
          <td>{{ reservation.idReservation }}</td>
          <td>{{ reservation.idReservationChambre }}</td>
          <td>{{ reservation.NASclient }}</td>
          <td>{{ reservation.checkInDate }}</td>
          <td>{{ reservation.checkOutDate }}</td>
          <td>
            <button class="btn btn-primary me-2" @click="editReservation(reservation)">Edit</button>
            <button class="btn btn-danger" @click="deleteReservation(reservation.idReservation)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Reservations",
  data() {
    return {
      reservations: [],
      currentReservation: null,
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
      this.currentReservation = reservation;
    },
    updateReservation() {
      fetch(`http://localhost:3000/reservations/${this.currentReservation.idReservation}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.currentReservation)
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        this.fetchReservations();
      })
      .catch(error => console.error('Error updating reservation:', error));
      this.currentReservation = null;
    },
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
  },
  created() {
    this.fetchReservations();
  },
};
</script>
