<template>
  <div class="container-fluid">
    <h1 class="my-4 text-body-secondary">Locations</h1>
    <div class="row mb-4">
      <div class="col">
        <select class="form-select" v-model="newLocation.idChambre">
          <option disabled value="">Sélectionnez une chambre</option>
          <option v-for="chambre in chambresDisponibles" :key="chambre.idChambre" :value="chambre.idChambre">
            {{ chambre.idChambre }}
          </option>
        </select>
      </div>
      <div class="col">
        <input class="form-control" type="text" placeholder="Client" v-model="newLocation.client" />
      </div>
      <div class="col">
        <select class="form-select" v-model="newLocation.employe">
          <option disabled value="">Sélectionnez un employé</option>
          <option v-for="employe in employes" :key="employe.NASemploye" :value="employe.NASemploye">
            {{ employe.prenom }} {{ employe.nomFamille }} ({{ employe.NASemploye }})
          </option>
        </select>
      </div>
      <div class="col">
        <input class="form-control" type="date" placeholder="Check-in" v-model="newLocation.checkInDate" />
      </div>
      <div class="col">
        <input class="form-control" type="date" placeholder="Check-out" v-model="newLocation.checkOutDate" />
      </div>
      <div class="col">
        <select class="form-select" v-model="newLocation.paiement">
          <option value="">Sélectionner un mode de paiement</option>
          <option value="Virement bancaire">Virement bancaire</option>
          <option value="Prélèvement automatique">Prélèvement automatique</option>
          <option value="Cartes prépayées">Cartes prépayées</option>
          <option value="Paiements par portefeuille électronique (ex: PayPal, Google Pay)">Paiements par portefeuille électronique (ex: PayPal, Google Pay)</option>
          <option value="Chèques bancaires certifiés">Chèques bancaires certifiés</option>
          <option value="Paiements en crypto-monnaie (ex: Bitcoin, Ethereum)">Paiements en crypto-monnaie (ex: Bitcoin, Ethereum)</option>
          <option value="Paiement en espèces">Paiement en espèces</option>
          <option value="Carte de crédit">Carte de crédit</option>
          <option value="Carte de débit">Carte de débit</option>
          <option value="Non payé">Non payé</option>
        </select>
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
          <tr v-for="location in locations.locations" :key="location.idLocation">
            <td>{{ location.idLocation }}</td>
            <td>{{ location.idChambre }}</td>
            <td>{{ location.NASclient }}</td>
            <td>{{ location.NASemploye }}</td>
            <td>{{ new Date(location.checkIndDate).toISOString().split('T')[0] }}</td>
<td>{{ new Date(location.checkOutDate).toISOString().split('T')[0] }}</td>
            <td>{{ location.paiement }}</td>
            <td>
              <button class="btn btn-outline-primary btn-sm" @click="showEditModal(location)">Edit</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteLocation(location.idLocation)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">Modifier la réservation</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitEditForm">
  <div class="row">
    <div class="col-md-6">
      <div class="form-floating mb-3">
        <select class="form-select" id="idChambre" v-model="selectedReservation.idChambre">
          <option disabled value="">Sélectionnez une chambre</option>
          <option v-for="chambre in chambresDisponibles" :key="chambre.idChambre" :value="chambre.idChambre">
            {{ chambre.idChambre }}
          </option>
        </select>
        <label for="idChambre">Chambre</label>
      </div>
      <div class="form-floating mb-3">
        <input type="date" class="form-control" id="checkInDate" v-model="selectedReservation.checkIndDate" required>
        <label for="checkInDate">Check-in</label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="paiement" v-model="selectedReservation.paiement">
          <option value="">Sélectionner un mode de paiement</option>
          <option value="Virement bancaire">Virement bancaire</option>
          <option value="Prélèvement automatique">Prélèvement automatique</option>
          <option value="Cartes prépayées">Cartes prépayées</option>
          <option value="Paiements par portefeuille électronique (ex: PayPal, Google Pay)">Paiements par portefeuille électronique (ex: PayPal, Google Pay)</option>
          <option value="Chèques de voyage">Chèques de voyage</option>
          <option value="Espèces">Espèces</option>
          <option value="Chèques bancaires certifiés">Chèques bancaires certifiés</option>
        </select>
        <label for="paiement">Paiement</label>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="clientName" :value="selectedReservation.NASclient" readonly>
        <label for="clientName">Client</label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="employeeName" v-model="selectedReservation.NASemploye">
          <option disabled value="">Sélectionnez un employé</option>
          <option v-for="employe in employes" :key="employe.NASemploye" :value="employe.NASemploye">
            {{ employe.prenom }} {{ employe.nomFamille }} ({{ employe.NASemploye }})
          </option>
        </select>
        <label for="employeeName">Employé</label>
      </div>
      <div class="form-floating mb-3">
        <input type="date" class="form-control" id="checkOutDate" v-model="selectedReservation.checkOutDate" required>
        <label for="checkOutDate">Check-Out</label>
      </div>
    </div>
  </div>
  <div class="modal-footer">

    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
    <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
  </div>
