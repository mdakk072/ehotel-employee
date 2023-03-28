<template>
    <div class="modal fade" id="modifyBureauModal" tabindex="-1" aria-labelledby="modifyBureauModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifyBureauModalLabel">Modifier Bureau</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateBureau">
              <div class="mb-3">
                <label for="rue" class="form-label">Rue</label>
                <input type="text" class="form-control" id="rue" v-model="bureau.rue">
              </div>
              <div class="mb-3">
                <label for="codePostal" class="form-label">Code Postal</label>
                <input type="text" class="form-control" id="codePostal" v-model="bureau.codePostal">
              </div>
              <div class="mb-3">
                <label for="ville" class="form-label">Ville</label>
                <input type="text" class="form-control" id="ville" v-model="bureau.ville">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="bureau.email">
              </div>
              <div class="mb-3">
                <label for="numeroTel" class="form-label">Numéro de téléphone</label>
                <input type="tel" class="form-control" id="numeroTel" v-model="bureau.numeroTel">
              </div>
              <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: 'modalBureaux',
  props: ['idChaine', 'idBureau'],
  data() {
    return {
      bureau: {
        rue: '',
        codePostal: '',
        ville: '',
        email: '',
        numeroTel: ''
      }
    }
  },
  methods: {
    async updateBureau() {
      try {
        const response = await fetch(`http://localhost:3000/chaines-hotels/${this.idChaine}/bureaux/${this.idBureau}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.bureau)
        })
        const data = await response.json()
        console.log(data)
        $('#modifyBureauModal').modal('hide')
        this.$emit('bureaux-updated') // Emit an event to refresh the data for the component that displays bureaux
      } catch (error) {
        console.error('Error updating Bureau:', error)
      }
    }
  },
  async created() {
    try {
      const response = await fetch(`http://localhost:3000/chaines-hotels/${this.idChaine}/bureaux/${this.idBureau}`)
      const data = await response.json()
      this.bureau = data
    } catch (error) {
      console.error('Error fetching Bureau:', error)
    }
  }
}
</script>
