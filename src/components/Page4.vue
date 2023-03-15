<template>
    <div class="my-component">
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .my-component {
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 20px;
  }
  </style>
  