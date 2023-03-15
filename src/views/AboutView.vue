<template>
  <div class="container-fluid about p-2">
    <div class="row justify-content-center align-items-centerg-2 m-1" style="rgba(0,0,0,1)">
      <h1 class="text-center  mb-3">Application de réservation d'hôtels</h1>

    </div>
    
    <div class="card mx-auto mb-4 " style="max-width: 800px;     background: rgba(255,255,255,.8)">
      <div class="card-body " style="background-color: rgba(0, 0, 0,0.1);">
        <p class="card-text text-center">
          Cinq des chaînes hôtelières les plus connues ont collaboré pour développer une application permettant aux clients de réserver facilement des chambres dans leurs hôtels. L'application doit stocker des informations sur les chaînes hôtelières, les hôtels, les chambres, les clients et les employés, ainsi que l'historique des réservations et des locations.
        </p>
      </div>
    </div>

    <div class="row justify-content-between m-2">
      <div class="col-md-4 mb-4">
        <div class="card h-100 " style=" background: rgba(255,255,255,.8)">
          <div class="card-body" style="background-color: rgba(0, 0, 0,0.1);">
            <h2 class="card-title">Les chaînes hôtelières partenaires</h2>
            <ul>
              <li>Chaîne hôtelière 1</li>
              <li>Chaîne hôtelière 2</li>
              <li>Chaîne hôtelière 3</li>
              <li>Chaîne hôtelière 4</li>
              <li>Chaîne hôtelière 5</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-5 mb-4">
        <div class="card h-100" style=" background: rgba(255,255,255,.8)">
          <div class="card-body" style="background-color: rgba(0, 0, 0,0.1);">
            <h2 class="card-title">Les fonctionnalités de l'application</h2>
            <ul>
              <li>Recherche et réservation de chambres dans les hôtels partenaires</li>
              <li>Disponibilité en temps réel des chambres</li>
              <li>Informations sur les chaînes hôtelières (adresse, nombre d'hôtels, contact)</li>
              <li>Informations sur les hôtels (adresse, nombre de chambres, contact)</li>
              <li>Informations sur les chambres (prix, commodités, capacité, vue, possibilité d'ajouter un lit supplémentaire, problèmes/dommages)</li>
              <li>Stockage de l'historique des réservations et locations de chambres</li>
              <li>Enregistrement des clients (nom, adresse, numéro de sécurité sociale/NAS)</li>
              <li>Enregistrement des employés (nom, adresse, numéro de sécurité sociale/NAS, rôle/poste)</li>
              <li>Transformation de la réservation en location lors de l'enregistrement du client</li>
              <li>Paiement en ligne pour la location</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.about {
  background-image: url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  justify-content: center;
  align-items: center;
}

.row {
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}


</style>
<script>
export default {
  name: 'ReservationApp',
  // Les méthodes et propriétés de l'application
}



</script> 