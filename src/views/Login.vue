<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <a class="btn btn-primary text-white p-2" @click="signInWithGoogle">Signin With Google</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      error: null
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const auth = firebase.auth().signInWithPopup(provider);
      auth
        .then(result => {
          if (result && result.user) {
            this.$store.dispatch("fetchUser", result.user);
            this.$router.replace({ name: "Home" });
          }
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>