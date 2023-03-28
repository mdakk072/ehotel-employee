<template>
  <div class="container-fluid">

  <div class="row">
    <div class="col-md-12">
  <h2>Chaîne hôtelière : {{ hotelInfos.chaineHoteliere.nom }}</h2>
  <p>Nombre d'hôtels : 3</p>
  <button class="btn btn-primary" @click="selectedChaine = hotelInfos.chaineHoteliere" data-bs-toggle="modal" data-bs-target="#modifierChaineModal">Modifier</button>
</div>

  </div>
  <div class="row">
  <div class="col-md-6">
    <div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Bureaux</h3>
    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#ajouterBureauModal" @click="selectedBureau = hotelInfos.bureaux[0]">Ajouter un bureau</button>
  </div>

 <div style="max-height: 400px; overflow-y: scroll;">
    <div class="list-group">
      <div v-for="bureau in hotelInfos.bureaux" :key="bureau.idBureau" class="list-group-item list-group-item-action py-3">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ bureau.ville }}</h5>
        </div>
        <small class="text-muted">
          <strong>Rue :</strong> {{ bureau.rue }}<br>
          <strong>Code postal :</strong> {{ bureau.codePostal }}<br>
          <strong>Email :</strong> {{ bureau.email }}<br>
          <strong>Numéro de téléphone :</strong> {{ bureau.numeroTel }}
        </small>
        <div class="btn-group btn-group-sm mt-2 float-end" role="group">
          <button class="btn btn-primary" @click="selectedBureau = bureau" data-bs-toggle="modal" data-bs-target="#modifierBureauModal">Modifier</button>
          <button class="btn btn-danger" @click="deleteBureau(bureau)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>


    <div class="modal fade"  ref="ajouterBureauModal" id="ajouterBureauModal" tabindex="-1" aria-labelledby="ajouterBureauModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ajouterBureauModalLabel">Ajouter un bureau</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="createBureau">
        <div class="modal-body">
          <div class="row mb-3">
            <label for="rue" class="col-sm-4 col-form-label">Rue:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="rue" v-model="newBureau.rue">
            </div>
          </div>
          <div class="row mb-3">
            <label for="codePostal" class="col-sm-4 col-form-label">Code postal:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="codePostal" v-model="newBureau.codePostal">
            </div>
          </div>
          <div class="row mb-3">
            <label for="ville" class="col-sm-4 col-form-label">Ville:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="ville" v-model="newBureau.ville">
            </div>
          </div>
          <div class="row mb-3">
            <label for="email" class="col-sm-4 col-form-label">Email:</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="email" v-model="newBureau.email">
            </div>
          </div>
          <div class="row mb-3">
            <label for="numeroTel" class="col-sm-4 col-form-label">Numéro de téléphone:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="numeroTel" v-model="newBureau.numeroTel">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button class="btn btn-primary">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</div>

    <!-- Modifier Bureau Modal -->
    <div class="modal fade" ref="modifierBureauModal" id="modifierBureauModal" tabindex="-1" aria-labelledby="modifierBureauModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modifierBureauModalLabel">Modifier le bureau</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="updateBureau">
        <div class="modal-body" v-if="selectedBureau">
          <div class="row mb-3">
            <label for="rue" class="col-sm-4 col-form-label">Rue:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="rue" v-model="selectedBureau.rue">
            </div>
          </div>
          <div class="row mb-3">
            <label for="codePostal" class="col-sm-4 col-form-label">Code postal:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="codePostal" v-model="selectedBureau.codePostal">
            </div>
          </div>
          <div class="row mb-3">
            <label for="ville" class="col-sm-4 col-form-label">Ville:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="ville" v-model="selectedBureau.ville">
            </div>
          </div>
          <div class="row mb-3">
            <label for="email" class="col-sm-4 col-form-label">Email:</label>
            <div class="col-sm-8">
              <input type="email" class="form-control" id="email" v-model="selectedBureau.email">
            </div>
          </div>
          <div class="row mb-3">
            <label for="numeroTel" class="col-sm-4 col-form-label">Numéro de téléphone:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="numeroTel" v-model="selectedBureau.numeroTel">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button class="btn btn-primary" @click="updateBureau">Enregistrer les modifications</button>
        </div>
      </form>
    </div>
  </div>
