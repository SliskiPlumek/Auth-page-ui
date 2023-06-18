<template>
    <div>
        <Header title="Login" class="heading"/>
            <form @submit="onSubmit" class="add-form">
              <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </div>
              <div class="form-control">
                  <label for="Email">E-mail</label>
                  <input type="email" name="Email" v-model="email" placeholder="enter your e-mail...">
              </div>
              <div class="form-control">
                  <label for="Password">Password</label>
                  <input type="password" name="Password" v-model="password" placeholder="enter password...">
              </div>
              <input type="submit" value="Login" class="btn btn-block">
            </form>
        <p>Don`t have an account yet?</p>
        <div class="links">
          <router-link to="/signup">Signup</router-link>
          <BackLink />
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import BackLink from '../components/GoBackLink.vue'
import { auth } from '../store/auth'

export default {
    name: 'page-login',
    data () {
        return {
            email: '',
            password: '',
            errorMessage: null
        }
    },
    components: {
        Header,
        BackLink
    },
    methods: {
        onSubmit(e) {
          e.preventDefault()

          const graphqlQuery = {
            query: `
              query UserLogin($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  userId,
                  token
                }
              }
            `,
            variables: {
              email: this.email,
              password: this.password
            }
          }

        fetch('http://localhost:3000/graphql', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(graphqlQuery)
        })
        .then(res => res.json())
        .then(resData => {
          if (resData.errors) {
            const errorMessage = resData.errors[0].message;
            throw new Error(errorMessage);
          }

          const { userId, token } = resData.data.login;
          auth.mutations.setIsAuth(auth.state, true);
          auth.mutations.setToken(auth.state, token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('token', token);

          console.log(resData);
          this.$router.push('/');
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
      }
    }
}
</script>

<style scoped>
.heading {
  margin-top: 12px;
}
.error-message {
  font-size: 12px;
  color: red;
  margin-top: 12px;
}
.links {
  display: flex;
  justify-content: space-between;
}
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>