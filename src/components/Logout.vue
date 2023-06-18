<template>
    <button @click="onClick" class="logout btn">Logout</button>
  </template>
  
  <script>
  export default {
    name: 'LogoutBtn',
    methods: {
      onClick() {
        this.$store.commit('auth/clearAuthData')
        window.location.reload()
      }
    }
  };
  </script>
  
  <style>
  .logout {
    margin: 15px;
  }
  </style>
  