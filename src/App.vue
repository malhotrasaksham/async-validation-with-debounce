<template>
  <div id="app">
    <div class="formControl" :class="{error: $v.username.$error}">
      <input type="text" v-model="username" @blur="$v.username.$touch()">
      <span v-if="checking">...</span>
      <div v-if="$v.username.$error && !$v.username.required">Required field</div>
      <div v-if="$v.username.$error && !$v.username.notExists">User already taken</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  name: "App",
  data() {
    return {
      username: undefined,
      checking: false,
      debounceSearch: undefined
    };
  },
  validations: {
    username: {
      required,
      notExists(val) {
        return new Promise(resolve => {
          if (this.debounceSearch) clearInterval(this.debounceSearch);
          return (this.debounceSearch = setTimeout(_ => {
            if (!this.username) return true;
            this.checking = true;
            return axios
              .get("/users", {
                params: {
                  username: this.username
                }
              })
              .then(res => {
                console.log(res.data.length);
                this.checking = false;
                return resolve(res.data.length === 0);
              });
          }, 300));
        });
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.todo {
  padding: 10px;
}
</style>
