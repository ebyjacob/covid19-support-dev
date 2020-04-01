<template>
  <div>
    <div class="container mt-4">
      <div class="animated fadeIn">
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <div v-if="error" class="alert alert-danger">{{error}}</div>
                    <div
                      v-if="status==='submitted'"
                      class="alert alert-success"
                    >Your request submitted successfully.</div>
                    <h4 class="mb-4 text-primary">What support you need?</h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <input
                          id="helptitle"
                          type="text"
                          placeholder="Short intro of what type of support need"
                          class="form-control"
                          v-model="form.request.title"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <textarea
                          id="helptitle"
                          type="text"
                          placeholder="Description of what you need"
                          class="form-control"
                          rows="3"
                          v-model="form.request.detail"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-header">
                <div>
                  <strong>Requestor details</strong>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="requestfor">Requesting for</label>
                        <div id="requestfor" role="radiogroup" tabindex="-1" class>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="requestfor1"
                              name="requestfor"
                              value="self"
                              checked="checked"
                              class="custom-control-input"
                              v-model="form.requesting_for"
                            />
                            <label for="requestfor1" class="custom-control-label">Self</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="requestfor2"
                              name="requestfor"
                              value="other"
                              class="custom-control-input"
                              v-model="form.requesting_for"
                            />
                            <label for="requestfor2" class="custom-control-label">On behalf others</label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-header">
                <div>
                  <strong>Details of person requiring support</strong>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="fullname">Full Name</label>
                        <input
                          id="fullname"
                          type="text"
                          placeholder="Full name of the person required support"
                          class="form-control"
                          v-model="form.contact.name"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="address">Address</label>
                        <input
                          id="address"
                          type="text"
                          placeholder="Address"
                          class="form-control"
                          v-model="form.contact.address"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="phonenumber">Phone Number</label>
                        <input
                          id="phonenumber"
                          type="text"
                          placeholder="Phone number"
                          class="form-control"
                          v-model="form.contact.phone"
                        />
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="email">Email</label>
                        <input
                          id="email"
                          type="text"
                          placeholder="Email"
                          class="form-control"
                          v-model="form.contact.email"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="form.requesting_for === 'other'">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-header">
                <div>
                  <strong>Details of person submitting request</strong>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="fullname">Full Name</label>
                        <input
                          id="fullname"
                          type="text"
                          placeholder="Full name of the person required support"
                          class="form-control"
                          v-model="form.requestor.name"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="address">Address</label>
                        <input
                          id="address"
                          type="text"
                          placeholder="Address"
                          class="form-control"
                          v-model="form.requestor.address"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="phonenumber">Phone Number</label>
                        <input
                          id="phonenumber"
                          type="text"
                          placeholder="Phone number"
                          class="form-control"
                          v-model="form.requestor.phone"
                        />
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="email">Email</label>
                        <input
                          id="email"
                          type="text"
                          placeholder="Email"
                          class="form-control"
                          v-model="form.requestor.email"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
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
                        @click="submitRequest"
                      >Agree & Submit Request</button>
                    </div>
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
      form: {
        request: {
          title: "",
          detail: "",
          status: "new"
        },
        picked_up_by: "",
        picked_up_on: new Date(),
        assigned_groups: [],
        tags: [],
        requesting_for: "self",
        contact: {
          name: "",
          address: "",
          phone: "",
          email: ""
        },
        requestor: {
          name: "",
          address: "",
          phone: "",
          email: ""
        }
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
    submitRequest() {
      if (this.user.loggedIn && this.user.data) {
        this.form.user_displayName =
          this.user.data.displayName || this.user.data.email;
        this.form.user_email = this.user.data.email;
      }
      this.form.verified = false;
      this.form.upvotes = [];
      this.form.downvotes = [];
      this.form.timestamp = new Date();
      var db = firebase.firestore();
      db.collection("support_requests")
        .add(this.form)
        .then(docRef => {
          this.status = "submitted";
          this.error = null;
          setTimeout(() => {
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
};
</script>

<style>
</style>