</div>



  </div>
  <div class="col-md-6">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Hôtels</h3>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#ajouterHotelModal" @click="openAjouterHotelModal(hotelInfos.chaineHoteliere.idchaine)">Ajouter un hôtel</button>
    </div>
    <div style="max-height: 500px; overflow-y: scroll;">
  <div class="list-group">
    <div v-for="hotel in hotelInfos.hotels" :key="hotel.idhotel" class="list-group-item list-group-item-action py-3">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ hotel.nom }}</h5>
      </div>
      <small class="text-muted">
        <strong>Classement :</strong> {{ hotel.classement }} étoiles<br>
        <strong>Nombre de chambres :</strong> {{ hotel.nombrechambres }} chambres<br>
        <strong>Adresse :</strong> {{ hotel.rue }}, {{ hotel.ville }}, {{ hotel.codePostal }}<br>
        <strong>Email :</strong> {{ hotel.email }}<br>
        <strong>Numéro de téléphone :</strong> {{ hotel.numeroTel }}
      </small>
      <div class="btn-group btn-group-sm mt-2 float-end" role="group">
        <button class="btn btn-primary" @click="selectedHotel = hotel" data-bs-toggle="modal" data-bs-target="#modifierHotelModal">Modifier</button>
        <button class="btn btn-danger" @click="deleteHotel(hotel.idhotel)">Supprimer</button>
      </div>
    </div>
  </div>
</div>

     
    <!-- Modifier Hotel Modal -->
    <div class="modal fade" id="modifierHotelModal" tabindex="-1" aria-labelledby="modifierHotelModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modifierHotelModalLabel">Modifier l'hôtel</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" v-if="selectedHotel">
        <form>
          <div class="mb-3">
            <label for="nom" class="form-label">Nom</label>
            <input type="text" class="form-control" id="nom" v-model="selectedHotel.nom">
          </div>
          <!-- Add other input fields similarly -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="selectedHotel.email">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
        <button type="button" class="btn btn-primary" @click="updateHotel(selectedHotel)">Enregistrer les modifications</button>
      </div>
    </div>
  </div>
</div>


    <!-- Ajouter Hotel Modal -->
  <!-- Ajouter Hotel Modal -->
<div class="modal fade" id="ajouterHotelModal" tabindex="-1" aria-labelledby="ajouterHotelModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ajouterHotelModalLabel">Ajouter un hôtel</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  ></button>
      </div>
      <form @submit.prevent="createHotel">
  <div class="modal-body">
    <div class="row mb-3">
      <label for="nom" class="col-sm-4 col-form-label">Nom</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" id="nom" v-model="newHotel.nom" required>
      </div>
    </div>

    <div class="row mb-3">
      <label for="classement" class="col-sm-4 col-form-label">Classement</label>
      <div class="col-sm-8">
        <input type="number" class="form-control" id="classement" min="0" max="5" v-model="newHotel.classement" required>
      </div>
    </div>

    <div class="row mb-3">
      <label for="nombrechambres" class="col-sm-4 col-form-label">Nombre de chambres</label>
      <div class="col-sm-8">
        <input type="number" class="form-control" id="nombrechambres" v-model="newHotel.nombrechambres" required>
      </div>
    </div>

    <div class="row mb-3">
      <label for="rue" class="col-sm-4 col-form-label">Rue</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" id="rue" v-model="newHotel.rue" required>
      </div>
    </div>

    <div class="row mb-3">
      <label for="codePostal" class="col-sm-4 col-form-label">Code postal</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" id="codePostal" v-model="newHotel.codePostal" required>
      </div>
    </div>

    <div class="row mb-3">
      <label for="ville" class="col-sm-4 col-form-label">Ville</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" id="ville" v-model="newHotel.ville" required>
      </div>
    </div>

    <div class="row mb-3">
      <label for="email" class="col-sm-4 col-form-label">Email</label>
      <div class="col-sm-8">
        <input type="email" class="form-control" id="email" v-model="newHotel.email" required>
      </div>
    </div>


    <div class="row mb-3">
      <label for="numeroTel" class="col-sm-4 col-form-label">Numéro de téléphone</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" id="numeroTel" v-model="newHotel.numeroTel" required>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
    <button class="btn btn-primary">Ajouter</button>
  </div>

