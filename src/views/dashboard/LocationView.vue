<template>
    <div class="container-fluid">
      <h1 class="my-4 text-body-secondary">Locations</h1>
      <div class="row mb-4">
      <div class="col">
        <input class="form-control" type="text" placeholder="Chambre" v-model="newLocation.idChambre" />
      </div>
      <div class="col">
        <input class="form-control" type="text" placeholder="Client" v-model="newLocation.client" />
      </div>
      <div class="col">
        <input class="form-control" type="text" placeholder="Employé" v-model="newLocation.employe" />
      </div>
      <div class="col">
        <input class="form-control" type="text" placeholder="Check-in" v-model="newLocation.checkInDate" />
      </div>
      <div class="col">
        <input class="form-control" type="text" placeholder="Check-out" v-model="newLocation.checkOutDate" />
      </div>
      <div class="col">
        <input class="form-control" type="text" placeholder="Paiement" v-model="newLocation.paiement" />
      </div>
      <div class="col">
        <button class="btn btn-success float-end" @click="addLocation">Ajouter</button>
      </div>
    </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Chambre</th>
            <th>Client</th>
            <th>Employé</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Paiement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="location in locations" :key="location.idLocation">
            <td>{{ location.idLocation }}</td>
            <td>{{ location.idChambre }}</td>
            <td>{{ location.clientPrenom }} {{ location.clientNomFamille }}</td>
            <td>{{ location.employePrenom }} {{ location.employeNomFamille }}</td>
            <td>{{ location.checkIndDate }}</td>
            <td>{{ location.checkOutDate }}</td>
            <td>{{ location.paiement }}</td>
            <td>

              <button class="btn btn-outline-primary btn-sm" @click="showEditModal(location)">Edit</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteLocation(location.idLocation)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">Modifier la réservation</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitEditForm">
          <div class="mb-3">
            <label for="idChambre" class="form-label">Chambre</label>
            <input type="text" class="form-control" id="idChambre" v-model="selectedReservation.idChambre" required>
          </div>
          <div class="mb-3">
            <label for="clientName" class="form-label">Client</label>
            <input type="text" class="form-control" id="clientName" :value="selectedReservation.clientPrenom + ' ' + selectedReservation.clientNomFamille" readonly>
          </div>
          <div class="mb-3">
            <label for="employeeName" class="form-label">Employé</label>
            <input type="text" class="form-control" id="employeeName" :value="selectedReservation.employePrenom + ' ' + selectedReservation.employeNomFamille" readonly>
          </div>
          <div class="mb-3">
            <label for="checkInDate" class="form-label">Check-in</label>
            <input type="date" class="form-control" id="checkInDate" v-model="selectedReservation.checkIndDate" required>
          </div>
          <div class="mb-3">
            <label for="checkOutDate" class="form-label">Check-out</label>
            <input type="date" class="form-control" id="checkOutDate" v-model="selectedReservation.checkOutDate" required>
          </div>
          <div class="mb-3">
            <label for="paiement" class="form-label">Paiement</label>
            <input type="text" class="form-control" id="paiement" v-model="selectedReservation.paiement" required>
          </div>
          <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
      </div>
    </div>
  </div>
</div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        locations: [],
        selectedReservation: {}, // Ajouter cette propriété
        newLocation: {
        idChambre: "",
        client: "",
        employe: "",
        checkInDate: "",
        checkOutDate: "",
        paiement: "",
      },

      };
    },
    created() {
      this.fetchLocations();
    },
    methods: {
      async fetchLocations() {
        try {
          const response = await fetch("http://localhost:3000/locations", {
            headers: {
              authorization: this.$root.token,
            },
          });
          if (!response.ok) {
            throw new Error("Error fetching locations");
          }
          this.locations = await response.json();
        } catch (err) {
          console.error(err);
        }
      },
      editLocation(idLocation) {
        this.$router.push({ name: "EditLocation", params: { idLocation } });
      },
      deleteLocation(idLocation) {
        if (!confirm("Are you sure you want to delete this location?")) {
          return;
        }
        fetch(`http://localhost:3000/locations/${idLocation}`, {
          method: "DELETE",
          headers: {
            authorization: this.$root.token,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error deleting location");
            }
            this.fetchLocations();
          })
          .catch((err) => {
            console.error(err);
          });
      },
      addLocation() {
        this.$router.push({ name: "AddLocation" });
      },
      showEditModal(location) {
      this.selectedReservation = Object.assign({}, location);
      const editModal = new bootstrap.Modal(document.getElementById('editModal'));
      editModal.show();
    },
    },
  };
  </script>
  <style scoped>
  .container-fluid {
    background-image: url('https://images.unsplash.com/photo-1533158326339-7f3cf2404354?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80');
    background-size: cover;
    background-position: center;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h1.text-body-secondary {
    color: #2c3e50;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .table {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
  }
  
  .table th,
  .table td {
    color: #2c3e50;
  }
  
  .btn {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .btn-outline-primary {
    border-color: #3498db;
    color: #3498db;
  }
  
  .btn-outline-primary:hover {
    background-color: #3498db;
    color: #fff;
  }
  
  .btn-outline-danger {
    border-color: #e74c3c;
    color: #e74c3c;
  }
  
  .btn-outline-danger:hover {
    background-color: #e74c3c;
    color: #fff;
  }
  
  .modal-content {
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 1rem;
  }
  
  .form-label {
    color: #2c3e50;
    font-weight: 500;
  }
  
  .btn-close {
    background-image: url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232c3e50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'/%3E%3Cline x1='6' y1='6' x2='18' y2='18'/%3E%3C/svg%3E);
  }
  
  .btn-close:hover {
    filter: brightness(0.8);
  }
  </style>
  