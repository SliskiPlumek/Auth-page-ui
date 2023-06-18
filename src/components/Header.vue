<template>
    <div>
        <h1> {{ title }}</h1>
    </div>
</template>

<script>
export default {
    name: 'header-element',
    props: {
        title: {
            type: String,
            default: 'Welcome to the authentication site!'
        }
    },
    computed: {
    homePage() {
      if (this.$route.path === '/') {
        // this.$router.push() redirect
        return true
      } else {
        return false
      }
    },
  },
}
</script>



