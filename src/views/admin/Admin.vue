<template>
  <div>
    <div class="container pt-4">
      <div class="row">
         <div class="col-sm-12" v-if="user && user.loggedIn && user.data && (user.data.admin)">
          <div class="card">
            <div class="card-body">
              <router-link to="/admin/appsettings">
                <button class="btn btn-primary">Click for Application Settings</button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-12">
          <div class="card" v-if="error || status ==='submitted'">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-12">
                  <div v-if="error" class="alert alert-danger">{{error}}</div>
                  <div v-if="status==='submitted'" class="alert alert-success">Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12" v-if="user && user.loggedIn && user.data && (user.data.admin)">
          <div class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-sm-12">
                  <h5 class="text-primary">Add New admin</h5>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <fieldset role="group" class="b-form-group form-group">
                    <div role="group" class>
                      <input
                        id="newadminemail"
                        type="text"
                        placeholder="New admin email"
                        class="form-control"
                        v-model="newadminemail"
                      />
                    </div>
                  </fieldset>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-8">
                  <div>
                    <p>By submitting, I am agreeing the T&C and sharing all the above information with the support team.</p>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="text-right mr-4">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="addAdmin"
                      v-if="!submitting_admin"
                    >Add admin</button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      v-if="submitting_admin"
                    >Submitting...</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12"
          v-if="user && user.loggedIn && user.data && (user.data.admin || user.data.moderator)"
        >
          <div class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-sm-12">
                  <h5 class="text-primary">Add New Moderator</h5>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <fieldset role="group" class="b-form-group form-group">
                    <div role="group" class>
                      <input
                        id="newmoderatoremail"
                        type="text"
                        placeholder="New moderator email"
                        class="form-control"
                        v-model="newmoderatoremail"
                      />
                    </div>
                  </fieldset>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-8">
                  <div>
                    <p>By submitting, I am agreeing the T&C and sharing all the above information with the support team.</p>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="text-right mr-4">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="addModerator"
                      v-if="!submitting_moderator"
                    >Add Moderator</button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      v-if="submitting_moderator"
                    >Submitting</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12"
          v-if="user && user.loggedIn && user.data && (user.data.admin || user.data.moderator || user.data.verifiedvolunteer)"
        >
          <div class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-sm-12">
                  <h5 class="text-primary">Verify volunteer</h5>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <fieldset role="group" class="b-form-group form-group">
                    <div role="group" class>
                      <input
                        id="newvolunteeremail"
                        type="text"
                        placeholder="Volunteer email"
                        class="form-control"
                        v-model="newvolunteeremail"
                      />
                    </div>
                  </fieldset>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-8">
                  <div>
                    <p>By submitting, I am agreeing the T&C and sharing all the above information with the support team.</p>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="text-right mr-4">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="verifyVolunteer"
                      v-if="!submitting_verifyvolunteer"
                    >Verify Volunteer</button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      v-if="submitting_verifyvolunteer"
                    >Submitting..</button>
                  </div>
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
      submitting_admin: false,
      submitting_moderator: false,
      submitting_verifyvolunteer: false,
      error: null,
      status: "new",
      newadminemail: "",
      newmoderatoremail: "",
      newvolunteeremail: ""
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  created() {},
  methods: {
    addAdmin() {
      this.submitting_admin = true;
      const addAdmin = firebase.functions().httpsCallable("assignRole");
      addAdmin({
        email: this.newadminemail,
        typeofrole: `admin`
      })
        .then(msg => {
          this.submitting_admin = false;
          if (
            msg &&
            msg.data &&
            msg.data.data &&
            msg.data.data.indexOf("Added user") > -1 &&
            msg.data.data.indexOf("as admin") > -1
          ) {
            this.status = "submitted";
            this.error = null;
            setTimeout(() => {
              this.status = "new";
              this.error = null;
            }, 5 * 1000);
          } else {
            this.status = "error";
            this.error = "error";
            setTimeout(() => {
              this.status = "new";
              this.error = null;
            }, 5 * 1000);
          }
          this.newadminemail = "";
        })
        .catch(() => {
          this.submitting_admin = false;
          this.newadminemail = "";
        });
    },
    addModerator() {
      this.submitting_moderator = true;
      const addModerator = firebase.functions().httpsCallable("assignRole");
      addModerator({
        email: this.newmoderatoremail,
        typeofrole: `moderator`
      })
        .then(msg => {
          this.submitting_moderator = false;
          if (
            msg &&
            msg.data &&
            msg.data.data &&
            msg.data.data.indexOf("Added user") > -1 &&
            msg.data.data.indexOf("as moderator") > -1
          ) {
            this.status = "submitted";
            this.error = null;
            setTimeout(() => {
              this.status = "new";
              this.error = null;
            }, 5 * 1000);
          } else {
            this.status = "error";
            this.error = "error";
            setTimeout(() => {
              this.status = "new";
              this.error = null;
            }, 5 * 1000);
          }
          this.newmoderatoremail = "";
        })
        .catch(() => {
          this.submitting_moderator = false;
          this.newmoderatoremail = "";
        });
    },
    verifyVolunteer() {
      this.submitting_verifyvolunteer = true;
      const verifyVolunteer = firebase.functions().httpsCallable("assignRole");
      verifyVolunteer({
        email: this.newvolunteeremail,
        typeofrole: `verifiedvolunteer`
      })
        .then(msg => {
          this.submitting_verifyvolunteer = false;
          if (
            msg &&
            msg.data &&
            msg.data.data &&
            msg.data.data.indexOf("Volunteer") > -1 &&
            msg.data.data.indexOf("marked as verified") > -1
          ) {
            this.status = "submitted";
            this.error = null;
            setTimeout(() => {
              this.status = "new";
              this.error = null;
            }, 5 * 1000);
          } else {
            this.status = "error";
            this.error = "error";
            setTimeout(() => {
              this.status = "new";
              this.error = null;
            }, 5 * 1000);
          }
          this.newvolunteeremail = "";
        })
        .catch(() => {
          this.submitting_verifyvolunteer = false;
          this.newvolunteeremail = "";
        });
    }
  }
};
</script>