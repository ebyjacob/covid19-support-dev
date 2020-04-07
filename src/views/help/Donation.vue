<template>
  <div>
    <div class="container mt-4">
      <div v-if="user && user.loggedIn">
        <div class="row">
          <div class="col-sm-12">
            <div class="card mt-4">
              <div class="card-body" v-if="donation && donation.donation">
                <h5 class="text-primary">Donation Promise For {{donation.donation.title}}</h5>                
                <div class="row my-4">
                  <div class="col-sm-4">Status</div>
                  <div class="col-sm-8">{{donation.donation_status.charAt(0).toUpperCase() + donation.donation_status.slice(1) ||'New'}}</div>
                </div>
                <div class="row my-4" v-if="donation.donation_status === 'assigned'">
                  <div class="col-sm-4">Assigned Status</div>
                  <div
                    class="col-sm-8"
                  >Assigned to {{donation.picked_up_by}} on {{new Date(donation.picked_up_on.seconds* 1000)}}</div>
                </div>
                <div class="row my-4">
                  <div class="col-sm-4">Details</div>
                  <div class="col-sm-8">{{donation.donation.message || 'No details provided'}}</div>
                </div>
                <div class="row my-4">
                  <div class="col-sm-4">Donor</div>
                  <div class="col-sm-8">{{donation.contact.name|| 'Not Available'}}</div>
                </div>
                <div class="row my-4">
                  <div class="col-sm-4">Contact Address</div>
                  <div class="col-sm-8">{{donation.contact.address||'Not Available'}}</div>
                </div>
                <div class="row my-4">
                  <div class="col-sm-4">Contact Phone</div>
                  <div class="col-sm-8">{{donation.contact.phone||'Not Available'}}</div>
                </div>
                <div class="row my-4">
                  <div class="col-sm-4">Contact Email</div>
                  <div class="col-sm-8">{{donation.contact.email||'Not Available'}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <div class="row">
      <!-- <div class="col-sm-12 text-left">            -->
        <div class="col-sm-12" v-if="user && user.loggedIn && user.data && (user.data.moderator)">
          <div class="card">
            <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <div v-if="success" class="alert alert-success">{{success}}</div>
             <h5 class="text-primary">Assign to Volunteer</h5>
              <div class="row">
                <div class="col-sm-8">
                  <fieldset role="group" class="b-form-group form-group">
                    <div role="group" class>
                      <input
                        id="volunteeremail"
                        type="text"
                        placeholder="Volunteer email"
                        class="form-control"
                        v-model="volunteerEmail"
                      />
                    </div>
                  </fieldset>                  
                </div>
                <div class="col-sm-4">
                  <div class="text-right mr-4">
                    <button type="button" class="btn btn-primary" @click="AssignToVolunteer">Assign to volunteer</button>
                  </div>
                </div>
              </div>              
            </div>
          </div>
        <!-- </div>             -->
      </div>
    </div>
      <div class="row" v-if="donation.statechanges && donation.statechanges.length > 0">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <h5 class="text-primary">State Change History</h5>
              <div v-for="(statechange,index) in donation.statechanges" :key="index" class="row">
                  <div class="col-sm-12 py-2">
                    {{statechange.message ||'-----------------'}} by <i>{{statechange.sender}}</i> on {{new Date(statechange.timestamp.seconds * 1000)}} 
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
                <h5 class="text-primary">Comments</h5>
                <div v-if="donation">
                  <div v-for="(comment,index) in donation.comments" :key="index" class="row">
                    <div class="col-sm-12 py-2">
                      {{comment.comment ||'-----------------'}}
                      <br />-
                      <i>{{comment.commentor}}</i>
                      - {{new Date(comment.timestamp.seconds * 1000)}}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <textarea
                          id="newcomment"
                          type="text"
                          placeholder="Comment"
                          class="form-control"
                          rows="3"
                          v-model="newcomment"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-8"></div>
                  <div class="col-sm-4">
                    <div class="text-right mr-4">
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="submitComment"
                      >Submit Comment</button>
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
              <div class="card-body text-right">                
                <button class="btn btn-primary mr-4" 
                v-if="donation && (donation.picked_up_by === user.data.email || user.data.moderator) && (donation.donation_status === 'assigned' || donation.donation_status ==='inprogress')"
                @click="markAsFulfilled">Mark as Fulfilled</button>                
                <button class="btn btn-danger mr-4" @click="deleteDonorPromise" v-if="isModerator">Delete Promise</button>                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-sm-12">
          <h4>Loading...</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import * as _ from "lodash";
export default {
  data() {
    return {
      newcomment: "",
      error: "",
      success: "",
      donation: null,
      volunteerEmail: "",      
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    }),
    isLoggedInUser() {
      return (
        this.user &&
        this.user.loggedIn &&
        this.user.data &&
        this.user.data.email
      );
    },
    isModerator(){
      return this.isLoggedInUser && this.user.data.moderator
    },
    isJobOwner() {
      return (
        this.isLoggedInUser &&
        this.$route.params.donationid &&
        this.donation &&
        this.donation.user_email === this.user.data.email
      );
    },
    canCloseJob() {
      return (
        this.isJobOwner && ["new"].indexOf(this.donation.donation_status) > -1
      );
    }
  },
  created() {    
    this.fetchDonation();
  },
  methods: {
    fetchDonation() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.donationid
      ) {        
        var db = firebase.firestore();
        db.collection("donations")
          .doc(this.$route.params.donationid)
          .get()
          .then(docRef => {
            let _donation = docRef.data();            
            this.donation = _donation;
            this.donation.comments = _donation.comments || [];
            this.donation.statechanges = _donation.statechanges || [];
          })
          .catch(err => {
            console.log(err);
          });
      }
    },    
    submitComment() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.donationid
      ) {
        let comments = this.donation.comments.concat({
          comment: this.newcomment,
          timestamp: new Date(),
          commentor: this.user.data.email || "unknown"
        });
        var db = firebase.firestore();
        var docRef = db
          .collection("donations")
          .doc(this.$route.params.donationid);
        docRef
          .set(
            {
              comments
            },
            { merge: true }
          )
          .then(result => {
            this.fetchDonation();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },   
    fetchUserDetails(u) {
      var db = firebase.firestore();
      return db.collection("user_profiles")
          .doc(u)
          .get();
     },
    async AssignToVolunteer() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.donationid &&
        this.volunteerEmail
      ) {
        this.error = "";
        this.success = "";
        var db = firebase.firestore(); 
        var userdetails = null;
        await this.fetchUserDetails(this.volunteerEmail).then(doc => {
            console.log(doc.id, '=>', doc.data());
            userdetails = doc.data();
          })
                             
         if(!userdetails){
          this.error = "Invalid user Id";          
          return;
        }
        if(!userdetails.isverifiedvolunteer && !userdetails.ismoderator){
          this.error = "User is not a Verified Volunteer or Moderator";          
          return;
        }
        var docRef = db
          .collection("donations")
          .doc(this.$route.params.donationid);
        let newstatechanges = this.donation.statechanges || [];
        newstatechanges.push({
          sender: this.user.data.email,
          message: "Donor Promise Assigned",
          timestamp: new Date()
        });
        docRef
          .set(
            {              
              donation_status: "assigned",
              statechanges: newstatechanges,
              picked_up_by: this.volunteerEmail,
              picked_up_on: new Date()
            },
            { merge: true }
          )
          .then(result => {
            this.fetchDonation();
          })
          .catch(err => {
            console.log(err);
          });
          this.success = "Successfully Assigned!"
      }
    },    
    markAsFulfilled() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.donationid
      ) {
        let newstatechanges = this.donation.statechanges || [];
        newstatechanges.push({
          sender: this.user.data.email,
          message: "Donor Promise Fulfilled",
          timestamp: new Date()
        });
        var db = firebase.firestore();
        var docRef = db
          .collection("donations")
          .doc(this.$route.params.donationid);
        docRef
          .set(
            {
              donation_status: "fulfilled",
              statechanges: newstatechanges              
            },
            { merge: true }
          )
          .then(result => {
            console.log(result);
            this.fetchDonation();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },    
    deleteDonorPromise() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.email &&
        this.$route.params.donationid &&
        this.user.data.moderator
      ) { 
        if(confirm('Are you sure to delete this record?  It will be deleted permanently.')) {
        var db = firebase.firestore();
        var docRef = db
          .collection("donations")
          .doc(this.$route.params.donationid);
          docRef
          .delete()
          .then(result => {
            this.$router.replace({
              name: "donations"
            });
          })
          .catch(err => {
            console.log(err);
          });
        }               
      }
    }
  }
};
</script>