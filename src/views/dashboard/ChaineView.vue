<template>
    <div class="container">
      <h1 class="my-4">Chaînes hôtelières</h1>
      <button class="btn btn-primary mb-3" @click="ajouterChaine">Ajouter une chaîne hôtelière</button>
  
      <div class="accordion" id="chainesAccordion">
        <div class="accordion-item" v-for="(chaine, chaineIndex) in chaines" :key="chaineIndex">
          <h2 class="accordion-header" :id="'chaineHeading' + chaineIndex">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#chaineCollapse' + chaineIndex" :aria-expanded="chaineIndex === 0" :aria-controls="'chaineCollapse' + chaineIndex">
              {{ chaine.nom }}
            </button>
          </h2>
          <div :id="'chaineCollapse' + chaineIndex" class="accordion-collapse collapse" :aria-labelledby="'chaineHeading' + chaineIndex" data-bs-parent="#chainesAccordion">
            <div class="accordion-body">
              <h3>Hôtels</h3>
              <ul class="list-group mb-3">
                <li class="list-group-item" v-for="(hotel, hotelIndex) in chaine.hotels" :key="hotelIndex">
                  {{ hotel.nom }} - {{ hotel.adresse }} - {{ hotel.telephone }} - {{ hotel.email }}
                </li>
              </ul>
              <h3>Informations sur le bureau central</h3>
              <p>Adresse: {{ chaine.adresse }}</p>
              <p>Email: {{ chaine.email }}</p>
              <p>Téléphone: {{ chaine.telephone }}</p>
              <button class="btn btn-info btn-sm" @click="modifierChaine(chaineIndex)">Modifier</button>
              <button class="btn btn-danger btn-sm" @click="supprimerChaine(chaineIndex)">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Chaînes hôtelières",
    data() {
      return {
        chaines: [
          {
            nom: "Chaîne A",
            adresse: "1 Rue Exemple, Ville, Pays",
            email: "contact@chainea.com",
            telephone: "+33 1 23 45 67 89",
            hotels: [
              {
                nom: "Hôtel A1",
                adresse: "10 Rue Exemple, Ville, Pays",
                telephone: "+33 1 23 45 67 80",
                email: "contact@hotela1.com",
              },
              {
                nom: "Hôtel A2",
                adresse: "20 Rue Exemple, Ville, Pays",
                telephone: "+33 1 23 45 67 81",
                email: "contact@hotela2.com",
              },
            ],
          },
          {
            nom: "Chaîne B",
            adresse: "2 Rue Exemple, Ville, Pays",
            email: "contact@chaineb.com",
            telephone: "+33 1 98 76 54 32",
            hotels: [
              {
                nom: "Hôtel B1",
adresse: "30 Rue Exemple, Ville, Pays",
telephone: "+33 1 98 76 54 30",
email: "contact@hotelb1.com",
},
{
nom: "Hôtel B2",
adresse: "40 Rue Exemple, Ville, Pays",
telephone: "+33 1 98 76 54 31",
email: "contact@hotelb2.com",
},
],
},
],
};
},
methods: {
ajouterChaine() {
// Logique pour ajouter une chaîne hôtelière
},
modifierChaine(index) {
// Logique pour modifier une chaîne hôtelière existante
},
supprimerChaine(index) {
// Logique pour supprimer une chaîne hôtelière
},
},
};
</script>
  