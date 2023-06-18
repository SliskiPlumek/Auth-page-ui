<template>
    <div>
        <div class="links">
            <router-link to="/login">Login</router-link>
            <router-link to="/signup">Signup</router-link>
        </div>
        <Check status="false"/>
    </div>
</template>

<script>
import Check from '../components/Check.vue'

export default {
    name: 'main-navigation',
    components: {
        Check
    }
}
</script>

<style scoped>
.links {
    font-size: 200%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    align-items: center;
    align-content: space-between;
    margin-bottom: 20px;
    margin-top: 20px;
}

</style>