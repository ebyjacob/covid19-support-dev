<template>
  <div>
    <div class="container mt-4">
      <div v-if="user && user.loggedIn">
        <div class="row">
          <div class="col-md-12">
            <h4>Hi {{user.data.displayName}}!</h4>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-sm-12" v-if="myassignments">
            <div class="card">
              <div class="card-header">Jobs assigned to me</div>
              <div class="card-body">
                <div v-for="myassignment in myassignments" :key="myassignment.id">
                  <span class="text-primary" style="font-size:16px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'supportrequest', params: { supportrequestid: myassignment.id }}"
                    >{{myassignment.data.request.title}}</router-link>
                  </span>&nbsp;&nbsp;-&nbsp;&nbsp;
                  <router-link
                    :to="{ name: 'supportrequest', params: { supportrequestid: myassignment.id }}"
                  >More details</router-link>
                  Status : {{myassignment.data.request.status}}
                  <br />
                  For {{ myassignment.data.contact.name || myassignment.data.contact.email }} by
                  <i>{{myassignment.data.user_displayName || myassignment.data.user_email || 'Unknown User' }}</i>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-sm-6" v-if="mysupportrequests">
            <div class="card">
              <div class="card-header">Support Requests created by you</div>
              <div class="card-body">
                <div v-for="mysupportrequest in mysupportrequests" :key="mysupportrequest.id">
                  <span class="text-primary" style="font-size:16px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'supportrequest', params: { supportrequestid: mysupportrequest.id }}"
                    >{{mysupportrequest.data.request.title}}</router-link>
                  </span>&nbsp;&nbsp;--&nbsp;&nbsp;
                  <router-link
                    :to="{ name: 'supportrequest', params: { supportrequestid: mysupportrequest.id }}"
                  >More details</router-link>
                  <br />
                  For {{ mysupportrequest.data.contact.name || mysupportrequest.data.contact.email }} by
                  <i>{{mysupportrequest.data.user_displayName || mysupportrequest.data.user_email || 'Unknown User' }}</i>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6" v-if="mydonations">
            <div class="card">
              <div class="card-header">Donation Requests created by you</div>
              <div class="card-body">
                <div v-for="donation in mydonations" :key="donation.id">
                  <span class="text-primary" style="font-size:16px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'donation', params: { donationid: donation.id }}"
                    >{{donation.data.donation.title}}</router-link>
                  </span>
                  <br />
                  <i>{{donation.data.user_displayName || donation.data.user_email || 'Unknown User' }}</i>
                  <br />
                  <p>{{donation.data.donation.message}}</p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-sm-12">
          <h4>You are not logged in</h4>
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
      mydonations: null,
      mysupportrequests: null,
      myassignments: null
    };
  },
  methods: {
    fetchDonationsList() {
      var db = firebase.firestore();
      db.collection("donations")
        .where("user_email", "==", this.user.data.email)
        .get()
        .then(querySnapshot => {
          let donations = [];
          querySnapshot.forEach(doc => {
            donations.push({
              id: doc.id,
              data: doc.data()
            });
          });
          this.mydonations = donations;
        });
    },
    fetchSupportRequests() {
      var db = firebase.firestore();
      db.collection("support_requests")
        .where("user_email", "==", this.user.data.email)
        .get()
        .then(querySnapshot => {
          let support_requests = [];
          querySnapshot.forEach(doc => {
            support_requests.push({
              id: doc.id,
              data: doc.data()
            });
          });
          this.mysupportrequests = support_requests;
        });
    },
    fetchMyAssigments() {
      var db = firebase.firestore();
      db.collection("support_requests")
        .where("picked_up_by", "==", this.user.data.email)
        .get()
        .then(querySnapshot => {
          let myassignments = [];
          querySnapshot.forEach(doc => {
            myassignments.push({
              id: doc.id,
              data: doc.data()
            });
          });
          this.myassignments = myassignments;
        });
    }
  },
  created() {
    this.fetchDonationsList();
    this.fetchSupportRequests();
    this.fetchMyAssigments();
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>