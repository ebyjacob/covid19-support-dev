<template>
  <div>
    <div class="container mt-4">
      <div class="animated fadeIn">
        <div>
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
                      >Thank you !!!. You made a difference. Your offer submitted successfully.</div>
                      <h4 class="mb-4 text-primary">What you like to donate?</h4>
                      <b-form-group label="Category" label-for="basicSelect" :label-cols="3">
                        <b-form-select
                          id="basicSelect"
                          :plain="true"
                          :options="donation_categories"
                          value="Please select"
                          v-model="form.donation.category"
                        ></b-form-select>
                      </b-form-group>
                      <input
                        type="text"
                        class="form-control mb-3"
                        v-model="form.donation.title"
                        placeholder="What you would like to donate? ( Example: N95 masks * 100 )"
                      />
                      <fieldset role="group" class="b-form-group form-group">
                        <div role="group" class>
                          <textarea
                            id="donationdetails"
                            v-model="form.donation.message"
                            type="text"
                            placeholder="Description of what you are donating & how do you want users to collect"
                            class="form-control"
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
                <div class="card-header">Contact Details</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <fieldset role="group" class="b-form-group form-group">
                        <div role="group" class>
                          <label for="fullname">Full Name</label>
                          <input
                            id="fullname"
                            v-model="form.contact.name"
                            type="text"
                            placeholder="Full name of the person donating"
                            class="form-control"
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
                            v-model="form.contact.address"
                            type="text"
                            placeholder="Address"
                            class="form-control"
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
                            v-model="form.contact.phone"
                            type="text"
                            placeholder="Phone number"
                            class="form-control"
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
                          @click="submitDonation"
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
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      donation_categories: [
        "General",
        "Food",
        "Groceries",
        "Toys",
        "Books",
        "Furniture",
        "Cloths",
        "Medical supplies",
        "Electronics",
        "Other"
      ],
      form: {
        donation: {
          category: "General",
          title: "",
          message: ""
        },
        contact: {
          name: "",
          address: "",
          phone: "",
          email: ""
        },
        status: "",
        comments: []
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
    submitDonation() {
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
      if (this.form.donation.title && this.form.donation.message) {
        db.collection("donations")
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
      } else {
        this.error = "Enter title and description";
        this.status = "error";
      }
    }
  }
};
</script>

<style>
</style>