</form>

    </div>
  </div>
</div>

  </div>
</div>



<div class="row justify-content-center align-items-center g-2">
  <div class="col-md-12 text-center">
    <h2 class="mt-4 mb-4">Autres chaînes hôtelières</h2>
  </div>
  <div class="col-md-12 d-flex justify-content-end">
    <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#ajouterChaineModal">Ajouter une chaîne</button>
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
  <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#ajouterBureauModal" @click="selectedBureau = chaine.bureaux[0]">Ajouter un bureau</button>
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
  <div class="btn-group btn-group-sm mt-2 float-end" role="group">
    <button class="btn btn-primary" @click="selectedBureau = bureau" data-bs-toggle="modal" data-bs-target="#modifierBureauModal">Modifier</button>
    <button class="btn btn-danger" @click="deleteBureau(bureau)">Supprimer</button>
  </div>
</div>

</div>



</div>

<div class="col-md-6">
  <h5 class="mt-4">Hôtels</h5>
  <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#ajouterHotelModal" @click="openAjouterHotelModal(chaine.idchaine)" >Ajouter un hôtel</button>
  
  <ul class="list-group" style="max-height: 200px; overflow-y: scroll;">
    <li v-for="hotel in chaine.hotels" :key="hotel.idhotel" class="list-group-item">
      {{ hotel.nom }}, {{ hotel.rue }}, {{ hotel.ville }}
      <div class="btn-group btn-group-sm mt-2 float-end" role="group">
        <button class="btn btn-primary" @click="selectedHotel = hotel" data-bs-toggle="modal" data-bs-target="#modifierHotelModal">Modifier</button>
        <button class="btn btn-danger" @click="deleteHotel(hotel.idhotel)">Supprimer</button>
      </div>
    </li>
  </ul>
</div>

            


          </div>
          <div class="row">
  <div class="col d-flex justify-content-end align-items-center">
    <button class="btn btn-sm btn-primary ms-2 px-2 m-1" @click="selectedChaine = chaine" data-bs-toggle="modal" data-bs-target="#modifierChaineModal">Modifier</button>
    <button class="btn btn-sm btn-danger ms-2 px-2 m-1" @click="deleteChaine(chaine.idchaine)">Supprimer</button>
  </div>
</div>
        </div>
      
      </div>
    </div>
  </div>



</div>

  </div>
  <!-- Ajouter juste après la balise de fermeture </div> de l'élément #chainesAccordion -->
<div class="modal fade" id="modifierChaineModal" tabindex="-1" aria-labelledby="modifierChaineModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modifierChaineModalLabel">Modifier la chaîne hôtelière</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="updateChaine">
        <div class="modal-body">
          <div class="form-group" v-if="selectedChaine">
            <label for="chaine-nom">Nom</label>
            <input type="text" class="form-control" id="chaine-nom" v-model="selectedChaine.nom">
          </div>
          <div class="form-group" v-if="selectedChaine">
            <label for="chaine-nombrehotel">Nombre d'hôtels</label>
            <input type="number" class="form-control" id="chaine-nombrehotel" v-model="selectedChaine.nombrehotel">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button class="btn btn-primary">Sauvegarder</button>
        </div>
      </form>
    </div>
  </div>
</div>


