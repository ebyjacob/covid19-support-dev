<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-sm-8">
        <div class="card">
          <div class="card-header">Login with username & password</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login with social credentials</div>
          <div class="card-body text-center">
            <a class="btn btn-primary text-white p-2" @click="signInWithGoogle">
              <i class="fa fa-google"></i> Sign in With Google
            </a>
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
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    submit() {
      const auth = firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password);
      auth
        .then(data => {
          if (data && data.user) {
            this.$store.dispatch("fetchUser", data.user);
            this.$router.replace({ name: "profile" });
          } else {
            this.error = "Unknown error";
          }
        })
        .catch(err => {
          this.error = err.message;
        });
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const auth = firebase.auth().signInWithPopup(provider);
      auth
        .then(result => {
          if (result && result.user) {
            this.$store.dispatch("fetchUser", result.user);
            this.$router.replace({ name: "profile" });
          }
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>