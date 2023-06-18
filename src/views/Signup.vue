<template>
  <div>
    <Header title="Signup" class="heading"/>
    <form @submit="onSubmit" class="add-form">
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div class="form-control">
        <label for="username">Username</label>
        <input type="text" name="Username" v-model="name" placeholder="enter username...">
      </div>
      <div class="form-control">
        <label for="Email">E-mail</label>
        <input type="email" name="Email" v-model="email" placeholder="enter your e-mail...">
      </div>
      <div class="form-control">
        <label for="Password">Password</label>
        <input type="password" name="Password" v-model="password" placeholder="enter password...">
      </div>
      <div class="form-control">
        <label for="Password-confirm">Confirm password</label>
        <input type="password" name="Password-confirm" v-model="confirmPassword" placeholder="repeat password...">
      </div>
      <input type="submit" value="Signup" class="btn btn-block">
    </form>
    <p>Already have an account?</p>
    <div class="links">
      <router-link to="/login">Login</router-link>
      <BackLink />
    </div>
  </div>
</template>

<script>
import { auth } from '../store/auth';
import Header from '../components/Header.vue';
import BackLink from '../components/GoBackLink.vue';
// import axios from 'axios'

export default {
  name: 'page-signup',
  components: {
    Header,
    BackLink
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      errorMessage: null
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      const graphqlQuery = {
        query: `
          mutation CreateNewUser($email: String!, $name:String!, $password: String!){
            createUser(userData: {name: $name, email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          name: this.name
        }
      };
      
      fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      })
      .then(res => res.json())
      .then(resData => {
        if(this.password !== this.confirmPassword) {
          throw this.errorMessage = 'Passwords have to match!'
        }

        if (resData.errors && resData.errors[0].status === 422) {
          this.errorMessage = resData.errors[0].message
          throw new Error(resData.errors[0].message);
        }

        if (resData.errors) {
          this.errorMessage = resData.errors[0].message
          throw new Error(resData.errors[0].message);
        }

        console.log(resData);
      })
      .then(() => {
        auth.mutations.setIsAuth(auth.state, false);
      })
      .then(() => {
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
      });
    }
  }
};
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
