<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/tasks">Tasks</router-link> |

      <span v-if="!signedIn">
        <a v-on:click="signIn">Login with Google</a>
      </span>
      <span v-else>
        <a v-on:click="signOut">Sign Out</a>
      </span>
    </div>
    <div id="body">
      <router-view/>
    </div>
  </div>
</template>

<script>
// include amplify libraries needed for login and auth events
import { Auth, Hub } from 'aws-amplify';

export default {
  name: 'app', 
  data() {
    return {
      signedIn: false,
    };
  },
  async created() {
    // checks user status on load
    await this.checkUser();
  },
  methods: {
    async checkUser() {
      Auth.currentAuthenticatedUser()
      .then((user) => {
        window.console.log(`user: ${JSON.stringify(user)}`);
        this.signedIn = true;
      })
      .catch(() => {
        window.console.log('user not logged in');
        this.signedIn = false;
      });
    },
    async signIn() { // signin button clicked
      await Auth.federatedSignIn({ provider: 'Google' });
    },
    async signOut() {  // signout button clicked
      await Auth.signOut();
    },
  },
  beforeCreate() {
    // listens for all auth events
    Hub.listen('auth', (data) => {
      window.console.log(`A new auth event has happened: ${data.payload.event}`);
      if (data.payload.event === 'signIn') { // auth signin event
        window.console.log(`current user: ${JSON.stringify(data.payload.data)}`);
        this.signedIn = true;
      } else if (data.payload.event === 'signOut') { // auth signout event
        window.console.log(`current user: ${JSON.stringify(data.payload.data)}`);
        this.signedIn = false;
      }
    });
  },
};
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>