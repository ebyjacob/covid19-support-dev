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
                        <h4 class="mb-4 text-primary">How can you support us?</h4>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <input
                          id="short"
                          type="text"
                          placeholder="Short intro of what type of support you can provide"
                          class="form-control"
						   v-model="form.support.short"
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
                          rows="3"
                          id="desc"
                          type="text"
                          placeholder="Description of what you can support"
                          class="form-control"
						   v-model="form.support.desc"
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
                   <strong>Availability Details</strong>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-3">
                        <fieldset role="group" class="b-form-group form-group">
                          <div role="group" class>
                            <label for="name">Locations you can support</label>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-sm-9">
                        <fieldset role="group" class="b-form-group form-group">
                          <div role="group" class>
                            <input
                              id="location"
                              type="text"
                              placeholder="Locations you can suppport"
                              class="form-control"
							   v-model="form.availability.location"
                            />
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-3">
                        <fieldset role="group" class="b-form-group form-group">
                          <div role="group" class>
                            <label for="name">Timings you can support</label>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-sm-9">
                        <fieldset role="group" class="b-form-group form-group">
                          <div role="group" class>
                            <input
                              id="time"
                              type="text"
                              placeholder="Timings you can support"
                              class="form-control"
							  v-model="form.availability.time"
                            />
                          </div>
                        </fieldset>
                      </div>
                    </div>
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
                  <strong>Personal Details</strong>
                </div>
              </div>
              <div class="card-body">
                		
				 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="firstname">First Name</label>
                        <input
                          id="firstname"
                          type="text"
                          placeholder="First name"
                          class="form-control"
						  v-model="form.personal.firstname"
                        />
                      </div>
                    </fieldset>
                  </div>
				  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="lastname">Last Name</label>
                        <input
                          id="lastname"
                          type="text"
                          placeholder="Last name"
                          class="form-control"
						  v-model="form.personal.lastname"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
				
				 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="pidproof">Primary ID Proof</label>
                        <input
                          id="idproof"
                          type="text"
                          placeholder="Any Primary Identity proof of the person offering support"
                          class="form-control"
						  v-model="form.personal.idproof"
                        />
                      </div>
                    </fieldset>
                  </div>
				   <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="pidproof">Secondary ID Proof</label>
                        <input
                          id="sidproof"
                          type="text"
                          placeholder="Any Secondary Identity proof of the person offering support"
                          class="form-control"
						  v-model="form.personal.sidproof"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
				
				 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="mobile">Mobile Number</label>
                        <input
                          id="mobile"
                          type="text"
                          placeholder="Mobile number"
                          class="form-control"
						  v-model="form.personal.mobile"
                        />
                      </div>
                    </fieldset>
                  </div>
				  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="altmobile">Alternate Number</label>
                        <input
                          id="altmobile"
                          type="text"
                          placeholder="Alternate Contact number "
                          class="form-control"
						  v-model="form.personal.altmobile"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>

        
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="email">Email</label>
                        <input id="email" type="text" placeholder="Email" class="form-control" v-model="form.personal.email"/>
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
                  <strong>Address Information</strong>
                </div>
              </div>
              <div class="card-body">
                		
				 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="housenumber">House Number</label>
                        <input
                          id="housenumber"
                          type="text"
                          placeholder="House Number of the person offering support"
                          class="form-control"
						  v-model="form.address.housenumber"
                        />
                      </div>
                    </fieldset>
                  </div>
				   <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="buildname">Build  Name</label>
                        <input
                          id="buildname"
                          type="text"
                          placeholder="Build Name of the person offering support"
                          class="form-control"
						  v-model="form.address.buildname"
                        />
                      </div>
                    </fieldset>
                  </div>
			
                </div>
				
				 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="address1">Address Line1</label>
                        <input
                          id="address1"
                          type="text"
                          placeholder="Address Line1"
                          class="form-control"
						  v-model="form.address.address1"
                        />
                      </div>
                    </fieldset>
                  </div>
				   <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="address2">Address Line2</label>
                        <input
                          id="address2"
                          type="text"
                          placeholder="Address Line2"
                          class="form-control"
						  v-model="form.address.address2"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
				
			 <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="area">City/Area</label>
                        <input
                          id="area"
                          type="text"
                          placeholder="Area"
                          class="form-control"
						  v-model="form.address.area"
                        />
                      </div>
                    </fieldset>
                  </div>
				  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="postcode">Postcode</label>
                        <input
                          id="postcode"
                          type="text"
                          placeholder="Postcode"
                          class="form-control"
						  v-model="form.address.postcode"
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
                      <button type="button" class="btn btn-primary" @click="submitRequest">Agree & Submit Request</button>
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
        "support": {
          "short": "",
          "desc": ""
        },
        "availability": {
          "location": "",
          "time": ""
        },
        "personal": {
          "firstname": "",
          "lastname": "",
          "idproof": "",
          "sidproof": "",
          "mobile": "",
          "altmobile": "",
          "email": ""

        },
        "address": {
          "housenumber": "",
          "buildname": "",
          "address1": "",
          "address2": "",
          "area": "",
          "postcode": ""
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
      db.collection("can_support")
		.doc(this.form.user_email)
        .set(this.form)
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