</form>
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
      fetchLocations() {
  fetch("http://localhost:3000/locationinfos", {
    headers: {
      authorization: this.$root.token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching locations");
      }
      return response.json();
    })
    .then((data) => {
      this.locations = data;
      console.log(this.locations);

      this.chambresDisponibles = data.chambres;
      this.employes = data.employes;

      console.log("ypppppp");
      console.log("ypppppp");
      console.log("ypppppp");
      console.log("ypppppp");
      console.log("ypppppp");
      console.log("ypppppp");
    })
    .catch((err) => {
      console.error(err);
    });
      },
      submitEditForm() {
  // Vérifier si toutes les données nécessaires sont fournies
  if (!this.selectedReservation.idChambre || !this.selectedReservation.NASclient || !this.selectedReservation.NASemploye || !this.selectedReservation.checkIndDate || !this.selectedReservation.checkOutDate || !this.selectedReservation.paiement) {
    alert("Veuillez remplir tous les champs avant de continuer.");
    return;
  }

  // Envoyer une requête PUT pour modifier la location sélectionnée
  fetch(`http://localhost:3000/locations/${this.selectedReservation.idLocation}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idChambre: this.selectedReservation.idChambre,
      NASclient: this.selectedReservation.NASclient,
      NASemploye: this.selectedReservation.NASemploye,
      checkIndDate: this.selectedReservation.checkIndDate,
      checkOutDate: this.selectedReservation.checkOutDate,
      paiement: this.selectedReservation.paiement,
    }),
  })
    .then((data) => {
      console.log(data)
      this.fetchLocations();
      this.selectedReservation = {};
      $('#editModal').modal('hide');

    })
    .catch((err) => {
      console.error(err);
      alert("Une erreur s'est produite lors de la modification de la location.");
    });
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
  // Vérifier si toutes les données nécessaires sont fournies
  if (!this.newLocation.idChambre || !this.newLocation.client || !this.newLocation.employe || !this.newLocation.checkInDate || !this.newLocation.checkOutDate || !this.newLocation.paiement) {
    alert("Veuillez remplir tous les champs avant de continuer.");
    return;
  }

  // Envoyer une requête POST pour ajouter la nouvelle location
  fetch("http://localhost:3000/locations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idChambre: this.newLocation.idChambre,
      NASclient: this.newLocation.client,
      NASemploye: this.newLocation.employe,
      checkInDate: this.newLocation.checkInDate,
      checkOutDate: this.newLocation.checkOutDate,
      paiement: this.newLocation.paiement,
    }),
  })
    .then((data) => {
      this.fetchLocations();
      this.newLocation = {
        idChambre: "",
        client: "",
        employe: "",
        checkInDate: "",
        checkOutDate: "",
        paiement: "",
      };
    })
    .catch((err) => {
      console.error(err);
      alert("Une erreur s'est produite lors de l'ajout de la nouvelle location.");
    });
},
showEditModal(location) {
  this.selectedReservation = Object.assign({}, location);
  this.selectedReservation.checkIndDate = new Date(location.checkIndDate).toISOString().split('T')[0];
  this.selectedReservation.checkOutDate = new Date(location.checkOutDate).toISOString().split('T')[0];
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
  color: #1e272e;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.table {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0.5rem;
}

.table th,
.table td {
  color: #1e272e;
}

.btn {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-outline-primary {
  border-color: #0066cc;
  color: #0066cc;
}

.btn-outline-primary:hover {
  background-color: #0066cc;
  color: #fff;
}

.btn-outline-danger {
  border-color: #cc0000;
  color: #cc0000;
}

.btn-outline-danger:hover {
  background-color: #cc0000;
  color: #fff;
}

.modal-content {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 0.5rem;
}

.form-label {
  color: #1e272e;
  font-weight: 500;
}

.btn-close:hover {
  filter: brightness(0.8);
}

/* Style supplémentaire */
.container-fluid {
  background-size: cover;
  background-position: center;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.select2-selection {
  border: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

.select2-selection__arrow {
  border: none !important;
}

.input-group-text {
  background-color: #fff !important;
  border: none !important;
}

  .container-fluid {
    background-image: url('https://images.unsplash.com/photo-1533158326339-7f3cf2404354?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80');
    background-size: cover;
    background-position: center;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .container-fluid {
    background-image: url('https://images.unsplash.com/photo-1533158326339-7f3cf2404354?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80');
    background-size: cover;
    background-position: center;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  h1.text-body-secondary {
    color: #1e272e;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .table {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 0.5rem;
  }
  
  .table th,
  .table td {
    color: #1e272e;
  }
  
  .btn {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .btn-outline-primary {
    border-color: #0066cc;
    color: #0066cc;
  }
  
  .btn-outline-primary:hover {
    background-color: #0066cc;
    color: #fff;
  }
  
  .btn-outline-danger {
    border-color: #cc0000;
    color: #cc0000;
  }
  
  .btn-outline-danger:hover {
    background-color: #cc0000;
    color: #fff;
  }
  
  .modal-content {
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 0.5rem;
  }
  
  .form-label {
    color: #1e272e;
    font-weight: 500;
  }
  
  .btn-close:hover {
    filter: brightness(0.8);
  }
</style>