<div class="modal fade" id="ajouterChaineModal" tabindex="-1" aria-labelledby="ajouterChaineModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ajouterChaineModalLabel">Ajouter une chaîne hôtelière</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="nomChaine" class="form-label">Nom de la chaîne</label>
                <input type="text" class="form-control" id="nomChaine" v-model="nouvelleChaine.nom">
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="nombreHotel" class="form-label">Nombre d'hôtels</label>
                <input type="number" class="form-control" id="nombreHotel" v-model="nouvelleChaine.nombrehotel">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="rueBureau" class="form-label">Rue du bureau</label>
                <input type="text" class="form-control" id="rueBureau" v-model="nouveauBureau.rue">
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="codePostalBureau" class="form-label">Code postal du bureau</label>
                <input type="text" class="form-control" id="codePostalBureau" v-model="nouveauBureau.codePostal">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="villeBureau" class="form-label">Ville du bureau</label>
                <input type="text" class="form-control" id="villeBureau" v-model="nouveauBureau.ville">
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="emailBureau" class="form-label">Email du bureau</label>
                <input type="email" class="form-control" id="emailBureau" v-model="nouveauBureau.email">
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="numeroTelBureau" class="form-label">Numéro de téléphone du bureau</label>
            <input type="text" class="form-control" id="numeroTelBureau" v-model="nouveauBureau.numeroTel">
          </div>
        </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-primary" @click="ajouterChaine()">Ajouter</button>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

