<template>
  <div class="container-fluid">
    <h1 class="display-4 mb-4">Clients</h1>
    <div class="row bg-light">
      <div class="col-12 mb-4">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Rechercher par nom..."
              v-model="searchQuery"
              @input="filterClients"
            />
          </div>
        </form>
      </div>
      <div class="col-12">
        <!-- Here, you can add search filters for clients -->
      </div>
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col" class="text-uppercase">Nom complet</th>
                <th scope="col" class="text-uppercase">Adresse</th>
                <th scope="col" class="text-uppercase">Numéro de sécurité sociale / NAS</th>
                <th scope="col" class="text-uppercase">Date d'enregistrement</th>
                <th scope="col" class="text-uppercase">Nom d'utilisateur</th>
                <th scope="col" class="text-uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in filteredClients" :key="client.NASclient">
                <td>{{ client.prenom }} {{ client.nomFamille }}</td>
                <td>{{ client.rue }}, {{ client.codePostal }}, {{ client.ville }}</td>
                <td>{{ client.NASclient }}</td>
                <td>{{ new Date(client.dateEnregistrement).toISOString().split('T')[0] }}</td>
                <td>{{ client.username }}</td>
                <td>
                  <button class="btn btn-sm btn-danger" @click="deleteClient(client.NASclient)">
                        <i class="bi bi-trash"></i> Supprimer
                   </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Clients",
  data() {
    return {
      clients: [],
      searchQuery: "", // Initialize the search query
      filteredClients: [],
    };
  },
  methods: {
    fetchClients() {
  fetch("http://localhost:3000/clients-with-reservation-or-rental", {
    headers: {
      authorization: this.$root.token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching clients");
      }
      return response.json();
    })
    .then((data) => {
      this.clients = data;
      this.filteredClients=data
    })
    .catch((error) => {
      console.error("Error fetching clients:", error);
    });
},filterClients() {
  this.filteredClients = this.clients.filter((client) =>
    Object.values(client).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  );
},deleteClient(NASclient) {
  fetch(`http://localhost:3000/clients/${NASclient}`, {
    method: 'DELETE'
  })
    .then((response) => {
      if (response.ok) {
        console.log('Client deleted successfully');
        // Update the clients list or refresh the page
      } else {
        throw new Error('Error deleting client');
      }
    })
    .catch((error) => {
      console.error('Error deleting client:', error);
      // Display an error message to the user
    });
},



  },
  created() {
    this.fetchClients();
  },
};
</script>