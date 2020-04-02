<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="card mt-4">
            <div class="card-body">
              <h4 class="mb-4">Contact US</h4>
              <div v-if="error" class="alert alert-danger">{{error}}</div>
              <div
                v-if="status==='submitted'"
                class="alert alert-success"
              >Your message submitted successfully.</div>
              <div class="row mt-4" v-if="status !== 'submitted'">
                <div class="col-sm-12" v-if="user.loggedIn === false">
                  <fieldset role="group" class="b-form-group form-group">
                    <div role="group" class>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        class="form-control"
                        v-model="form.name"
                      />
                    </div>
                  </fieldset>
                </div>
                <div class="col-sm-12" v-if="user.loggedIn === false">
                  <fieldset role="group" class="b-form-group form-group">
                    <div role="group" class>
                      <input
                        id="email"
                        type="text"
                        placeholder="Your email"
                        class="form-control"
                        v-model="form.email"
                      />
                    </div>
                  </fieldset>
                </div>
                <div class="col-sm-12">
                  <fieldset role="group" class="b-form-group form-group">
                    <div role="group" class>
                      <textarea
                        id="message"
                        type="text"
                        rows="5"
                        placeholder="Enter your Message"
                        class="form-control"
                        v-model="form.message"
                      />
                    </div>
                  </fieldset>
                </div>
                <div class="col-sm-12 text-center pt-2">
                  <button class="btn btn-primary" @click="submitMessage">Submit your message</button>
                </div>
              </div>
            </div>
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
        name: "",
        message: ""
      },
      error: null,
      status: "new"
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    validate() {
      if (this.user.loggedIn && this.user.data) {
        this.form.name = this.user.data.displayName || this.user.data.email;
        this.form.email = this.user.data.email;
      }
      if (!this.form.name) {
        (this.error = "Enter Your name and contact details"), (this.status = "error");
      }
      if (!this.form.message) {
        (this.error = "Enter Your message"), (this.status = "error");
      }      
    },
    submitMessage() {
      this.validate();
      if (this.error) {
      } else {
        this.status = "validated";
        this.error = null;
        this.form.timestamp = new Date();
        var db = firebase.firestore();
        db.collection("messages")
          .add(this.form)
          .then(docRef => {
            this.status = "submitted";
            this.error = null;
            setTimeout(() => {
              this.form.message = "";
              this.status = "new";
              this.error = null;
            }, 5 * 1000);
          })
          .catch(error => {
            this.error = error;
            this.status = "error";
          });
      }
    }
  }
};
</script>