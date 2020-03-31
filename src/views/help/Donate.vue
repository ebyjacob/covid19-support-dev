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
                      <div>
                        <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <div
                          v-if="status==='submitted'"
                          class="alert alert-success"
                        >Thank you !!!. You made a difference. Your offer submitted successfully.</div>
                      </div>
                      <h4 class="mb-4 text-primary">Donation Promise Register</h4>
                      <b-form-group label="Category of the items" label-for="basicSelect" :label-cols="3">
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
                            placeholder="Description of what you are donating, how do you want users to collect & Any other comments"
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
                <div class="card-header">Donor Details</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <fieldset role="group" class="b-form-group form-group">
                        <div role="group" class>
                          <label for="fullname">Donor Full Name</label>
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
                    <div class="col-sm-6">
                      <fieldset role="group" class="b-form-group form-group">
                        <div role="group" class>
                          <label for="requestfor">Submitting by</label>
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
          <div class="row" v-if="form.requesting_for === 'other'">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-header">
                  <div>Details of person submitting request</div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-12">
                      <fieldset role="group" class="b-form-group form-group">
                        <div role="group" class>
                          <label for="fullname">Full Name of the person submitting request</label>
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
                        <p>This register is to record a promise of a donation to a person in need. Please do not take the donation but record the promise here and advise them that we will be in touch once we have identified a suitable person through the volunteer network.</p>
                        <p>By submitting, I am agreeing the T&C and sharing all the above information with the support team.</p>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="text-right mr-4">
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="submitDonation"
                        >Agree & Submit Donation</button>
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
        },
        donation_status: "new"
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
        this.form.user_displayName = this.user.data.displayName || this.user.data.email;
        this.form.user_email = this.user.data.email;
      } else {
        this.form.user_displayName = "";
        this.form.user_email = "";
      }
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