export default {
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
    openAjouterHotelModal(idChaine) {
      console.log(idChaine)
    this.currentChaineId = idChaine;
    $('#ajouterHotelModal').modal('show');
    console.log( this.currentChaineId)
  },
    createHotel() {
      
      //this.newHotel.idchaine=this.hotelInfos.chaineHoteliere.idchaine
      this.newHotel.idchaine= this.currentChaineId
      fetch('http://localhost:3000/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newHotel),
      })
        .then((response) => {
          if (response.ok) {
            $('#ajouterHotelModal').modal('hide');
            this.getHotelInfos();
      
      this.fetchChaineHotels();
            this.newHotel = {};
          } else {
            alert('Error creating hotel');
          }
        })
        .catch((error) => {
          console.error('Error creating hotel:', error);
          alert('Error creating hotel');
        });
    },
    updateHotel(hotel) {
     
      
    fetch(`http://localhost:3000/hotels/${hotel.idhotel}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotel),
    })
      .then((response) => {
        if (response.ok) {
        $('#modifierHotelModal').modal('hide');
          
          //alert('Hotel updated successfully');
          this.getHotelInfos();
          
      
      this.fetchChaineHotels();

        } else {
          alert('Error updating hotel');
        }
      })
      .catch((error) => {
        console.error('Error updating hotel:', error);
        alert('Error updating hotel');
      });
  },
    deleteHotel(id) {
   // if (confirm('Are you sure you want to delete this hotel?')) {
    if (1) {
      fetch(`http://localhost:3000/hotels/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            //alert('Hotel deleted successfully');
            // Remove the deleted hotel from the hotelInfos.hotels array
            this.hotelInfos.hotels = this.hotelInfos.hotels.filter((hotel) => hotel.idhotel !== id);
            this.getHotelInfos();
      
           this.fetchChaineHotels();
          } else {
            alert('Error deleting hotel');
          }
        })
        .catch((error) => {
          console.error('Error deleting hotel:', error);
          alert('Error deleting hotel');
        });
    }
  },
    deleteChaine(idChaine) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette chaîne d'hôtels et toutes les données associées ?")) {
      fetch(`http://localhost:3000/chaines-hotels/${idChaine}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Mettre à jour la liste des chaînes d'hôtels ou rafraîchir la page
            alert('Chaîne d\'hôtels et données associées supprimées avec succès');
            //this.getHotelInfos();
      
            this.fetchChaineHotels();
          } else {
            throw new Error('Erreur lors de la suppression de la chaîne d\'hôtels et des données associées');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de la chaîne d\'hôtels et des données associées:', error);
          alert('Erreur lors de la suppression de la chaîne d\'hôtels et des données associées');
        });
    }
  },
    ajouterChaine() {
  // Récupérer les valeurs du formulaire
  const { nom, nombrehotel } = this.nouvelleChaine;
  const { rue, codePostal, ville, email, numeroTel } = this.nouveauBureau;

  // Envoyer la requête POST vers l'API
  fetch('http://localhost:3000/chaines-hotels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nom,
      nombrehotel,
      rue,
      codePostal,
      ville,
      email,
      numeroTel
    })
  })
    .then(response => {
      if (response.ok) {
        // Si la requête a réussi, vider les champs du formulaire et fermer la modal
        this.nouvelleChaine = { nom: '', nombrehotel: '' };
        this.nouveauBureau = { rue: '', codePostal: '', ville: '', email: '', numeroTel: '' };
        $('#ajouterChaineModal').modal('hide');

        // Rafraîchir la liste des chaînes hôtelières pour afficher la nouvelle chaîne ajoutée
        this.fetchChaineHotels();
      } else {
        throw new Error('Une erreur est survenue lors de l\'ajout de la chaîne hôtelière.');
      }
    })
    .catch(error => {
      console.error(error);
      // Afficher un message d'erreur à l'utilisateur
      alert(error.message);
    });
}
,

    updateChaine() {
      console.log(this.selectedChaine)
    const { idchaine, nom, nombrehotel } = this.selectedChaine;
    fetch(`http://localhost:3000/chaines-hotels/${idchaine}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom, nombrehotel }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error updating chaine');
        }
        return response.text();
      })
      .then(() => {
        // Mettre à jour les données localement ou recharger les données
        console.log('Chaîne hôtelière mise à jour avec succès');

        const modalEl = document.getElementById('modifierChaineModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      this.getHotelInfos();
      
      this.fetchChaineHotels();
      modalInstance.hide();
      })
      .catch((error) => {
        console.error('Error updating chaine:', error);
      });
  },
    async createBureau() {
      console.log( this.selectedBureau)
    const idchaine = this.selectedBureau.idchaine/* Récupérez l'ID de la chaîne ici */;

    try {
      const response = await fetch(`http://localhost:3000/chaines-hotels/${idchaine}/bureaux`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newBureau),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      // Mettez à jour la liste des bureaux et fermez le modal
      // Vous pouvez émettre un événement pour informer le composant parent que les données ont été mises à jour
      const modalEl = document.getElementById('ajouterBureauModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      this.getHotelInfos();
      
      this.fetchChaineHotels();
      modalInstance.hide();
    } catch (error) {
      console.error('Erreur lors de la création du bureau:', error);
    }
  },
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
    async deleteBureau(bureau) {
    try {
      const response = await fetch(`http://localhost:3000/chaines-hotels/${bureau.idchaine}/bureaux/${bureau.idBureau}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Bureau supprimé avec succès
        console.log('Bureau supprimé avec succès');
        // Mettre à jour la liste des bureaux
        this.getHotelInfos();
      
      this.fetchChaineHotels();
      } else {
        // Erreur lors de la suppression du bureau
        console.error('Erreur lors de la suppression du bureau:', response.statusText);
      }
    } catch (error) {
      // Erreur réseau ou autre problème
      console.error('Erreur lors de la suppression du bureau:', error);
    }
  },
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
    async updateBureau() {
    const { idchaine, idBureau, rue, codePostal, ville, email, numeroTel } = this.selectedBureau;
    console.log('/')
    console.log(this.selectedBureau)
    console.log('/')

    // Remplacez cette URL par l'URL de votre API
    const apiUrl = `http://localhost:3000/chaines-hotels/${idchaine}/bureaux/${idBureau}`;

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rue,
        codePostal,
        ville,
        email,
        numeroTel
      })
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      console.log('Bureau updated successfully');
      // Fermer le modal après la mise à jour réussie
      const modalEl = document.getElementById('modifierBureauModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
    } catch (error) {
      console.error('Error updating Bureau:', error);
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