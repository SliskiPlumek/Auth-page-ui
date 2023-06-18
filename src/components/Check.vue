<template>
    <div>
        <div v-if="isLoggedIn" class="ifLogged">
            <p class="check">User logged in</p>
            <Logout />
        </div>
        <p v-else class="check">User is not logged in</p>
    </div>
</template>

<script>
import Logout from '../components/Logout.vue'
import { auth } from '../store/auth';

export default {
    name: 'check-paragraph',
    computed: {
        isLoggedIn() {
            return auth.state.isAuth;
        }
    },
    components: {
        Logout
    }
}
</script>

<style>
.check {
    font-size: xx-large;
    display: flex;
    justify-content: center;
}
.ifLogged {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
}
</style>