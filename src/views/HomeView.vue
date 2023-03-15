<template>
  <div class="home">
    <div class="background-fog"></div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <img alt="Vue logo" src="../assets/logo.png" class="img-fluid mb-3">
          <h1 class="display-4">Bienvenue sur notre site de réservation d'hôtel !</h1>
          <p class="lead">Réservez facilement votre chambre dans l'un de nos hôtels partenaires.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  position: relative;
  height: 100vh;
}

.background-fog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  filter: blur(5px);
  animation: blur 20s infinite alternate;
  z-index: -1;
}

@keyframes blur {
  from {
    filter: blur(5px);
  }
  to {
    filter: blur(10px);
  }
}

.home .container {
  position: relative;
  z-index: 1;
}

.home h1 {
  color: #ffffff;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
}

.home p {
  color: #ffffff;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 32px;
}

.home button {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
