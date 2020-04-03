<template>
  <div>
    <div class="container mt-4">
      <div
        v-if="user && user.loggedIn && user.data && (user.data.admin || user.data.moderator || user.data.verifiedvolunteer)"
      >
        <div class="row mt-4">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-4">Filter By Status</div>
                  <div class="col-sm-8">
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'active' }}">Open</router-link></span>
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'new' }}">New</router-link></span>
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'pickedup' }}">Picked Up</router-link></span>
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'waiting-for-pickup' }}">Waiting for pickup</router-link></span>
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'closed' }}">Closed</router-link></span>
                      <span class="mx-2"><router-link :to="{name:'support-requests-bystatus', params: { status : 'completed' }}">Completed</router-link></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12" v-if="supportrequests">
            <div class="card">
              <div class="card-header">Support Requests</div>
              <div class="card-body">
                <div v-for="supportrequest in supportrequests" :key="supportrequest.id">
                  <span class="text-primary" style="font-size:16px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'supportrequest', params: { supportrequestid: supportrequest.id }}"
                    >{{supportrequest.data.request.title || 'No Title'}}</router-link>
                  </span> -
                  <span
                    style="font-size:16px;font-weight:light;"
                  >{{supportrequest.data.request.status || 'new'}}</span> -
                  <router-link
                    :to="{ name: 'supportrequest', params: { supportrequestid: supportrequest.id }}"
                  >More details</router-link>
                  <br />
                  For {{ supportrequest.data.contact.name || supportrequest.data.contact.email }} by
                  <i>{{supportrequest.data.user_displayName || supportrequest.data.user_email || 'Unknown User' }}</i>
                  <br />
                  <p>{{supportrequest.data.request.detail}}</p>
                  <hr />
                </div>
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
var db = firebase.firestore();
export default {
  data() {
    return {
      supportrequests: null
    };
  },
  watch: {
    '$route.params.status': function (id) {
      this.fetchJobs()
    }
  },
  methods: {
    getAllJobs() {
      return db
        .collection("support_requests")
        .orderBy("timestamp", "desc")
        .limit(50)
        .get();
    },
    getActiveJobs() {
      return db
        .collection("support_requests")
        .where("request.status", "in", ["new", "pickedup", "waiting-for-pickup"])
        .orderBy("timestamp", "desc")
        .limit(50)
        .get();
    },
    getJobsByStatus(s) {
      return db
        .collection("support_requests")
        .where("request.status", "==", s)
        .orderBy("timestamp", "desc")
        .limit(50)
        .get();
    },
    fetchJobs() {
      const filter_status = this.$route.params.status;
      let support_requests = [];
      if (!filter_status || filter_status === "active" || filter_status === "open") {
        this.getActiveJobs().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            support_requests.push({
              id: doc.id,
              data: doc.data()
            });
          });
          this.supportrequests = support_requests;
        });
      } else {
        this.getJobsByStatus(filter_status).then(querySnapshot => { 
          querySnapshot.forEach(doc => {
            support_requests.push({
              id: doc.id,
              data: doc.data()
            });
          });
          this.supportrequests = support_requests;
        });
      }
    }
  },
  created() {
    this.fetchJobs();
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>